import baseConfig from './env/base.config';
import devConfig from './env/dev.config';
import qaConfig from './env/qa.config';
import prodConfig from './env/prod.config';
export const getAppConfig = env => {
  let runningEnvConfig;

  switch (env) {
    case 'dev':
      runningEnvConfig = devConfig;
      break;

    case 'qa':
      runningEnvConfig = qaConfig;
      break;

    case 'prod':
      runningEnvConfig = prodConfig;
      break;

    default:
      runningEnvConfig = devConfig;
      break;
  }

  return { ...baseConfig,
    ...runningEnvConfig
  };
};
const config = getAppConfig(process.env.SERVER_ENV);
export default config;