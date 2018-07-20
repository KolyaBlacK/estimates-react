import {CALL_API} from '../middleware/api';

export const ESTIMATES_REQUEST = 'ESTIMATES_REQUEST';
export const ESTIMATES_SUCCESS = 'ESTIMATES_SUCCESS';
export const ESTIMATES_FAILURE = 'ESTIMATES_FAILURE';

export const ESTIMATES_DELETE_REQUEST = 'ESTIMATES_DELETE_REQUEST';
export const ESTIMATES_DELETE_SUCCESS = 'ESTIMATES_DELETE_SUCCESS';
export const ESTIMATES_DELETE_FAILURE = 'ESTIMATES_DELETE_FAILURE';

export const ESTIMATES_ADD_REQUEST = 'ESTIMATES_ADD_REQUEST';
export const ESTIMATES_ADD_SUCCESS = 'ESTIMATES_ADD_SUCCESS';
export const ESTIMATES_ADD_FAILURE = 'ESTIMATES_ADD_FAILURE';

export const ESTIMATES_UPDATE_REQUEST = 'ESTIMATES_UPDATE_REQUEST';
export const ESTIMATES_UPDATE_SUCCESS = 'ESTIMATES_UPDATE_SUCCESS';
export const ESTIMATES_UPDATE_FAILURE = 'ESTIMATES_UPDATE_FAILURE';

export const ESTIMATES_ARCHIVED_ADD_REQUEST = 'ESTIMATES_ARCHIVED_ADD_REQUEST';
export const ESTIMATES_ARCHIVED_ADD_SUCCESS = 'ESTIMATES_ARCHIVED_ADD_SUCCESS';
export const ESTIMATES_ARCHIVED_ADD_FAILURE = 'ESTIMATES_ARCHIVED_ADD_FAILURE';

const fetchEstimates = () => ({
  [CALL_API]: {
    types: [ESTIMATES_REQUEST, ESTIMATES_SUCCESS, ESTIMATES_FAILURE],
    endpoint: `estimates/experts`,
    method: 'GET'
  }
});
export const loadEstimates = () => (dispatch) => {
  return dispatch(fetchEstimates());
};


const fetchDeleteEstimates = (estimatesId) => ({
  [CALL_API]: {
    types: [ESTIMATES_DELETE_REQUEST, ESTIMATES_DELETE_SUCCESS, ESTIMATES_DELETE_FAILURE],
    endpoint: `estimates/${estimatesId}`,
    method: 'DELETE'
  }
});
export const deleteEstimates = (estimatesId) => (dispatch) => {
  return dispatch(fetchDeleteEstimates(estimatesId));
};


const fetchArchivedAddEstimates = (estimatesId) => ({
  [CALL_API]: {
    types: [ESTIMATES_ARCHIVED_ADD_REQUEST, ESTIMATES_ARCHIVED_ADD_SUCCESS, ESTIMATES_ARCHIVED_ADD_FAILURE],
    endpoint: `estimates/${estimatesId}/archived`,
    method: 'PUT'
  }
});
export const archivedAddEstimates = (estimatesId) => (dispatch) => {
  return dispatch(fetchArchivedAddEstimates(estimatesId));
};
