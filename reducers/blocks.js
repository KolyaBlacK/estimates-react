import merge from 'lodash/merge'
import * as ActionTypes from '../actions'

export const blocks = (state = {isLoading: false, data: [], permissions: {}}, action) => {
  switch (action.type) {
    case ActionTypes.BLOCKS_REQUEST:
      return merge({}, state, {isLoading: true});
    case ActionTypes.BLOCKS_FAILURE:
      return merge({}, state, {isLoading: false});
    case ActionTypes.BLOCKS_SUCCESS:
      return merge({}, state, {isLoading: false, data: action.response.data, permissions: action.response.permissions});

    case ActionTypes.BLOCKS_DELETE_REQUEST:
      return merge({}, state, {isLoading: true});
    case ActionTypes.BLOCKS_DELETE_FAILURE:
      return merge({}, state, {isLoading: false});
    case ActionTypes.BLOCKS_DELETE_SUCCESS:
      return merge({}, {isLoading: false, data: state.data.filter(({id}) => id !== action.response.data)});

    case ActionTypes.BLOCKS_ADD_REQUEST:
      return merge({}, state, {isLoading: true});
    case ActionTypes.BLOCKS_ADD_FAILURE:
      return merge({}, state, {isLoading: false});
    case ActionTypes.BLOCKS_ADD_SUCCESS:
      return merge({}, state, {isLoading: false, data: state.data.concat(action.response.data)});

    case ActionTypes.BLOCKS_UPDATE_REQUEST:
      return merge({}, state, {isLoading: true});
    case ActionTypes.BLOCKS_UPDATE_FAILURE:
      return merge({}, state, {isLoading: false});
    case ActionTypes.BLOCKS_UPDATE_SUCCESS:
      return merge({}, state, {
        isLoading: false, data: state.data.map((block) => {
          if (block.id == action.response.data[0].id) {
            return action.response.data[0]
          }
        })
      });

    default:
      return state;
  }
};
