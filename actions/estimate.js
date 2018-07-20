import {CALL_API} from '../middleware/api';

export const ESTIMATE_LOAD_REQUEST = 'ESTIMATE_LOAD_REQUEST';
export const ESTIMATE_LOAD_SUCCESS = 'ESTIMATE_LOAD_SUCCESS';
export const ESTIMATE_LOAD_FAILURE = 'ESTIMATE_LOAD_FAILURE';

export const ESTIMATE_CREATE_REQUEST = 'ESTIMATE_CREATE_REQUEST';
export const ESTIMATE_CREATE_SUCCESS = 'ESTIMATE_CREATE_SUCCESS';
export const ESTIMATE_CREATE_FAILURE = 'ESTIMATE_CREATE_FAILURE';

export const ESTIMATE_EDIT_REQUEST = 'ESTIMATE_EDIT_REQUEST';
export const ESTIMATE_EDIT_SUCCESS = 'ESTIMATE_EDIT_SUCCESS';
export const ESTIMATE_EDIT_FAILURE = 'ESTIMATE_EDIT_FAILURE';

export const ESTIMATE_CHANGE_DATA = 'ESTIMATE_CHANGE_DATA';

export const ESTIMATE_PRODUCTION_CREATE_REQUEST = 'ESTIMATE_PRODUCTION_CREATE_REQUEST';
export const ESTIMATE_PRODUCTION_CREATE_SUCCESS = 'ESTIMATE_PRODUCTION_CREATE_SUCCESS';
export const ESTIMATE_PRODUCTION_CREATE_FAILURE = 'ESTIMATE_PRODUCTION_CREATE_FAILURE';

export const ESTIMATE_PRODUCTION_EDIT_REQUEST = 'ESTIMATE_PRODUCTION_EDIT_REQUEST';
export const ESTIMATE_PRODUCTION_EDIT_SUCCESS = 'ESTIMATE_PRODUCTION_EDIT_SUCCESS';
export const ESTIMATE_PRODUCTION_EDIT_FAILURE = 'ESTIMATE_PRODUCTION_EDIT_FAILURE';

export const ESTIMATE_PRODUCTION_DELETE_REQUEST = 'ESTIMATE_PRODUCTION_DELETE_REQUEST';
export const ESTIMATE_PRODUCTION_DELETE_SUCCESS = 'ESTIMATE_PRODUCTION_DELETE_SUCCESS';
export const ESTIMATE_PRODUCTION_DELETE_FAILURE = 'ESTIMATE_PRODUCTION_DELETE_FAILURE';

export const ESTIMATE_PRODUCTION_CHANGE_DATA = 'ESTIMATE_PRODUCTION_CHANGE_DATA';

export const ESTIMATE_CLEAR_DATA = 'ESTIMATE_CLEAR_DATA';

export const ESTIMATE_PRODUCTION_LOCKED_REQUEST = 'ESTIMATE_PRODUCTION_LOCKED_REQUEST';
export const ESTIMATE_PRODUCTION_LOCKED_SUCCESS = 'ESTIMATE_PRODUCTION_LOCKED_SUCCESS';
export const ESTIMATE_PRODUCTION_LOCKED_FAILURE = 'ESTIMATE_PRODUCTION_LOCKED_FAILURE';

export const ESTIMATE_PRODUCTION_UNLOCKED_REQUEST = 'ESTIMATE_PRODUCTION_UNLOCKED_REQUEST';
export const ESTIMATE_PRODUCTION_UNLOCKED_SUCCESS = 'ESTIMATE_PRODUCTION_UNLOCKED_SUCCESS';
export const ESTIMATE_PRODUCTION_UNLOCKED_FAILURE = 'ESTIMATE_PRODUCTION_UNLOCKED_FAILURE';

export const ESTIMATE_UPDATE_PRICE_REQUEST = 'ESTIMATE_UPDATE_PRICE_REQUEST';
export const ESTIMATE_UPDATE_PRICE_SUCCESS = 'ESTIMATE_UPDATE_PRICE_SUCCESS';
export const ESTIMATE_UPDATE_PRICE_FAILURE = 'ESTIMATE_UPDATE_PRICE_FAILURE';

const getEstimateEdit = (estimateId) => ({
  [CALL_API]: {
    types: [ESTIMATE_LOAD_REQUEST, ESTIMATE_LOAD_SUCCESS, ESTIMATE_LOAD_FAILURE],
    endpoint: `estimates/${estimateId}`,
    method: 'GET'
  }
});
export const estimateLoad = (estimateId) => (dispatch, getState) => {
  return dispatch(getEstimateEdit(estimateId));
}


