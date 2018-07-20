import {CALL_API} from '../middleware/api';

export const EXPERTS_REQUEST = 'EXPERTS_REQUEST';
export const EXPERTS_SUCCESS = 'EXPERTS_SUCCESS';
export const EXPERTS_FAILURE = 'EXPERTS_FAILURE';

export const EXPERTS_DELETE_REQUEST = 'EXPERTS_DELETE_REQUEST';
export const EXPERTS_DELETE_SUCCESS = 'EXPERTS_DELETE_SUCCESS';
export const EXPERTS_DELETE_FAILURE = 'EXPERTS_DELETE_FAILURE';

export const EXPERTS_ADD_REQUEST = 'EXPERTS_ADD_REQUEST';
export const EXPERTS_ADD_SUCCESS = 'EXPERTS_ADD_SUCCESS';
export const EXPERTS_ADD_FAILURE = 'EXPERTS_ADD_FAILURE';

export const EXPERTS_UPDATE_REQUEST = 'EXPERTS_UPDATE_REQUEST';
export const EXPERTS_UPDATE_SUCCESS = 'EXPERTS_UPDATE_SUCCESS';
export const EXPERTS_UPDATE_FAILURE = 'EXPERTS_UPDATE_FAILURE';

const fetchExperts = () => ({
  [CALL_API]: {
    types: [EXPERTS_REQUEST, EXPERTS_SUCCESS, EXPERTS_FAILURE],
    endpoint: 'experts',
    method: 'GET'
  }
});
export const loadExperts = () => (dispatch) => {
  return dispatch(fetchExperts());
};


const fetchDeleteExperts = (expertsId) => ({
  [CALL_API]: {
    types: [EXPERTS_DELETE_REQUEST, EXPERTS_DELETE_SUCCESS, EXPERTS_DELETE_FAILURE],
    endpoint: `experts/${expertsId}`,
    method: 'DELETE'
  }
});
export const deleteExperts = (expertsId) => (dispatch) => {
  return dispatch(fetchDeleteExperts(expertsId));
};


const fetchAddExperts = (data) => ({
  [CALL_API]: {
    types: [EXPERTS_ADD_REQUEST, EXPERTS_ADD_SUCCESS, EXPERTS_ADD_FAILURE],
    endpoint: `experts`,
    method: 'POST',
    body: data
  }
});
export const addExperts = (data) => (dispatch) => {
  return dispatch(fetchAddExperts(data));
};


const fetchUpdateExperts = (expertsId, data) => ({
  [CALL_API]: {
    types: [EXPERTS_UPDATE_REQUEST, EXPERTS_UPDATE_SUCCESS, EXPERTS_UPDATE_FAILURE],
    endpoint: `experts/${expertsId}`,
    method: 'PUT',
    body: data
  }
});
export const updateExperts = (expertsId, data) => (dispatch) => {
  return dispatch(fetchUpdateExperts(expertsId, data));
};
