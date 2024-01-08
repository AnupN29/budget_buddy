import React, { useState, useEffect } from "react";
import api from "../services/api";

interface Transaction {
  transaction_id: number;
  date: string;
  amount: number;
  transaction_type: string;
  category: string;
  description: string;
}

const TransactionsHistory: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editingTransactionId, setEditingTransactionId] = useState<
    number | null
  >(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const authToken = localStorage.getItem("accessToken");
        const response = await api.get("/transactions/", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setTransactions(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleDelete = async (transactionId: number) => {
    try {
      const authToken = localStorage.getItem("accessToken");
      await api.delete(`/transactions/${transactionId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      // Update the transactions state after deletion
      setTransactions((prevTransactions) =>
        prevTransactions.filter(
          (transaction) => transaction.transaction_id !== transactionId
        )
      );
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const handleUpdate = async (transactionId: number) => {
    // Implement the update logic here, e.g., show an edit form
    setEditingTransactionId(transactionId);
  };

  const handleEditSubmit = async (editedTransaction: Transaction) => {
    // Implement the submission of the edited transaction to the backend
    try {
      const authToken = localStorage.getItem("accessToken");
      await api.put(
        `/transactions/${editingTransactionId}`,
        editedTransaction,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      // Clear the editing state and fetch updated transactions
      setEditingTransactionId(null);
      const response = await api.get("/transactions/", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setTransactions(response.data);
    } catch (error) {
      console.error("Error updating transaction:", error);
    }
  };

  if (loading) {
    return <p>Loading transactions...</p>;
  }

  return (
    <div className="container mt-5">
      <h2>Transaction History</h2>
      {loading ? (
        <p>Loading transactions...</p>
      ) : transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Category</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.transaction_id}>
                <td>{transaction.date}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.transaction_type}</td>
                <td>{transaction.category}</td>
                <td>{transaction.description}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleUpdate(transaction.transaction_id)}
                  >
                    Update
                  </button>{" "}
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(transaction.transaction_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {editingTransactionId !== null && (
        <EditTransactionForm
          transaction={
            transactions.find((t) => t.transaction_id === editingTransactionId)!
          }
          onSubmit={handleEditSubmit}
        />
      )}
    </div>
  );
};

interface EditTransactionFormProps {
  transaction: Transaction;
  onSubmit: (editedTransaction: Transaction) => void;
}

const EditTransactionForm: React.FC<EditTransactionFormProps> = ({
  transaction,
  onSubmit,
}) => {
  const [editedTransaction, setEditedTransaction] =
    useState<Transaction>(transaction);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditedTransaction((prevTransaction) => ({
      ...prevTransaction,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(editedTransaction);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Edit Transaction</h3>
      <div className="mb-3">
        <label htmlFor="date" className="form-label">
          Date:
        </label>
        <input
          type="text"
          id="date"
          name="date"
          value={editedTransaction.date}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount:
        </label>
        <input
          type="text"
          id="amount"
          name="amount"
          value={editedTransaction.amount}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="transaction_type" className="form-label">
          Transaction Type:
        </label>
        <select
          id="transaction_type"
          name="transaction_type"
          value={editedTransaction.transaction_type}
          onChange={handleInputChange}
          className="form-control"
        >
          <option value="Expenses">Expenses</option>
          <option value="Income">Income</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category:
        </label>
        <input
          type="text"
          id="category"
          name="category"
          value={editedTransaction.category}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description:
        </label>
        <input
          type="text"
          id="description"
          name="description"
          value={editedTransaction.description}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Save Changes
      </button>
    </form>
  );
};

export default TransactionsHistory;
