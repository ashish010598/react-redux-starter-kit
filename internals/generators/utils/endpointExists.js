/**
 * endpointExists
 *
 * Check whether the given API key already exists in the config/autoGenApiEndpoints.json
 */

const fs = require('fs');
const uniq = require('lodash/uniq');

let endpoints = [];

if (process.env.APP_SHORT_NAME) {
  const endpointsDefault = JSON.parse(fs.readFileSync(`${process.cwd()}/src/app/config/autoGenApiEndpoints.json`, 'utf8'));
  const endpointsQA = JSON.parse(fs.readFileSync(`${process.cwd()}/src/app/config/autoGenApiEndpoints.qa.json`, 'utf8'));

  endpoints = uniq([...Object.keys(endpointsDefault), ...Object.keys(endpointsQA)]);
}

function endpointExists(apiKey) {
  return endpoints.indexOf(apiKey.toUpperCase()) >= 0;
}

module.exports = endpointExists;
