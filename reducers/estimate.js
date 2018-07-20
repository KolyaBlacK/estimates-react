import merge from 'lodash/merge'
import assign from 'lodash/assign'
import moment from 'moment';
import * as ActionTypes from '../actions'

const defaultState = {
  isLoading: false,
  isUpdating: false,
  data: {
    brand: '',
    name: '',
    sys_name: '',
    date_from: moment(),
    date_to: moment(),
    rate_card: {id: 0},
    lang: 'en',
    draft: false,
    managers: [],
  }
};

function updateDates(data) {
  data.date_from = moment(data.date_from, "DD-MM-YYYY");
  data.date_to = moment(data.date_to, "DD-MM-YYYY");
  return data;
}

export const estimate = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.ESTIMATE_LOAD_REQUEST:
      return merge({}, state, {isLoading: true, isUpdating: false});
    case ActionTypes.ESTIMATE_LOAD_SUCCESS:
      return merge({}, state, {
        isLoading: false,
        isUpdating: false,
        estimateId: action.response.data[0].id,
        data: updateDates(action.response.data[0])
      });
    case ActionTypes.ESTIMATE_LOAD_FAILURE:
      return merge({}, state, {isLoading: false, isUpdating: false});

    case ActionTypes.ESTIMATE_CREATE_REQUEST:
      return merge({}, state, {isLoading: false, isUpdating: true});
    case ActionTypes.ESTIMATE_CREATE_FAILURE:
      return merge({}, state, {isLoading: false, isUpdating: false});
    case ActionTypes.ESTIMATE_CREATE_SUCCESS:
      return merge({}, state, {isLoading: false, isUpdating: false, estimateId: action.response.data[0].id});

    case ActionTypes.ESTIMATE_EDIT_REQUEST:
      return merge({}, state, {isLoading: false, isUpdating: true});
    case ActionTypes.ESTIMATE_EDIT_FAILURE:
      return merge({}, state, {isLoading: false, isUpdating: false});
    case ActionTypes.ESTIMATE_EDIT_SUCCESS:
      return merge({}, state, {isLoading: false, isUpdating: false});

    case ActionTypes.ESTIMATE_CHANGE_DATA:
      return merge({}, state, {data: action.data});

    case ActionTypes.ESTIMATE_CLEAR_DATA:
      return defaultState;

    case ActionTypes.ESTIMATE_PRODUCTION_EDIT_REQUEST:
      return merge({}, state, {isLoading: false, isUpdating: true});
    case ActionTypes.ESTIMATE_PRODUCTION_EDIT_FAILURE:
      return merge({}, state, {isLoading: false, isUpdating: false});
    case ActionTypes.ESTIMATE_PRODUCTION_EDIT_SUCCESS:
      return merge({}, state, {isLoading: false, isUpdating: false});

    case ActionTypes.ESTIMATE_PRODUCTION_CREATE_REQUEST:
      return merge({}, state, {isLoading: false, isUpdating: true, productionId: null, productionUId: null});
    case ActionTypes.ESTIMATE_PRODUCTION_CREATE_FAILURE:
      return merge({}, state, {isLoading: false, isUpdating: false});
    case ActionTypes.ESTIMATE_PRODUCTION_CREATE_SUCCESS:
      return merge({}, state, {
        isLoading: false,
        isUpdating: false,
        productionId: action.response.data[0].id,
        productionUId: action.response.data[0].tmp_field
      });

    case ActionTypes.ESTIMATE_PRODUCTION_CHANGE_DATA:
      return assign({}, state, {prodData: action.data, productionId: null, productionUId: null});

    case ActionTypes.ESTIMATE_UPDATE_PRICE_REQUEST:
      return merge({}, state, {isLoading: true, isUpdating: false});

    case ActionTypes.ESTIMATE_UPDATE_PRICE_SUCCESS:
      return merge({}, state, {
        isLoading: false,
        isUpdating: false,
        estimateId: action.response.data[0].id,
        data: updateDates(action.response.data[0])
      });

    case ActionTypes.ESTIMATE_UPDATE_PRICE_FAILURE:
      return merge({}, state, {isLoading: false, isUpdating: false});

    default:
      return state;
  }
};
