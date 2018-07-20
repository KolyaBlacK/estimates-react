import {CALL_API} from '../middleware/api';

export const BLOCKS_REQUEST = 'BLOCKS_REQUEST';
export const BLOCKS_SUCCESS = 'BLOCKS_SUCCESS';
export const BLOCKS_FAILURE = 'BLOCKS_FAILURE';

export const BLOCKS_DELETE_REQUEST = 'BLOCKS_DELETE_REQUEST';
export const BLOCKS_DELETE_SUCCESS = 'BLOCKS_DELETE_SUCCESS';
export const BLOCKS_DELETE_FAILURE = 'BLOCKS_DELETE_FAILURE';

export const BLOCKS_ADD_REQUEST = 'BLOCKS_ADD_REQUEST';
export const BLOCKS_ADD_SUCCESS = 'BLOCKS_ADD_SUCCESS';
export const BLOCKS_ADD_FAILURE = 'BLOCKS_ADD_FAILURE';

export const BLOCKS_UPDATE_REQUEST = 'BLOCKS_UPDATE_REQUEST';
export const BLOCKS_UPDATE_SUCCESS = 'BLOCKS_UPDATE_SUCCESS';
export const BLOCKS_UPDATE_FAILURE = 'BLOCKS_UPDATE_FAILURE';

const fetchBlocks = () => ({
  [CALL_API]: {
    types: [BLOCKS_REQUEST, BLOCKS_SUCCESS, BLOCKS_FAILURE],
    endpoint: `blocks`,
    method: 'GET'
  }
});
export const loadBlocks = () => (dispatch) => {
  return dispatch(fetchBlocks());
};


const fetchDeleteBlocks = (blockId) => ({
  [CALL_API]: {
    types: [BLOCKS_DELETE_REQUEST, BLOCKS_DELETE_SUCCESS, BLOCKS_DELETE_FAILURE],
    endpoint: `blocks/${blockId}`,
    method: 'DELETE'
  }
});
export const deleteBlocks = (blockId) => (dispatch) => {
  return dispatch(fetchDeleteBlocks(blockId));
};


const fetchAddBlocks = (data) => ({
  [CALL_API]: {
    types: [BLOCKS_ADD_REQUEST, BLOCKS_ADD_SUCCESS, BLOCKS_ADD_FAILURE],
    endpoint: `blocks`,
    method: 'POST',
    body: data
  }
});
export const addBlocks = (data) => (dispatch) => {
  return dispatch(fetchAddBlocks(data));
};


const fetchUpdateBlocks = (blockId, data) => ({
  [CALL_API]: {
    types: [BLOCKS_UPDATE_REQUEST, BLOCKS_UPDATE_SUCCESS, BLOCKS_UPDATE_FAILURE],
    endpoint: `blocks/${blockId}`,
    method: 'PUT',
    body: data
  }
});
export const updateBlocks = (blockId, data) => (dispatch) => {
  return dispatch(fetchUpdateBlocks(blockId, data));
};
