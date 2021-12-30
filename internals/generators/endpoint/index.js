/**
 * Endpoint Generator
 */

/* eslint strict: ["off"] */

'use strict';

const fs = require('fs');
const path = require('path');
const endsWith = require('lodash/endsWith');
const trim = require('lodash/trim');

const endpointExists = require('../utils/endpointExists');

const rootDir = 'src/app';

module.exports = {
  description: 'Add an API Endpoint',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Key name for the endpoint (no spaces, underscores allowed as words separator, e.g. FETCH_USER_DATA): ',
      default: 'FETCH_USER_DATA',
      validate: value => {
        if (/^[a-z0-9_]+$/i.test(value)) {
          return endpointExists(value)
            ? 'An endpoint with this key-name already exists'
            : true;
        }

        return 'Please enter a valid key name for the endpoint - alphanumeric with underscores allowed';
      },
    },
    {
      type: 'input',
      name: 'endpoint',
      message: 'API Endpoint (without base URL, e.g. app-users/v1/fetchUserData): ',
      default: 'app-users/v1/fetchUserData',
      validate: value => {
        if (/^[a-z0-9-_/]+$/i.test(value)) {
          return true;
        }

        return 'Please enter a valid endpoint, e.g. app-users/v1/fetchUserData';
      },
    },
    {
      type: 'input',
      name: 'endpointSrcFile',
      message: 'API JSON file path to add the endpoint to?',
      default: `${rootDir}/app.api.json`,
      validate: value => {
        if (
          /^[a-z0-9./]+$/i.test(value) &&
          endsWith(value, '.api.json') &&
          fs.existsSync(path.join(process.cwd(), value)) &&
          fs.lstatSync(path.join(process.cwd(), value)).isFile()
        ) {
          return true;
        }

        return `Please enter a correct path starting from root-directory, with filename ending with ".api.json"`;
      },
    },
  ],
  actions: data => {
    const endpointSrcFilePath =
      trim(data.endpointSrcFile) || `${rootDir}/app.api.json`;
    const actions = [
      {
        type: 'modify',
        path: `${process.cwd()}/${endpointSrcFilePath}`,
        pattern: '\n}',
        template: `,\n  "${data.name.toUpperCase()}": "${trim(data.endpoint, '/')}"\n}`,
        abortOnFail: true,
      },
      {
        type: 'modify',
        path: `${process.cwd()}/${endpointSrcFilePath}`,
        pattern: '{}',
        template: `{\n  "${data.name.toUpperCase()}": "${trim(data.endpoint, '/')}"\n}`,
        abortOnFail: true,
      },
      {
        type: 'modify',
        path: `${process.cwd()}/${rootDir}/config/autoGenApiEndpoints.qa.json`,
        pattern: '\n}',
        template: `,\n  "${data.name.toUpperCase()}": "${trim(data.endpoint, '/')}"\n}`,
        abortOnFail: true,
      },
      {
        type: 'modify',
        path: `${process.cwd()}/${rootDir}/config/autoGenApiEndpoints.qa.json`,
        pattern: '{}',
        template: `{\n  "${data.name.toUpperCase()}": "${trim(data.endpoint, '/')}"\n}`,
        abortOnFail: true,
      },
    ];

    return actions;
  },
};
