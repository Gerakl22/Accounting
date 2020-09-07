import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useCollection } from "../../useFirebase";

import { firestore, collectionToObject } from "../../firebase";

export function CostManagementList() {
  const [costManagement, setCostManagement] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    async function getData() {
      try {
        const response = await firestore.collection("cost-management").get();

        setCostManagement(collectionToObject(response));
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  if (isLoading) {
    return "...Loading...";
  }

  if (error) {
    return `Error: ${error.message}`;
  }

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
                  onClick={async () => {
                    await firestore.collection("/cost-management").doc(cost.id).update({cost});
                    history.push(`/cost-management/${cost.id}`);
                  }}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  onClick={async () => {
                    await firestore
                      .collection("cost-management")
                      .doc(cost.id)
                      .delete();
                    setCostManagement(
                      costManagement.filter((c) => c.id !== cost.id)
                    );
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
