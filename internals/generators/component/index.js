/**
 * Component Generator
 */

/* eslint strict: ["off"] */

'use strict';

const fs = require('fs');
const path = require('path');
const endsWith = require('lodash/endsWith');
const trim = require('lodash/trim');

const componentExists = require('../utils/componentExists');
const { COMPONENTS_DIR_NAME } = require('../utils/constants.json');

const rootDir = process.env.APP_SHORT_NAME ? 'src/app' : 'src';

module.exports = {
  description: 'Add a functional component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'MyComponent',
      validate: value => {
        if (/^[A-Z]{1}/.test(value) && /^[a-z0-9]+$/i.test(value)) {
          return componentExists(value)
            ? 'A component or screen with this name already exists'
            : true;
        }

        return 'The name is required, should be alphanumeric and should start with captial letter.';
      },
    },
    {
      type: 'input',
      name: 'componentPath',
      message: 'Path for the component',
      default: `${rootDir}/${COMPONENTS_DIR_NAME}`,
      validate: value => {
        if (
          /^[a-z0-9/]+$/i.test(value) &&
          (endsWith(value, COMPONENTS_DIR_NAME) ||
            endsWith(value, `${COMPONENTS_DIR_NAME}/`)) &&
          fs.existsSync(path.join(process.cwd(), value)) &&
          fs.lstatSync(path.join(process.cwd(), value)).isDirectory()
        ) {
          return true;
        }

        return `Please enter a correct path starting from root-directory, and last directory should be '${COMPONENTS_DIR_NAME}'`;
      },
      when: () => process.env.APP_SHORT_NAME,
    },
    {
      type: 'confirm',
      name: 'memo',
      default: false,
      message: 'Do you want to wrap your component in React.memo?',
    },
    {
      type: 'confirm',
      name: 'hooks',
      default: false,
      message: 'Do you want to use hooks for state management?',
    },
  ],
  actions: data => {
    const componentPath =
      trim(data.componentPath) || `${rootDir}/${COMPONENTS_DIR_NAME}`;
    const actions = [
      {
        type: 'add',
        path: `${process.cwd()}/${componentPath}/{{name}}/{{name}}.js`,
        templateFile: './component/component.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: `${process.cwd()}/${componentPath}/{{name}}/{{name}}.test.js`,
        templateFile: './component/test.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: `${process.cwd()}/${componentPath}/{{name}}/index.js`,
        templateFile: './component/index.js.hbs',
        abortOnFail: true,
      },
    ];

    return actions;
  },
};
