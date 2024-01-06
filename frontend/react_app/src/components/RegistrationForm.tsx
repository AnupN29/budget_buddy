// RegistrationForm.tsx

import React, { useState } from 'react';
import api from '../services/api';

interface RegistrationFormProps {
  onSuccess: () => void;
  onError: (error: string) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSuccess, onError }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState('');

  const handleRegister = async () => {
    try {
      // Check if password matches confirm password
      if (password !== confirmPassword) {
        setPasswordMatchError('Passwords do not match');
        return;
      }

      // Clear any previous password match error
      setPasswordMatchError('');

      // Make a POST request to your FastAPI backend for user registration
      const response = await api.post('user/register', {
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
        onError('Registration failed. Please try again.');
      }
    } catch (error) {
      // Handle network or other errors
      onError('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <h2>User Registration</h2>
      <label>Name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <br />
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <label>Confirm Password:</label>
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {passwordMatchError && <div style={{ color: 'red' }}>{passwordMatchError}</div>}
      <br />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default RegistrationForm;
