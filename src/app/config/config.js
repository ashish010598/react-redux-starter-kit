const ENV_NAME = {
  PROD: 'PROD',
  QA: 'QA',
  DEV: 'DEV',
};

const Environment = {
  [ENV_NAME.PROD]: {
    env: ENV_NAME.PROD,
    apiBaseUrl: `https://dummy.com`,
  },
  [ENV_NAME.QA]: {
    env: ENV_NAME.QA,
    apiBaseUrl: `https://dummy.com`,
  },
  [ENV_NAME.DEV]: {
    apiBaseUrl: `https://dummy.com`,
  },
};

const bootstrapEnv = () =>
  Environment[process.env.REACT_APP_ENV || ENV_NAME.DEV];
export default bootstrapEnv();
