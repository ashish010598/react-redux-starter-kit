# React-Redux Starter Kit (Generic)

## React-Redux Starter Kit Repo environment setup

### PROD build command

REACT_APP_ENV=PROD npm run build
pm2 start pm2-config.json

> Dependency:
> npm install pm2 -g

### DEV build command

REACT_APP_ENV=DEV npm start

## Installation Steps:

1. Clone repository: `git clone <https/git://repo_url>`
2. Install node_modules using `npm i` or `yarn`.

## Simulate:

`npm start` or `yarn start` to start Webpack dev server. Hosts application at http://localhost:3000/

## Build:

To build the web version of the app: `npm run build:web` or `yarn build:web`

## Testing:

`npm test` or `yarn test` to run the test suites and generate coverage reports in `<ROOT_DIR>/coverage` directory.

To update snapshots: `npm test -- -u` or `yarn test -u`

## Linting:

`npm run lint` or `yarn lint` to list down JS & CSS linting issues.

`npm run lint:fix` or `yarn lint:fix` to fix auto-fixable linting issues.

## Building API JSON to feed Saga Helpers

This is done automatically via Webpack during hot-reload. If doing manually:

`npm run merge:api-json` or `yarn merge:api-json` if to be merged standalone. Otherwise, this process is auto-executed at the start of webpack, web build and test commands.
