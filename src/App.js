import React from "react";
import { BrowserRouter } from "react-router-dom";

import { CostManagementPage } from "./components/costManagement/CostManagementPage";

function App() {
  return (
    <BrowserRouter>
      <CostManagementPage />
    </BrowserRouter>
  );
}

export default App;
