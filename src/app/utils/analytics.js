import _isEmpty from 'lodash/isEmpty';

const paramPropMap = {
  prop1: 'userName',
  prop2: 'userEmail',
  prop3: 'companyName',
  prop4: 'supportOlmId',
  prop5: 'emailVerified',
  prop18: 'mobileNumber',
};

export const recordTrackingEvent = (params = {}) => {
  const { eventName } = params;

  if (_isEmpty(eventName)) {
    console.warn('No eventName present for the event: ', params);
    return;
  }

  const eventsObj = {
    prop0: 'project_name',
    eVar1: eventName,
  };

  Object.keys(paramPropMap).forEach((prop) => {
    if (!_isEmpty(params[paramPropMap[prop]])) {
      eventsObj[prop] = params[paramPropMap[prop]];
    }
  });
};
