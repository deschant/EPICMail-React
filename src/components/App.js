/* eslint-disable import/no-named-as-default */
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./Login";
import Signup from "./Signup";
import Inbox from "./Inbox";

import "react-toastify/dist/ReactToastify.css";
import "../assets/styles/main.scss";
import Compose from "./Compose";

const App = () => (
  <BrowserRouter>
    <ToastContainer />
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/:email/inbox" component={Inbox} />
      <Route exact path="/:email/compose" component={Compose} />
    </Switch>
  </BrowserRouter>
);

export default App;
