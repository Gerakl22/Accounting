import React from "react";
import { useHistory } from "react-router-dom";

export function CostManagementList({ costManagement, remove }) {
  const history = useHistory();

  return (
    <>
      <button onClick={() => history.push("/cost-management/add")}>
        Add cost management
      </button>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Expense</th>
            <th>Sum</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {costManagement.map((cost) => (
            <tr key={cost.id}>
              <td>{cost.category}</td>
              <td>{cost.expense}</td>
              <td>{cost.sum}</td>
              <td>
                <button
                  onClick={() => {
                    history.push(`/cost-management/${cost.id}`);
                  }}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  onClick={async () => {
                    remove(cost.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
