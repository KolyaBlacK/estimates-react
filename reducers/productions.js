import merge from 'lodash/merge'
import * as ActionTypes from '../actions'

export const productions = (state = {isLoading: false, data: [], permissions: {}}, action) => {
  switch (action.type) {
    case ActionTypes.PRODUCTIONS_REQUEST:
      return merge({}, state, {isLoading: true});
    case ActionTypes.PRODUCTIONS_FAILURE:
      return merge({}, state, {isLoading: false});
    case ActionTypes.PRODUCTIONS_SUCCESS:
      return merge({}, state, {isLoading: false, data: action.response.data, permissions: action.response.permissions});

    case ActionTypes.PRODUCTIONS_AVAIL_REQUEST:
      return merge({}, state, {isLoading: true});
    case ActionTypes.PRODUCTIONS_AVAIL_FAILURE:
      return merge({}, state, {isLoading: false});
    case ActionTypes.PRODUCTIONS_AVAIL_SUCCESS:
      return merge({}, state, {isLoading: false, data: action.response.data});

    case ActionTypes.PRODUCTIONS_DELETE_REQUEST:
      return merge({}, state, {isLoading: true});
    case ActionTypes.PRODUCTIONS_DELETE_FAILURE:
      return merge({}, state, {isLoading: false});
    case ActionTypes.PRODUCTIONS_DELETE_SUCCESS:
      return merge({}, {isLoading: false, data: state.data.filter(({id}) => id !== action.response.data)});

    case ActionTypes.PRODUCTIONS_ADD_REQUEST:
      return merge({}, state, {isLoading: true});
    case ActionTypes.PRODUCTIONS_ADD_FAILURE:
      return merge({}, state, {isLoading: false});
    case ActionTypes.PRODUCTIONS_ADD_SUCCESS:
      return merge({}, state, {isLoading: false, data: state.data.concat(action.response.data)});

    case ActionTypes.PRODUCTIONS_UPDATE_REQUEST:
      return merge({}, state, {isLoading: true});
    case ActionTypes.PRODUCTIONS_UPDATE_FAILURE:
      return merge({}, state, {isLoading: false});
    case ActionTypes.PRODUCTIONS_UPDATE_SUCCESS:
      return merge({}, state, {
        isLoading: false, data: state.data.map((production) => {
          if (production.id == action.response.data[0].id) {
            return action.response.data[0]
          }
        })
      });

    default:
      return state;
  }
};
