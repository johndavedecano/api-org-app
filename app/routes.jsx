import React from 'react';
import { Route, NotFoundRoute, Redirect, DefaultRoute } from 'react-router';
import App from './App';
import Todos from './views/Todos';
import TodosCreate from './views/TodosCreate';
import TodosUpdate from './views/TodosUpdate';
import TodosView from './views/TodosView';

export default (
    <Route component={App}>
		<Route name="main" component={Todos} path="/" />
		<Route name="main.create" component={TodosCreate} path="/create" />
		<Route name="main.update" component={TodosUpdate} path="/update/:todo_id" />
		<Route name="main.view" component={TodosView} path="/view/:todo_id" />
        <Redirect from="/index.html" to="/"/>
        <Redirect from="/*/" to="/*"/>
    </Route>
);
