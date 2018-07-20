import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './containers/App';
import EstimateCreate from './containers/EstimateCreate';
import EstimateEdit from './containers/EstimateEdit';
import EstimateDraftEdit from './containers/EstimateDraftEdit';
import ListEstimates from './components/ListEstimates';
import Settings from "./containers/Settings";
import Archive from "./containers/Archive";
import Draft from "./containers/Draft";
import ReCard from "./components/ReCard";
import TabsCustom from "./components/TabsCustom";
import NotFoundPage from "./NotFoundPage";

export default <Route path="/" component={App}>
  <IndexRoute component={ListEstimates}/>
  <Route path="estimate/create" component={EstimateCreate}/>
  <Route path="estimate/edit/:id" component={EstimateEdit}/>
  <Route path="estimate/draft/edit/:id" component={EstimateDraftEdit}/>
  <Route path="settings" component={Settings}/>
  <Route path="archive" component={Archive}/>
  <Route path="draft" component={Draft}/>
  <Route path="re-card" component={ReCard}/>
  <Route path="tabs" component={TabsCustom}/>
  <Route component={NotFoundPage}/>
</Route>
