import {CALL_API} from '../middleware/api';

export const PRODUCTIONS_REQUEST = 'PRODUCTIONS_REQUEST';
export const PRODUCTIONS_SUCCESS = 'PRODUCTIONS_SUCCESS';
export const PRODUCTIONS_FAILURE = 'PRODUCTIONS_FAILURE';

export const PRODUCTIONS_AVAIL_REQUEST = 'PRODUCTIONS_AVAIL_REQUEST';
export const PRODUCTIONS_AVAIL_SUCCESS = 'PRODUCTIONS_AVAIL_SUCCESS';
export const PRODUCTIONS_AVAIL_FAILURE = 'PRODUCTIONS_AVAIL_FAILURE';

export const PRODUCTIONS_DELETE_REQUEST = 'PRODUCTIONS_DELETE_REQUEST';
export const PRODUCTIONS_DELETE_SUCCESS = 'PRODUCTIONS_DELETE_SUCCESS';
export const PRODUCTIONS_DELETE_FAILURE = 'PRODUCTIONS_DELETE_FAILURE';

export const PRODUCTIONS_ADD_REQUEST = 'PRODUCTIONS_ADD_REQUEST';
export const PRODUCTIONS_ADD_SUCCESS = 'PRODUCTIONS_ADD_SUCCESS';
export const PRODUCTIONS_ADD_FAILURE = 'PRODUCTIONS_ADD_FAILURE';

export const PRODUCTIONS_UPDATE_REQUEST = 'PRODUCTIONS_UPDATE_REQUEST';
export const PRODUCTIONS_UPDATE_SUCCESS = 'PRODUCTIONS_UPDATE_SUCCESS';
export const PRODUCTIONS_UPDATE_FAILURE = 'PRODUCTIONS_UPDATE_FAILURE';

const fetchProductions = () => ({
  [CALL_API]: {
    types: [PRODUCTIONS_REQUEST, PRODUCTIONS_SUCCESS, PRODUCTIONS_FAILURE],
    endpoint: `productions`,
    method: 'GET'
  }
});
export const loadProductions = () => (dispatch) => {
  return dispatch(fetchProductions());
};


const fetchAvailiableProductions = (estimateID) => ({
  [CALL_API]: {
    types: [PRODUCTIONS_AVAIL_REQUEST, PRODUCTIONS_AVAIL_SUCCESS, PRODUCTIONS_AVAIL_FAILURE],
    endpoint: `estimates/${estimateID}/available-production`,
    method: 'GET'
  }
});
export const loadAvaliableProductions = (estimateID) => (dispatch) => {
  return dispatch(fetchAvailiableProductions(estimateID));
};


const fetchDeleteProduction = (productId) => ({
  [CALL_API]: {
    types: [PRODUCTIONS_DELETE_REQUEST, PRODUCTIONS_DELETE_SUCCESS, PRODUCTIONS_DELETE_FAILURE],
    endpoint: `productions/${productId}`,
    method: 'DELETE'
  }
});
export const deleteProductions = (productId) => (dispatch) => {
  return dispatch(fetchDeleteProduction(productId));
};


const fetchAddProduction = (data) => ({
  [CALL_API]: {
    types: [PRODUCTIONS_ADD_REQUEST, PRODUCTIONS_ADD_SUCCESS, PRODUCTIONS_ADD_FAILURE],
    endpoint: 'productions',
    method: 'POST',
    body: data
  }
});
export const addProductions = (data) => (dispatch) => {
  return dispatch(fetchAddProduction(data));
};


const fetchUpdateProduction = (productId, data) => ({
  [CALL_API]: {
    types: [PRODUCTIONS_UPDATE_REQUEST, PRODUCTIONS_UPDATE_SUCCESS, PRODUCTIONS_UPDATE_FAILURE],
    endpoint: `productions/${productId}`,
    method: 'PUT',
    body: data
  }
});
export const updateProductions = (productId, data) => (dispatch) => {
  return dispatch(fetchUpdateProduction(productId, data));
};
