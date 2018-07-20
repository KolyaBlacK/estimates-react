import merge from 'lodash/merge'
import * as ActionTypes from '../actions'

export const draft = (state = {isLoading: false, data: [], permissions: {}}, action) => {
  switch (action.type) {
    case ActionTypes.ESTIMATES_DRAFT_REQUEST:
      return merge({}, state, {isLoading: true});
    case ActionTypes.ESTIMATES_DRAFT_FAILURE:
      return merge({}, state, {isLoading: false});
    case ActionTypes.ESTIMATES_DRAFT_SUCCESS:
      return merge({}, state, {isLoading: false, data: action.response.data});

    default:
      return state;
  }
};
