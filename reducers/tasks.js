import merge from 'lodash/merge'
import * as ActionTypes from '../actions'

export const tasks = (state = {isLoading: false, data: []}, action) => {
  switch (action.type) {
    case ActionTypes.TASKS_REQUEST:
      return merge({}, state, {isLoading: true});
    case ActionTypes.TASKS_FAILURE:
      return merge({}, state, {isLoading: false});
    case ActionTypes.TASKS_SUCCESS:
      return merge({}, state, {isLoading: false, data: action.response.data});

    case ActionTypes.TASKS_DELETE_REQUEST:
      return merge({}, state, {isLoading: true});
    case ActionTypes.TASKS_DELETE_FAILURE:
      return merge({}, state, {isLoading: false});
    case ActionTypes.TASKS_DELETE_SUCCESS:
      return merge({}, {isLoading: false, data: state.data.filter(({id}) => id !== action.response.data)});

    case ActionTypes.TASKS_ADD_REQUEST:
      return merge({}, state, {isLoading: true});
    case ActionTypes.TASKS_ADD_FAILURE:
      return merge({}, state, {isLoading: false});
    case ActionTypes.TASKS_ADD_SUCCESS:
      return merge({}, state, {isLoading: false, data: state.data.concat(action.response.data)});

    case ActionTypes.TASKS_UPDATE_REQUEST:
      return merge({}, state, {isLoading: true});
    case ActionTypes.TASKS_UPDATE_FAILURE:
      return merge({}, state, {isLoading: false});
    case ActionTypes.TASKS_UPDATE_SUCCESS:
      return merge({}, state, {
        isLoading: false, data: state.data.map((task) => {
          if (task.id == action.response.data[0].id) {
            return action.response.data[0]
          }
        })
      });

    default:
      return state;
  }
};
