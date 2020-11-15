import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import "./App.css";
import AddStock from "./components/AddStock";
import FilterStocks from "./components/FilterStocks";
import FindStock from "./components/FindStock";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <h1 className="welcome">Welcome To Stock Check</h1>
        </Route>
        <Route path="/find">
          <FindStock />
        </Route>
        <Route path="/filter">
          <FilterStocks />
        </Route>
        <Route path="/add">
          <AddStock />
        </Route>
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
