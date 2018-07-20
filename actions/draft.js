import {CALL_API} from '../middleware/api';

export const ESTIMATES_DRAFT_REQUEST = 'ESTIMATES_DRAFT_REQUEST';
export const ESTIMATES_DRAFT_SUCCESS = 'ESTIMATES_DRAFT_SUCCESS';
export const ESTIMATES_DRAFT_FAILURE = 'ESTIMATES_DRAFT_FAILURE';

const fetchDraftEstimates = () => ({
  [CALL_API]: {
    types: [ESTIMATES_DRAFT_REQUEST, ESTIMATES_DRAFT_SUCCESS, ESTIMATES_DRAFT_FAILURE],
    endpoint: `estimates/draft`,
    method: 'GET'
  }
});
export const loadDraftEstimates = () => (dispatch) => {
  return dispatch(fetchDraftEstimates());
};
