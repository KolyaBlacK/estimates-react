import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import Root from './containers/Root';
import configureStore from './store/configureStore';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'react-bootstrap-toggle/dist/bootstrap2-toggle.css';
import './index.css';

const store = configureStore(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Root store={store} history={history}/>,
  document.getElementById('root')
);
