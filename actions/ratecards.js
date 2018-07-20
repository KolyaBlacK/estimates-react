import {CALL_API} from '../middleware/api';

export const RATE_CARDS_REQUEST = 'RATE_CARDS_REQUEST';
export const RATE_CARDS_SUCCESS = 'RATE_CARDS_SUCCESS';
export const RATE_CARDS_FAILURE = 'RATE_CARDS_FAILURE';

export const RATE_CARDS_DELETE_REQUEST = 'RATE_CARDS_DELETE_REQUEST';
export const RATE_CARDS_DELETE_SUCCESS = 'RATE_CARDS_DELETE_SUCCESS';
export const RATE_CARDS_DELETE_FAILURE = 'RATE_CARDS_DELETE_FAILURE';

export const RATE_CARDS_ADD_REQUEST = 'RATE_CARDS_ADD_REQUEST';
export const RATE_CARDS_ADD_SUCCESS = 'RATE_CARDS_ADD_SUCCESS';
export const RATE_CARDS_ADD_FAILURE = 'RATE_CARDS_ADD_FAILURE';

export const RATE_CARDS_UPDATE_REQUEST = 'RATE_CARDS_UPDATE_REQUEST';
export const RATE_CARDS_UPDATE_SUCCESS = 'RATE_CARDS_UPDATE_SUCCESS';
export const RATE_CARDS_UPDATE_FAILURE = 'RATE_CARDS_UPDATE_FAILURE';

const fetchRateCards = () => ({
  [CALL_API]: {
    types: [RATE_CARDS_REQUEST, RATE_CARDS_SUCCESS, RATE_CARDS_FAILURE],
    endpoint: 'rate-cards',
    method: 'GET'
  }
});
export const loadRateCards = () => (dispatch) => {
  return dispatch(fetchRateCards());
};


const fetchDeleteRateCards = (RateCardsId) => ({
  [CALL_API]: {
    types: [RATE_CARDS_DELETE_REQUEST, RATE_CARDS_DELETE_SUCCESS, RATE_CARDS_DELETE_FAILURE],
    endpoint: `rate-cards/${RateCardsId}`,
    method: 'DELETE'
  }
});
export const deleteRateCards = (RateCardsId) => (dispatch) => {
  return dispatch(fetchDeleteRateCards(RateCardsId));
};


const fetchAddRateCards = (data) => ({
  [CALL_API]: {
    types: [RATE_CARDS_ADD_REQUEST, RATE_CARDS_ADD_SUCCESS, RATE_CARDS_ADD_FAILURE],
    endpoint: `rate-cards`,
    method: 'POST',
    body: data
  }
});
export const addRateCards = (data) => (dispatch) => {
  return dispatch(fetchAddRateCards(data));
};


const fetchUpdateRateCards = (rateCardsId, data) => ({
  [CALL_API]: {
    types: [RATE_CARDS_UPDATE_REQUEST, RATE_CARDS_UPDATE_SUCCESS, RATE_CARDS_UPDATE_FAILURE],
    endpoint: `rate-cards/${rateCardsId}`,
    method: 'PUT',
    body: data
  }
});
export const updateRateCards = (rateCardsId, data) => (dispatch) => {
  return dispatch(fetchUpdateRateCards(rateCardsId, data));
};
