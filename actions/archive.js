import {CALL_API} from '../middleware/api';

export const ESTIMATES_ARCHIVED_REQUEST = 'ESTIMATES_ARCHIVED_REQUEST';
export const ESTIMATES_ARCHIVED_SUCCESS = 'ESTIMATES_ARCHIVED_SUCCESS';
export const ESTIMATES_ARCHIVED_FAILURE = 'ESTIMATES_ARCHIVED_FAILURE';

export const ESTIMATES_UN_ARCHIVED_REQUEST = 'ESTIMATES_UN_ARCHIVED_REQUEST';
export const ESTIMATES_UN_ARCHIVED_SUCCESS = 'ESTIMATES_UN_ARCHIVED_SUCCESS';
export const ESTIMATES_UN_ARCHIVED_FAILURE = 'ESTIMATES_UN_ARCHIVED_FAILURE';

const fetchArchivedEstimates = () => ({
  [CALL_API]: {
    types: [ESTIMATES_ARCHIVED_REQUEST, ESTIMATES_ARCHIVED_SUCCESS, ESTIMATES_ARCHIVED_FAILURE],
    endpoint: `estimates/archive`,
    method: 'GET'
  }
});
export const loadArchivedEstimates = () => (dispatch) => {
  return dispatch(fetchArchivedEstimates());
};

const fetchUnArchivedEstimates = (id) => ({
  [CALL_API]: {
    types: [ESTIMATES_UN_ARCHIVED_REQUEST, ESTIMATES_UN_ARCHIVED_SUCCESS, ESTIMATES_UN_ARCHIVED_FAILURE],
    endpoint: `estimates/${id}/unarchived`,
    method: 'PUT'
  }
});
export const unArchivedEstimates = (id) => (dispatch) => {
  return dispatch(fetchUnArchivedEstimates(id));
};
