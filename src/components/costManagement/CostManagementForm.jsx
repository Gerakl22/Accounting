import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { firestore } from "../../firebase";

export function CostManagementForm() {
  const [category, setCategory] = useState("");
  const [expense, setExpense] = useState("");
  const [sum, setSum] = useState("");
  const history = useHistory();

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
          await firestore
            .collection("cost-management")
            .add({ expense, category, sum });
          history.push("/cost-management");
        }}
      >
        Save
      </button>
      <button onClick={() => history.push("/cost-management")}>Cancel</button>
    </form>
  );
}
