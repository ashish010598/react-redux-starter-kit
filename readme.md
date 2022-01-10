# React-Redux Starter Kit

This starter kit is designed to get you up and running with a bunch of awesome front-end technologies.

The primary goal of this project is to provide a stable foundation upon which to build modern web appliications. Its purpose is not to dictate your project structure or to demonstrate a complete real-world application, but to provide a set of tools intended to make front-end development robust, easy, and, most importantly, fun. Check out the full feature list below!

## Table of Contents

1. [Requirements](#requirements)
1. [Installation](#getting-started)
1. [Running the Project](#running-the-project)
1. [Live Development](#local-development)
   - [Hot Reloading](#hot-reloading)
   - [Redux DevTools](#redux-devtools)
1. [Building API JSON to feed Saga Helpers](#building-api-json-to-feed-saga-helpers)
1. [Using Code Generators](#using-code-generators)
1. [Linting](#linting)
1. [Testing](#testing)
1. [Available Utils included in the repo](#availbale-utils-included-in-the-repo)
1. [Misc items included](#misc-items-included)

## Requirements

- node `^14.0.0`
- yarn `^1.22.0` or npm `^8.0.0`

### Installation

After confirming that your environment meets the above [requirements](#requirements), you can create a new project based on `react-redux-starter-kit` by doing the following:

```bash
$ git clone https://github.com/ashish010598/react-redux-starter-kit.git <my-project-name>
$ cd <my-project-name>
```

When that's done, install the project dependencies. It is recommended that you use [Yarn](https://yarnpkg.com/) for deterministic dependency management, but `npm install` will suffice.

```bash
$ yarn  # Install project dependencies (or `npm install`)
```

## Running the Project

After completing the [installation](#installation) step, you're ready to start the project!

```bash
$ yarn start  # Start the development server (or `npm start`)
```

While developing, you will probably rely mostly on `yarn start`; however, there are additional scripts at your disposal:

| `yarn <script>` | Description                                                                                                             |
| --------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `start`         | Serves your app at `localhost:3000`                                                                                     |
| `build-prod`    | Builds the application to ./build                                                                                       |
| `lint`          | [Lints](http://stackoverflow.com/questions/8503559/what-is-linting) the project for potential errors                    |
| `lint:fix`      | Lints the project and [fixes all correctable errors](http://eslint.org/docs/user-guide/command-line-interface.html#fix) |

### Hot Reloading

Hot reloading is enabled by default when the application is running in development mode (`yarn start`). This feature is implemented with webpack's [Hot Module Replacement](https://webpack.github.io/docs/hot-module-replacement.html) capabilities, where code updates can be injected to the application while it's running, no full reload required. Here's how it works:

- For **JavaScript** modules, a code change will trigger the application to re-render from the top of the tree. **Global state is preserved (i.e. redux), but any local component state is reset**. This differs from React Hot Loader, but we've found that performing a full re-render helps avoid subtle bugs caused by RHL patching.

- For **Sass**, any change will update the styles in realtime, no additional configuration or reload needed.

### Redux DevTools

**We recommend using the [Redux DevTools Chrome Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd).**
Using the chrome extension allows your monitors to run on a separate thread and affords better performance and functionality. It comes with several of the most popular monitors, is easy to configure, filters actions, and doesn't require installing any packages in your project.

However, it's easy to bundle these developer tools locally should you choose to do so. First, grab the packages from npm:

```bash
yarn add --dev redux-devtools redux-devtools-log-monitor redux-devtools-dock-monitor
```

Then follow the [manual integration walkthrough](https://github.com/gaearon/redux-devtools/blob/master/docs/Walkthrough.md).

## Building API JSON to feed Saga Helpers

This is done automatically via Webpack during hot-reload. If doing manually:

`npm run merge:api-json` or `yarn merge:api-json` if to be merged standalone. Otherwise, this process is auto-executed at the start of webpack, web build and test commands.

## Using Code Generators

Code Generators available as part of the SDK can scaffold `components`, `screens` and `hoc` directories, files and boilerplate for them via command-line in a matter of few simple steps.

To use, run the command `npm run generate` or `yarn generate` and follow the wizard asking you to provide name, path and other relevant details related to the structure you're creating.

## Linting:

`npm run lint` or `yarn lint` to list down JS & CSS linting issues.

`npm run lint:fix` or `yarn lint:fix` to fix auto-fixable linting issues.

## Testing:

`npm test` or `yarn test` to run the test suites and generate coverage reports in `<ROOT_DIR>/coverage` directory.

To update snapshots: `npm test -- -u` or `yarn test -u`

## Available Utils icluded in the repo

1. Redux utils (Reducers config & injectors, saga injectors, store config)
2. Request util (using Superagent)
3. images util
4. common utils

---

## Misc items included:

1. Components, Screens and HoC generator via CLI
2. Webpack scripts for all environments (Base, Dev, Prod, Test)
3. Express server scripts for dev/prod build execution on localhost
4. Script to merge \*.api.json files into a single autoGenApiEndpoints.json file required by redux
5. Common assets (fonts, images)
6. Global theme files (global rules, colors, fonts, mixins etc)
7. Global config setup
8. Offline-Plugin lib
9. Eslint, Babel and Jest config
