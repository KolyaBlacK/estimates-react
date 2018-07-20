import merge from 'lodash/merge'
import * as ActionTypes from '../actions'

export const estimates = (state = {isLoading: false, data: [], permissions: {}}, action) => {
  switch (action.type) {
    case ActionTypes.ESTIMATES_REQUEST:
      return merge({}, state, {isLoading: true});
    case ActionTypes.ESTIMATES_FAILURE:
      return merge({}, state, {isLoading: false});
    case ActionTypes.ESTIMATES_SUCCESS:
      return merge({}, state, {isLoading: false, data: action.response.data, permissions: action.response.permissions});

    case ActionTypes.ESTIMATES_DELETE_REQUEST:
      return merge({}, state, {isLoading: true});
    case ActionTypes.ESTIMATES_DELETE_FAILURE:
      return merge({}, state, {isLoading: false});
    case ActionTypes.ESTIMATES_DELETE_SUCCESS:
      return merge({}, {isLoading: false, data: state.data.filter(({id}) => id !== action.response.data)});

    case ActionTypes.ESTIMATES_ADD_REQUEST:
      return merge({}, state, {isLoading: true});
    case ActionTypes.ESTIMATES_ADD_FAILURE:
      return merge({}, state, {isLoading: false});
    case ActionTypes.ESTIMATES_ADD_SUCCESS:
      return merge({}, state, {isLoading: false, data: state.data.concat(action.response.data)});

    case ActionTypes.ESTIMATES_UPDATE_REQUEST:
      return merge({}, state, {isLoading: true});
    case ActionTypes.ESTIMATES_UPDATE_FAILURE:
      return merge({}, state, {isLoading: false});
    case ActionTypes.ESTIMATES_UPDATE_SUCCESS:
      return merge({}, state, {
        isLoading: false, data: state.data.map((estimate) => {
          if (estimate.id == action.response.data[0].id) {
            return action.response.data[0]
          }
        })
      });

    case ActionTypes.ESTIMATES_ARCHIVED_ADD_REQUEST:
      return merge({}, state, {isLoading: true});
    case ActionTypes.ESTIMATES_ARCHIVED_ADD_FAILURE:
      return merge({}, state, {isLoading: false});
    case ActionTypes.ESTIMATES_ARCHIVED_ADD_SUCCESS:
      return merge({}, {isLoading: false, data: state.data.filter(({id}) => id !== action.response.data)});

    default:
      return state;
  }
};
