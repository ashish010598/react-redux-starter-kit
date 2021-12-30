import superagent from 'superagent';

const createRequest = apiConfig => {
  const {
    baseUrl,
    path,
    method,
    headers = {},
    query,
    data,
    timeout,
    auth
  } = apiConfig;
  const url = baseUrl + path;
  let superAgentInstance;

  if (auth && auth.username && auth.password) {
    superAgentInstance = superagent[method.toLowerCase()](url).query(query).send(data).set(headers).timeout(timeout).auth(auth.username, auth.password);
  } else {
    superAgentInstance = superagent[method.toLowerCase()](url).query(query).send(data).set(headers).timeout(timeout);
  }

  const promise = new Promise((resolve, reject) => {
    superAgentInstance.end((error, response) => {
      if (error) {
        return reject(response || {
          error
        });
      }

      return resolve(response);
    });
  });

  promise.abort = () => {
    superAgentInstance.abort();
    console.error('Request Aborted!');
  };

  return promise;
};

export default createRequest;