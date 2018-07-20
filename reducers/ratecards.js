import merge from 'lodash/merge'
import * as ActionTypes from '../actions'

export const ratecards = (state = {isLoading: false, data: []}, action) => {
  switch (action.type) {
    case ActionTypes.RATE_CARDS_REQUEST:
      return merge({}, state, {isLoading: true});
    case ActionTypes.RATE_CARDS_FAILURE:
      return merge({}, state, {isLoading: false});
    case ActionTypes.RATE_CARDS_SUCCESS:
      return merge({}, state, {isLoading: false, data: action.response.data});

    case ActionTypes.RATE_CARDS_DELETE_REQUEST:
      return merge({}, state, {isLoading: true});
    case ActionTypes.RATE_CARDS_DELETE_FAILURE:
      return merge({}, state, {isLoading: false});
    case ActionTypes.RATE_CARDS_DELETE_SUCCESS:
      return merge({}, {isLoading: false, data: state.data.filter(({id}) => id !== action.response.data)});

    case ActionTypes.RATE_CARDS_ADD_REQUEST:
      return merge({}, state, {isLoading: true});
    case ActionTypes.RATE_CARDS_ADD_FAILURE:
      return merge({}, state, {isLoading: false});
    case ActionTypes.RATE_CARDS_ADD_SUCCESS:
      return merge({}, state, {isLoading: false, data: state.data.concat(action.response.data)});

    case ActionTypes.RATE_CARDS_UPDATE_REQUEST:
      return merge({}, state, {isLoading: true});
    case ActionTypes.RATE_CARDS_UPDATE_FAILURE:
      return merge({}, state, {isLoading: false});
    case ActionTypes.RATE_CARDS_UPDATE_SUCCESS:
      return merge({}, state, {
        isLoading: false, data: state.data.map((ratecards) => {
          if (ratecards.id == action.response.data[0].id) {
            return action.response.data[0]
          }
        })
      });

    default:
      return state;
  }
};
