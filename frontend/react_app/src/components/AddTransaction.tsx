import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const AddTransaction: React.FC = () => {
  const [formData, setFormData] = useState({
    // date: "",
    amount: "",
    transaction_type: "",
    category: "",
    description: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddTransaction = async () => {
    try {
      // Make a POST request to the backend endpoint for adding a new transaction
      const authToken = localStorage.getItem("accessToken");
      const response = await api.post("/transactions/", formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      // Handle the response if needed
      console.log("Transaction added successfully", response.data);

      // You may redirect to the transactions page or handle the UI accordingly
    } catch (error) {
      // Handle error if needed
      console.error("Error adding transaction", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add New Transaction</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Amount:
          </label>
          <input
            type="number"
            className="form-control"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="transaction_type" className="form-label">
            Transaction Type:
          </label>
          <select
            className="form-control"
            id="transaction_type"
            name="transaction_type"
            value={formData.transaction_type}
            onChange={(
              e: React.ChangeEvent<
                HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
              >
            ) => handleInputChange(e)}
          >
            <option value=""> -Choose an Option- </option>
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
            className="form-control"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              handleInputChange(e)
            }
          ></textarea>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAddTransaction}
        >
          Add Transaction
        </button>
      </form>
      <p className="mt-3">
        <Link to="/transactions">Go back to Transactions</Link>
      </p>
    </div>
  );
};

export default AddTransaction;
