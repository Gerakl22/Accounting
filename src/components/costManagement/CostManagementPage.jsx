import React from "react";
import { Switch, Redirect, Route, NavLink } from "react-router-dom";
import { useFirebaseCollection } from "../../useFirebase";

import { CostManagementForm } from "./CostManagementForm";
import { CostManagementList } from "./CostManagementList";

export function CostManagementPage() {
  const {
    data: costManagement,
    error,
    isLoading,
    add,
    update,
    remove,
  } = useFirebaseCollection("/cost-management");

  if (isLoading) {
    return "...Loading...";
  }

  if (error) {
    return `Error: ${error.message}`;
  }
  return (
    <>
      <ul>
        <li>
          <NavLink to="/cost-management"> Cost Management </NavLink>
        </li>
      </ul>
      <Switch>
        <Route exact path="/">
          <Redirect to="/cost-management" />;
        </Route>
        <Route exact path="/cost-management">
          <CostManagementList remove={remove} costManagement={costManagement} />
        </Route>
        <Route path="/cost-management/add">
          <CostManagementForm save={add} cost={""} />
        </Route>
        <Route path="/cost-management/:costId">
          {({
            match: {
              params: { costId },
            },
          }) => (
            <CostManagementForm
              cost={costManagement.find((c) => c.id === costId)}
              save={(fields) => update(costId, fields)}
            />
          )}
        </Route>
      </Switch>
    </>
  );
}
