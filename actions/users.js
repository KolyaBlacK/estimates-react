import {CALL_API} from '../middleware/api';

export const USERS_REQUEST = 'USERS_REQUEST';
export const USERS_SUCCESS = 'USERS_SUCCESS';
export const USERS_FAILURE = 'USERS_FAILURE';

export const USERS_ACTIVE_REQUEST = 'USERS_ACTIVE_REQUEST';
export const USERS_ACTIVE_SUCCESS = 'USERS_ACTIVE_SUCCESS';
export const USERS_ACTIVE_FAILURE = 'USERS_ACTIVE_FAILURE';

export const USERS_ADD_REQUEST = 'USERS_ADD_REQUEST';
export const USERS_ADD_SUCCESS = 'USERS_ADD_SUCCESS';
export const USERS_ADD_FAILURE = 'USERS_ADD_FAILURE';

export const USERS_DELETE_REQUEST = 'USERS_DELETE_REQUEST';
export const USERS_DELETE_SUCCESS = 'USERS_DELETE_SUCCESS';
export const USERS_DELETE_FAILURE = 'USERS_DELETE_FAILURE';

export const USERS_UPDATE_REQUEST = 'USERS_UPDATE_REQUEST';
export const USERS_UPDATE_SUCCESS = 'USERS_UPDATE_SUCCESS';
export const USERS_UPDATE_FAILURE = 'USERS_UPDATE_FAILURE';

const fetchUsers = () => ({
  [CALL_API]: {
    types: [USERS_REQUEST, USERS_SUCCESS, USERS_FAILURE],
    endpoint: 'users',
    method: 'GET'
  }
});
export const loadUsers = () => (dispatch) => {
  return dispatch(fetchUsers());
};


const fetchActiveUsers = () => ({
  [CALL_API]: {
    types: [USERS_ACTIVE_REQUEST, USERS_ACTIVE_SUCCESS, USERS_ACTIVE_FAILURE],
    endpoint: 'users/active',
    method: 'GET'
  }
});
export const loadActiveUsers = () => (dispatch) => {
  return dispatch(fetchActiveUsers());
};


const fetchAddUsers = (data) => ({
  [CALL_API]: {
    types: [USERS_ADD_REQUEST, USERS_ADD_SUCCESS, USERS_ADD_FAILURE],
    endpoint: 'users',
    method: 'POST',
    body: data
  }
});
export const addUsers = (data) => (dispatch) => {
  return dispatch(fetchAddUsers(data));
};


const fetchDeleteUsers = (userId) => ({
  [CALL_API]: {
    types: [USERS_DELETE_REQUEST, USERS_DELETE_SUCCESS, USERS_DELETE_FAILURE],
    endpoint: `users/${userId}`,
    method: 'DELETE'
  }
});
export const deleteUsers = (userId) => (dispatch) => {
  return dispatch(fetchDeleteUsers(userId));
};


const fetchUpdateUsers = (userId, data) => ({
  [CALL_API]: {
    types: [USERS_UPDATE_REQUEST, USERS_UPDATE_SUCCESS, USERS_UPDATE_FAILURE],
    endpoint: `users/${userId}`,
    method: 'PUT',
    body: data
  }
});
export const updateUsers = (userId, data) => (dispatch) => {
  return dispatch(fetchUpdateUsers(userId, data));
};
