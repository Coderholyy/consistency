import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Tracking from "components/Tracking";
import MyHabits from "components/MyHabits";
import Register from "components/User/Register";
import Signin from "components/User/Signin";
import ErrorBoundary from "components/ErrorBoundary.js";
import Goals from "components/Goals";
import Header from "components/Header";

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Header />
        <Route path="/" component={MyHabits} exact={true} />
        <Route path="/tracking" component={Tracking} exact={true} />
        <Route path="/register" component={Register} exact={true} />
        <Route path="/signin" component={Signin} exact={true} />
        <Route path="/goals" component={Goals} exact={true} />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
