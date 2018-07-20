import {CALL_API} from '../middleware/api';

export const DIVISIONS_REQUEST = 'DIVISIONS_REQUEST';
export const DIVISIONS_SUCCESS = 'DIVISIONS_SUCCESS';
export const DIVISIONS_FAILURE = 'DIVISIONS_FAILURE';

export const DIVISIONS_DELETE_REQUEST = 'DIVISIONS_DELETE_REQUEST';
export const DIVISIONS_DELETE_SUCCESS = 'DIVISIONS_DELETE_SUCCESS';
export const DIVISIONS_DELETE_FAILURE = 'DIVISIONS_DELETE_FAILURE';

export const DIVISIONS_ADD_REQUEST = 'DIVISIONS_ADD_REQUEST';
export const DIVISIONS_ADD_SUCCESS = 'DIVISIONS_ADD_SUCCESS';
export const DIVISIONS_ADD_FAILURE = 'DIVISIONS_ADD_FAILURE';

export const DIVISIONS_UPDATE_REQUEST = 'DIVISIONS_UPDATE_REQUEST';
export const DIVISIONS_UPDATE_SUCCESS = 'DIVISIONS_UPDATE_SUCCESS';
export const DIVISIONS_UPDATE_FAILURE = 'DIVISIONS_UPDATE_FAILURE';

const fetchDivisions = () => ({
  [CALL_API]: {
    types: [DIVISIONS_REQUEST, DIVISIONS_SUCCESS, DIVISIONS_FAILURE],
    endpoint: `divisions`,
    method: 'GET'
  }
});
export const loadDivisions = () => (dispatch) => {
  return dispatch(fetchDivisions());
};


const fetchDeleteDivisions = (divisionId) => ({
  [CALL_API]: {
    types: [DIVISIONS_DELETE_REQUEST, DIVISIONS_DELETE_SUCCESS, DIVISIONS_DELETE_FAILURE],
    endpoint: `divisions/${divisionId}`,
    method: 'DELETE'
  }
});
export const deleteDivisions = (divisionId) => (dispatch) => {
  return dispatch(fetchDeleteDivisions(divisionId));
};


const fetchAddDivisions = (data) => ({
  [CALL_API]: {
    types: [DIVISIONS_ADD_REQUEST, DIVISIONS_ADD_SUCCESS, DIVISIONS_ADD_FAILURE],
    endpoint: `divisions`,
    method: 'POST',
    body: data
  }
});
export const addDivisions = (data) => (dispatch) => {
  return dispatch(fetchAddDivisions(data));
};


const fetchUpdateDivisions = (divisionId, data) => ({
  [CALL_API]: {
    types: [DIVISIONS_UPDATE_REQUEST, DIVISIONS_UPDATE_SUCCESS, DIVISIONS_UPDATE_FAILURE],
    endpoint: `divisions/${divisionId}`,
    method: 'PUT',
    body: data
  }
});
export const updateDivisions = (divisionId, data) => (dispatch) => {
  return dispatch(fetchUpdateDivisions(divisionId, data));
};
