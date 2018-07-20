import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import * as ActionTypes from '../actions'
import {blocks} from './blocks';
import {divisions} from './divisions';
import {productions} from './productions';
import {ratecards} from './ratecards';
import {experts} from './experts';
import {users} from './users';
import {tasks} from './tasks';
import {estimate} from './estimate';
import {estimates} from './estimates';
import {archive} from './archive';
import {draft} from './draft';

const errorMessage = (state = null, action) => {
  const {type, error} = action;

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return error
  }

  return state
};

export default combineReducers({
  blocks,
  divisions,
  productions,
  ratecards,
  experts,
  users,
  tasks,
  errorMessage,
  estimate,
  estimates,
  archive,
  draft,
  routing
});
