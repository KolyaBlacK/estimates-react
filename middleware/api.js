import 'whatwg-fetch';

const API_ROOT = '/api/';

/**
 * Fetches an API response and normalize the result JSON according to schema.
 * This makes every API response have the same shape, regardless of how nested it was.
 *
 * @param endpoint
 * @param method
 */

const token = document.querySelector('meta[name="api_token"]').getAttribute('content');

export const callApi = (endpoint, method, body) => {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;
  const fetchOptions = {
    method,
    credentials: 'same-origin',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  };

  if (['get', 'head'].indexOf(method.toLowerCase()) === -1) {
    fetchOptions.body = JSON.stringify(body);
  }

  return fetch(fullUrl, fetchOptions)
    .then(response =>
      response.json().then(json => {
        if (!response.ok) {
          return Promise.reject(json);
        }

        return json;
      })
    );
};

export const CALL_API = 'Call API';

/**
 * A Redux middleware that interprets actions with CALL_API info specified.
 * Performs the call and promises when such actions are dispatched.
 *
 * @param store
 */
export default store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let {body, endpoint, method} = callAPI;
  const {types} = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof method === 'function') {
    method = method(store.getState());
  }

  if (typeof body === 'undefined') {
    body = {};
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction
  };

  const [requestType, successType, failureType] = types;
  next(actionWith({type: requestType}));

  return callApi(endpoint, method, body).then(
    response => next(actionWith({
      response,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened',
      response: error
    }))
  );
}
