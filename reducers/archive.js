import merge from 'lodash/merge'
import * as ActionTypes from '../actions'

export const archive = (state = {isLoading: false, data: [], permissions: {}}, action) => {
  switch (action.type) {

    case ActionTypes.ESTIMATES_ARCHIVED_REQUEST:
      return merge({}, state, {isLoading: true});
    case ActionTypes.ESTIMATES_ARCHIVED_FAILURE:
      return merge({}, state, {isLoading: false});
    case ActionTypes.ESTIMATES_ARCHIVED_SUCCESS:
      return merge({}, state, {isLoading: false, data: action.response.data});

    case ActionTypes.ESTIMATES_UN_ARCHIVED_REQUEST:
      return merge({}, state, {isLoading: true});
    case ActionTypes.ESTIMATES_UN_ARCHIVED_FAILURE:
      return merge({}, state, {isLoading: false});
    case ActionTypes.ESTIMATES_UN_ARCHIVED_SUCCESS:
      return merge({}, {isLoading: false, data: state.data.filter(({id}) => id !== action.response.data)});

    default:
      return state;
  }
};
