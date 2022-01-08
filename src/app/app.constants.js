import IMG from './utils/images';
import { version } from '../../package.json';
export const BASE_HREF = process.env.REACT_APP_BASE_HREF || '';

export const ROUTES = {
  // Added routes in constants
  HOME: {
    url: '/',
    label: 'My Test Route',
    icon: IMG.Home,
  },
  LOGIN: {
    url: '/login',
    label: '',
    icon: null,
  },
};

export const AppConstants = {
  INVALID: 'invalid',
  E403: '403',
  NOT_AVAILABLE: 'N/A',
  GLOBAL_ERRORS: {
    TITLE: {
      DATA_ERROR: 'Data Error',
      SERVER_ERROR: 'Server Error',
      ERROR: "We're sorry!",
    },
    MESSAGE: {
      DATA_ERROR: 'Please contact administrator.',
      SERVER_ERROR: 'Please contact administrator',
      ERROR:
        'An unexpected error has occurred. Our technical staff has been automatically notified and will be looking into this with utmost urgency.',
    },
  },
  DROPDOWN_DEFAULT: {
    value: '',
    label: '-- Select --',
  },
  TOASTR_TIMEOUT_IN_SECS: 7.5,
};

export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  NAME: /^[a-zA-Z ]+$/,
  DIGIT: /^\d+$/,
  NUMBER: /^\d{10}$/,
  NUMBER_PATTERN: /^[0-9\b]+$/,
  URL: /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g,
  PASSWORD: /^(?=.*\d)(?=.*[-!@#_$%^&*])(?=.*[A-Z]).{8,}$/,
  CAPITAL_LETTER: /[A-Z]/,
  SPECIAL_CHARACTER: /[-!@#_$%^&*]/,
  PASSWORD_NUMBER: /[0-9]/,
};

export const META_TAGS = {
  DEFAULT: {
    title: 'React Redux Starter Kit',
  },
};

export const USER_CONFIG_COMMON_ROUTES = [ROUTES.DUMMY_ROUTES];

export const RELEASE_DETAILS = {
  APP_VERSION: version,
};
