// RegistrationForm.tsx

import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link and useHistory

import api from "../services/api";

interface RegistrationFormProps {
  onSuccess: () => void;
  onError: (error: string) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onSuccess,
  onError,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");

  const handleRegister = async () => {
    try {
      // Check if password matches confirm password
      if (password !== confirmPassword) {
        setPasswordMatchError("Passwords do not match");
        return;
      }

      // Clear any previous password match error
      setPasswordMatchError("");

      // Make a POST request to your FastAPI backend for user registration
      const response = await api.post("user/register", {
        name,
        email,
        password,
      });

      // Check the response from the server
      if (response.status === 201) {
        // Registration successful
        onSuccess();
      } else {
        // Handle other response statuses if needed
        onError("Registration failed. Please try again.");
      }
    } catch (error) {
      // Handle network or other errors
      onError("An error occurred. Please try again later.");
      setPasswordMatchError(
        "User with the email already exists. Please try login"
      );
      return;
    }
  };

  return (
    <div className="container mt-5">
      <div className="col-md-6 offset-md-3 border border-secondary-subtle p-5">
        <h2>User Registration</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {passwordMatchError && (
              <div className="text-danger">{passwordMatchError}</div>
            )}
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleRegister}
          >
            Register
          </button>
        </form>
        <p className="mt-3">
          Already have an account?{" "}
          <Link
            to="/"
            className="link-offset-2 link-underline link-underline-opacity-0"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;
