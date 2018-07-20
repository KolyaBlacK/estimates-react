import merge from 'lodash/merge'
import * as ActionTypes from '../actions'

export const experts = (state = {isLoading: false, data: []}, action) => {
  switch (action.type) {
    case ActionTypes.EXPERTS_REQUEST:
      return merge({}, state, {isLoading: true});
    case ActionTypes.EXPERTS_FAILURE:
      return merge({}, state, {isLoading: false});
    case ActionTypes.EXPERTS_SUCCESS:
      return merge({}, state, {isLoading: false, data: action.response.data});

    case ActionTypes.EXPERTS_DELETE_REQUEST:
      return merge({}, state, {isLoading: true});
    case ActionTypes.EXPERTS_DELETE_FAILURE:
      return merge({}, state, {isLoading: false});
    case ActionTypes.EXPERTS_DELETE_SUCCESS:
      return merge({}, {isLoading: false, data: state.data.filter(({id}) => id !== action.response.data)});

    case ActionTypes.EXPERTS_ADD_REQUEST:
      return merge({}, state, {isLoading: true});
    case ActionTypes.EXPERTS_ADD_FAILURE:
      return merge({}, state, {isLoading: false});
    case ActionTypes.EXPERTS_ADD_SUCCESS:
      return merge({}, state, {isLoading: false, data: state.data.concat(action.response.data)});

    case ActionTypes.EXPERTS_UPDATE_REQUEST:
      return merge({}, state, {isLoading: true});
    case ActionTypes.EXPERTS_UPDATE_FAILURE:
      return merge({}, state, {isLoading: false});
    case ActionTypes.EXPERTS_UPDATE_SUCCESS:
      return merge({}, state, {
        isLoading: false, data: state.data.map((expert) => {
          if (expert.id == action.response.data[0].id) {
            return action.response.data[0]
          }
        })
      });

    default:
      return state;
  }
};
