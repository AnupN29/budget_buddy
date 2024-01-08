import React, { useState, useEffect } from "react";

import { BrowserRouter as _, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Login from "./components/Login";
import RegistrationForm from "./components/RegistrationForm";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import TransactionsHistory from "./components/TransactionsHistory";
import AddTransaction from "./components/AddTransaction";
import { checkLoginStatus } from "./services/auth";
import Footer from "./components/Footer";

const App: React.FC = () => {
  const navigate = useNavigate();

  const handleRegistrationSuccess = () => {
    // Handle success, e.g., navigate to a different route
    console.log("Registration successful");
    navigate("/");
  };

  const handleRegistrationError = (error: string) => {
    // Handle error, e.g., display an error message
    console.error("Registration failed:", error);
  };

  const [isLoggedIn, setLoggedIn] = useState<boolean>(checkLoginStatus());
  useEffect(() => {}, []);

  const handleLogout = () => {
    // Clear the access token from localStorage or perform any other necessary logout actions
    localStorage.removeItem("accessToken");
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? <Home /> : <Login onLogin={() => setLoggedIn(true)} />
          }
        />
        {!isLoggedIn && (
          <Route
            path="/register"
            element={
              <RegistrationForm
                onSuccess={handleRegistrationSuccess}
                onError={handleRegistrationError}
              />
            }
          />
        )}
        {isLoggedIn && (
          <>
            <Route path="/transactions" element={<TransactionsHistory />} />
            <Route path="/add-transaction" element={<AddTransaction />} />
          </>
        )}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
