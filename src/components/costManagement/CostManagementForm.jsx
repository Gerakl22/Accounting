import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { firestore, docToObject } from "../../firebase";

export function CostManagementForm({ costId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [expense, setExpense] = useState("");
  const [sum, setSum] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (typeof costId !== "undefined") {
      firestore
        .collection("/cost-management")
        .doc(costId)
        .get()
        .then(docToObject)
        .then((cost) => {
          setCategory(cost.category);
          setExpense(cost.expense);
          setSum(cost.sum);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return "...Loading..";
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label>
        Category:
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </label>
      <label>
        Expense:
        <input
          type="text"
          value={expense}
          onChange={(e) => setExpense(e.target.value)}
        />
      </label>
      <label>
        Sum:
        <input
          type="number"
          value={sum}
          onChange={(e) => setSum(e.target.value)}
        />
      </label>

      <button
        onClick={async () => {
          if (typeof costId === undefined) {
            await firestore
              .collection("cost-management")
              .add({ expense, category, sum });
          } else {
            await firestore
              .collection("cost-management")
              .doc(costId)
              .update({ expense, category, sum });
          }

          history.push("/cost-management");
        }}
      >
        Save
      </button>
      <button onClick={() => history.push("/cost-management")}>Cancel</button>
    </form>
  );
}
