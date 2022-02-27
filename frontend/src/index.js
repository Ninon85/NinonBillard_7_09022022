import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/main.scss";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./components/reducers/index";
import { getUsers } from "./actions/users.actions";
//dev tools only for develop
//in the console
import { logger } from "redux-logger";
//plugin
import { composeWithDevTools } from "redux-devtools-extension";
const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk, logger))
);
store.dispatch(getUsers());
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
