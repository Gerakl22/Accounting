import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { CostManagementList } from "./components/costManagement/CostManagementList";
import { CostManagementForm } from "./components/costManagement/CostManagementForm";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/">
        <Redirect to="/cost-management" />;
      </Route>
      <Route exact path="/cost-management">
        <CostManagementList />
      </Route>
      <Route path="/cost-management/add">
        <CostManagementForm />
      </Route>
    </BrowserRouter>
  );
}

export default App;
