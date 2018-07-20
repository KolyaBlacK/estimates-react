import merge from 'lodash/merge'
import * as ActionTypes from '../actions'

export const users = (state = {isLoading: false, data: []}, action) => {
  switch (action.type) {
    case ActionTypes.USERS_ACTIVE_REQUEST:
      return merge({}, state, {isLoading: true});
    case ActionTypes.USERS_ACTIVE_FAILURE:
      return merge({}, state, {isLoading: false});
    case ActionTypes.USERS_ACTIVE_SUCCESS:
      return merge({}, state, {isLoading: false, data: action.response.data});

    case ActionTypes.USERS_REQUEST:
      return merge({}, state, {isLoading: true});
    case ActionTypes.USERS_FAILURE:
      return merge({}, state, {isLoading: false});
    case ActionTypes.USERS_SUCCESS:
      return merge({}, state, {isLoading: false, data: action.response.data});

    case ActionTypes.USERS_ADD_REQUEST:
      return merge({}, state, {isLoading: true});
    case ActionTypes.USERS_ADD_FAILURE:
      return merge({}, state, {isLoading: false});
    case ActionTypes.USERS_ADD_SUCCESS:
      return merge({}, state, {isLoading: false, data: state.data.concat(action.response.data)});

    case ActionTypes.USERS_DELETE_REQUEST:
      return merge({}, state, {isLoading: true});
    case ActionTypes.USERS_DELETE_FAILURE:
      return merge({}, state, {isLoading: false});
    case ActionTypes.USERS_DELETE_SUCCESS:
      return merge({}, {isLoading: false, data: state.data.filter(({id}) => id !== action.response.data)});

    case ActionTypes.USERS_UPDATE_REQUEST:
      return merge({}, state, {isLoading: true});
    case ActionTypes.USERS_UPDATE_FAILURE:
      return merge({}, state, {isLoading: false});
    case ActionTypes.USERS_UPDATE_SUCCESS:
      return merge({}, state, {
        isLoading: false, data: state.data.map((user) => {
          if (user.id == action.response.data[0].id) {
            return action.response.data[0]
          }
        })
      });

    default:
      return state;
  }
};
