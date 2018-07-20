import {CALL_API} from '../middleware/api';

export const TASKS_REQUEST = 'TASKS_REQUEST';
export const TASKS_SUCCESS = 'TASKS_SUCCESS';
export const TASKS_FAILURE = 'TASKS_FAILURE';

export const TASKS_DELETE_REQUEST = 'TASKS_DELETE_REQUEST';
export const TASKS_DELETE_SUCCESS = 'TASKS_DELETE_SUCCESS';
export const TASKS_DELETE_FAILURE = 'TASKS_DELETE_FAILURE';

export const TASKS_ADD_REQUEST = 'TASKS_ADD_REQUEST';
export const TASKS_ADD_SUCCESS = 'TASKS_ADD_SUCCESS';
export const TASKS_ADD_FAILURE = 'TASKS_ADD_FAILURE';

export const TASKS_UPDATE_REQUEST = 'TASKS_UPDATE_REQUEST';
export const TASKS_UPDATE_SUCCESS = 'TASKS_UPDATE_SUCCESS';
export const TASKS_UPDATE_FAILURE = 'TASKS_UPDATE_FAILURE';

const fetchTasks = () => ({
  [CALL_API]: {
    types: [TASKS_REQUEST, TASKS_SUCCESS, TASKS_FAILURE],
    endpoint: 'tasks',
    method: 'GET'
  }
});
export const loadTasks = () => (dispatch) => {
  return dispatch(fetchTasks());
};


const fetchDeleteTasks = (taskId) => ({
  [CALL_API]: {
    types: [TASKS_DELETE_REQUEST, TASKS_DELETE_SUCCESS, TASKS_DELETE_FAILURE],
    endpoint: `tasks/${taskId}`,
    method: 'DELETE'
  }
});
export const deleteTasks = (taskId) => (dispatch) => {
  return dispatch(fetchDeleteTasks(taskId));
};


const fetchAddTasks = (data) => ({
  [CALL_API]: {
    types: [TASKS_ADD_REQUEST, TASKS_ADD_SUCCESS, TASKS_ADD_FAILURE],
    endpoint: `tasks`,
    method: 'POST',
    body: data
  }
});
export const addTasks = (data) => (dispatch) => {
  return dispatch(fetchAddTasks(data));
};


const fetchUpdateTasks = (taskId, data) => ({
  [CALL_API]: {
    types: [TASKS_UPDATE_REQUEST, TASKS_UPDATE_SUCCESS, TASKS_UPDATE_FAILURE],
    endpoint: `tasks/${taskId}`,
    method: 'PUT',
    body: data
  }
});
export const updateTasks = (taskId, data) => (dispatch) => {
  return dispatch(fetchUpdateTasks(taskId, data));
};
