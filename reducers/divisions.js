import merge from 'lodash/merge'
import * as ActionTypes from '../actions'

export const divisions = (state = {isLoading: false, data: [], permissions: {}}, action) => {
  switch (action.type) {
    case ActionTypes.DIVISIONS_REQUEST:
      return merge({}, state, {isLoading: true});
    case ActionTypes.DIVISIONS_FAILURE:
      return merge({}, state, {isLoading: false});
    case ActionTypes.DIVISIONS_SUCCESS:
      return merge({}, state, {isLoading: false, data: action.response.data, permissions: action.response.permissions});

    case ActionTypes.DIVISIONS_DELETE_REQUEST:
      return merge({}, state, {isLoading: true});
    case ActionTypes.DIVISIONS_DELETE_FAILURE:
      return merge({}, state, {isLoading: false});
    case ActionTypes.DIVISIONS_DELETE_SUCCESS:
      return merge({}, {isLoading: false, data: state.data.filter(({id}) => id !== action.response.data)});

    case ActionTypes.DIVISIONS_ADD_REQUEST:
      return merge({}, state, {isLoading: true});
    case ActionTypes.DIVISIONS_ADD_FAILURE:
      return merge({}, state, {isLoading: false});
    case ActionTypes.DIVISIONS_ADD_SUCCESS:
      return merge({}, state, {isLoading: false, data: state.data.concat(action.response.data)});

    case ActionTypes.DIVISIONS_UPDATE_REQUEST:
      return merge({}, state, {isLoading: true});
    case ActionTypes.DIVISIONS_UPDATE_FAILURE:
      return merge({}, state, {isLoading: false});
    case ActionTypes.DIVISIONS_UPDATE_SUCCESS:
      return merge({}, state, {
        isLoading: false, data: state.data.map((division) => {
          if (division.id == action.response.data[0].id) {
            return action.response.data[0]
          }
        })
      });

    default:
      return state;
  }
};
