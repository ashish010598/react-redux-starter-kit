/**
 * Component Generator
 */

/* eslint strict: ["off"] */

'use strict';

const startsWith = require('lodash/startsWith');
const componentExists = require('../utils/componentExists');
const { HOC_PREFIX } = require('../utils/constants.json');

const rootDir = process.env.APP_SHORT_NAME ? 'src/app' : 'src';

module.exports = {
  description: 'Add a High-Order-Component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: `${HOC_PREFIX}MyHOC`,
      validate: value => {
        if (/^[a-z0-9]+$/i.test(value) && startsWith(value, HOC_PREFIX)) {
          return componentExists(value)
            ? 'A High-order-component with this name already exists'
            : true;
        }

        return `The name is required, should be alphanumeric, and should start with prefix '${HOC_PREFIX}'`;
      },
    },
    {
      type: 'confirm',
      name: 'redux',
      default: true,
      message: 'Do you want redux connectivity for your HOC?',
    },
  ],
  actions: () => {
    const actions = [
      {
        type: 'add',
        path: `${process.cwd()}/${rootDir}/hoc/{{stripPrefix name}}/{{stripPrefix name}}.js`,
        templateFile: './hoc/hoc.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: `${process.cwd()}/${rootDir}/hoc/{{stripPrefix name}}/index.js`,
        templateFile: './hoc/index.js.hbs',
        abortOnFail: true,
      },
    ];

    return actions;
  },
};
