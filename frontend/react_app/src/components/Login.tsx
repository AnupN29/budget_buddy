import React, { useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom"; // Import Link and useHistory

interface LoginForm {
  email: string;
  password: string;
}

interface LoginProps {
  onLogin: () => void; // Declare the onLogin prop in the interface
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [loginStatus, setLoginStatus] = useState<"form" | "success" | "error">(
    "form"
  );
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      // Make a POST request to the FastAPI login endpoint
      const response = await api.post("user/login", formData);

      // Handle the response, e.g., store user token in state or context
      console.log("Login successful", response.data);
      setLoginStatus("success");

      // Store the access token in localStorage
      localStorage.setItem("accessToken", response.data.access_token);

      // Call the onLogin callback
      onLogin();
    } catch (error: any) {
      // Handle login error, e.g., display an error message
      console.error("Login failed", error.response.data);
      setErrorMessage(
        "Invalid Credentials. Please check your email and password."
      );
      setLoginStatus("error");
    }
  };

  return (
    <div className="container mt-5">
      <div className="col-md-6 offset-md-3 border border-secondary-subtle p-5">
        <h2 className="mb-3">Login</h2>
        <form>
          {/* Email input */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          {/* Password input */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>

          {/* Error message */}
          {loginStatus === "error" && (
            <p className="alert alert-danger">{errorMessage}</p>
          )}

          {/* Login button */}
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>

        {/* Registration link */}
        <p className="mt-3">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="link-offset-2 link-underline link-underline-opacity-0"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