const getEstimateDraftEdit = (estimateId) => ({
  [CALL_API]: {
    types: [ESTIMATE_LOAD_REQUEST, ESTIMATE_LOAD_SUCCESS, ESTIMATE_LOAD_FAILURE],
    endpoint: `estimates/draft/${estimateId}`,
    method: 'GET'
  }
});
export const estimateDraftLoad = (estimateId) => (dispatch, getState) => {
  return dispatch(getEstimateDraftEdit(estimateId));
}


const postEstimate = (data) => ({
  [CALL_API]: {
    types: [ESTIMATE_CREATE_REQUEST, ESTIMATE_CREATE_SUCCESS, ESTIMATE_CREATE_FAILURE],
    endpoint: 'estimates',
    method: 'POST',
    body: data
  }
});
export const estimateCreate = (data) => (dispatch, getState) => {
  return dispatch(postEstimate(data));
}


const putEstimateEdit = (estimateId, data) => ({
  [CALL_API]: {
    types: [ESTIMATE_EDIT_REQUEST, ESTIMATE_EDIT_SUCCESS, ESTIMATE_EDIT_FAILURE],
    endpoint: `estimates/${estimateId}`,
    method: 'PUT',
    body: data
  }
});
export const estimateEdit = (estimateId, data) => (dispatch, getState) => {
  return dispatch(putEstimateEdit(estimateId, data));
}


export const estimateChangeData = (data) => ({
  data,
  type: ESTIMATE_CHANGE_DATA
});


export const estimateClearData = () => ({
  type: ESTIMATE_CLEAR_DATA
});


const postEstimateProduction = (estimateId, data) => ({
  [CALL_API]: {
    types: [ESTIMATE_PRODUCTION_CREATE_REQUEST, ESTIMATE_PRODUCTION_CREATE_SUCCESS, ESTIMATE_PRODUCTION_CREATE_FAILURE],
    endpoint: `estimates/${estimateId}/productions`,
    method: 'POST',
    body: data
  }
});
export const estimateProductionCreate = (estimateId, data) => (dispatch) => {
  return dispatch(postEstimateProduction(estimateId, data));
};


const putEstimateProduction = (productionId, data) => ({
  [CALL_API]: {
    types: [ESTIMATE_PRODUCTION_EDIT_REQUEST, ESTIMATE_PRODUCTION_EDIT_SUCCESS, ESTIMATE_PRODUCTION_EDIT_FAILURE],
    endpoint: `estimates/production/${productionId}`,
    method: 'PUT',
    body: data
  }
});
export const estimateProductionEdit = (productionId, data) => (dispatch, getState) => {
  return dispatch(putEstimateProduction(productionId, data));
};


const deleteEstimateProduction = (productionId) => ({
  [CALL_API]: {
    types: [ESTIMATE_PRODUCTION_DELETE_REQUEST, ESTIMATE_PRODUCTION_DELETE_SUCCESS, ESTIMATE_PRODUCTION_DELETE_FAILURE],
    endpoint: `estimates/production/${productionId}`,
    method: 'DELETE'
  }
});
export const estimateProductionDelete = (productionId) => (dispatch, getState) => {
  return dispatch(deleteEstimateProduction(productionId));
};


export const estimateProductionChangeData = (data) => ({
  data,
  type: ESTIMATE_PRODUCTION_CHANGE_DATA
});


const lockedEstimateProduction = (productionId) => ({
  [CALL_API]: {
    types: [ESTIMATE_PRODUCTION_LOCKED_REQUEST, ESTIMATE_PRODUCTION_LOCKED_SUCCESS, ESTIMATE_PRODUCTION_LOCKED_FAILURE],
    endpoint: `estimates/production/${productionId}/locked`,
    method: 'PUT'
  }
});
export const estimateProductionLocked = (productionId) => (dispatch) => {
  return dispatch(lockedEstimateProduction(productionId));
};


const unlockedEstimateProduction = (productionId) => ({
  [CALL_API]: {
    types: [ESTIMATE_PRODUCTION_UNLOCKED_REQUEST, ESTIMATE_PRODUCTION_UNLOCKED_SUCCESS, ESTIMATE_PRODUCTION_UNLOCKED_FAILURE],
    endpoint: `estimates/production/${productionId}/unlocked`,
    method: 'PUT'
  }
});
export const estimateProductionUnlocked = (productionId) => (dispatch) => {
  return dispatch(unlockedEstimateProduction(productionId));
};


const updatePriceEstimate = (estimateId) => ({
  [CALL_API]: {
    types: [ESTIMATE_UPDATE_PRICE_REQUEST, ESTIMATE_UPDATE_PRICE_SUCCESS, ESTIMATE_UPDATE_PRICE_FAILURE],
    endpoint: `estimates/${estimateId}/update-price`,
    method: 'PUT'
  }
});
export const estimateUpdatePrice = (estimateId) => (dispatch) => {
  return dispatch(updatePriceEstimate(estimateId));
};
