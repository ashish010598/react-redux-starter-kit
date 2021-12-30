/**
 * Base settings applicable across environments
 *
 * This file can include shared settings across environments
 *
 */
export default {
  ENV: process.env.NODE_ENV,
  API_TIMEOUT: 60000,
  API_MAX_RETRIES: 2,
  MIN_BROWSER_VERSIONS: {
    msie: '>=11',
    safari: '>=10.1',
    chrome: '>=60.0',
    firefox: '>=56.0',
    opera: '>=22'
  } // Refer to https://github.com/lancedikson/bowser for setting up browser versions

};