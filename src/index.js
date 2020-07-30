import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import reducers from "./reducers";
import App from "./components/App";
import Dashboard from "./components/Dashboard";
import UserDetails from "./components/UserDetails";
import Signout from "./components/auth/Signout";
import Signin from "./components/auth/Signin";
import "./style.css";
const store = createStore(
  reducers,
  {
    auth: { authenticated: localStorage.getItem("token") },
  },
  applyMiddleware(reduxThunk)
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Route path="/" exact component={Signin} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/signout" component={Signout} />
        <Route path="/signin" component={Signin} />
        <Route path="/user/:userId" exact component={UserDetails} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);
