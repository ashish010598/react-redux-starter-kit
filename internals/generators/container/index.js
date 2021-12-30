/**
 * Screen Generator
 */

const fs = require('fs');
const path = require('path');
const endsWith = require('lodash/endsWith');
const trim = require('lodash/trim');

const componentExists = require('../utils/componentExists');
const { SCREENS_DIR_NAME } = require('../utils/constants.json');

const rootDir = process.env.APP_SHORT_NAME ? 'src/app' : 'src';

module.exports = {
  description: 'Add a new screen',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'MyScreen',
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
      name: 'screenPath',
      message: 'Path for the screen',
      default: `${rootDir}/${SCREENS_DIR_NAME}`,
      validate: value => {
        if (
          /^[a-z0-9/]+$/i.test(value) &&
          (endsWith(value, SCREENS_DIR_NAME) ||
            endsWith(value, `${SCREENS_DIR_NAME}/`)) &&
          fs.existsSync(path.join(process.cwd(), value)) &&
          fs.lstatSync(path.join(process.cwd(), value)).isDirectory()
        ) {
          return true;
        }

        return `Please enter a correct path starting from root-directory, and last directory should be '${SCREENS_DIR_NAME}'`;
      },
      when: () => process.env.APP_SHORT_NAME,
    },
    {
      type: 'confirm',
      name: 'addRouteFile',
      default: false,
      message: 'Do you add a seperate route file?',
    },
    {
      type: 'confirm',
      name: 'displayInSidebar',
      default: true,
      message: 'Do you want to display screen icon in the Side-menu?',
      when: answers => answers.addRouteFile,
    },
    {
      type: 'confirm',
      name: 'isPrivate',
      default: true,
      message:
        'Do you want to restrict the access to authenticated users only?',
    },
  ],
  actions: data => {
    data.appShortName = process.env.APP_SHORT_NAME;
    const screenPath =
      trim(data.screenPath) || `${rootDir}/${SCREENS_DIR_NAME}`;
    const actions = [
      {
        type: 'add',
        path: `${process.cwd()}/${screenPath}/{{camelCase name}}/{{camelCase name}}.js`,
        templateFile: './container/screen.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: `${process.cwd()}/${screenPath}/{{camelCase name}}/{{camelCase name}}.test.js`,
        templateFile: './container/test.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: `${process.cwd()}/${screenPath}/{{camelCase name}}/index.js`,
        templateFile: './container/index.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: `${process.cwd()}/${screenPath}/{{camelCase name}}/{{camelCase name}}.constants.js`,
        templateFile: './container/constants.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: `${process.cwd()}/${screenPath}/{{camelCase name}}/{{camelCase name}}.dependencies.js`,
        templateFile: './container/dependencies.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: `${process.cwd()}/${screenPath}/{{camelCase name}}/{{camelCase name}}.scss`,
        templateFile: './container/styles.scss.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: `${process.cwd()}/${screenPath}/{{camelCase name}}/{{camelCase name}}.api.json`,
        template: '{}',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: `${process.cwd()}/${screenPath}/{{camelCase name}}/components/.keep`,
        template: '',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: `${process.cwd()}/${screenPath}/{{camelCase name}}/screens/.keep`,
        template: '',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: `${process.cwd()}/${screenPath}/{{camelCase name}}/state/{{camelCase name}}.actions.js`,
        templateFile: './container/actions.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: `${process.cwd()}/${screenPath}/{{camelCase name}}/state/{{camelCase name}}.reducer.js`,
        templateFile: './container/reducer.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: `${process.cwd()}/${screenPath}/{{camelCase name}}/state/{{camelCase name}}.saga.js`,
        templateFile: './container/saga.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: `${process.cwd()}/${screenPath}/{{camelCase name}}/state/{{camelCase name}}.types.js`,
        templateFile: './container/types.js.hbs',
        abortOnFail: true,
      },
    ];

    if (data.addRouteFile) {
      actions.push({
        type: 'add',
        path: `${process.cwd()}/${screenPath}/{{camelCase name}}/{{camelCase name}}.routes.js`,
        templateFile: './container/routes.js.hbs',
        abortOnFail: true,
      });
    }

    return actions;
  },
};
