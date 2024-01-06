// App.tsx

import React from 'react';
import RegistrationForm from './components/RegistrationForm';

const App: React.FC = () => {
  const handleRegistrationSuccess = () => {
    console.log('User registered successfully!');
    // You can redirect to a login page or perform other actions on success
  };

  const handleRegistrationError = (error: string) => {
    console.error(`Registration failed: ${error}`);
    // Handle and display the error message to the user
  };

  return (
    <div>
      <h1>Your React App</h1>
      <RegistrationForm onSuccess={handleRegistrationSuccess} onError={handleRegistrationError} />
    </div>
  );
};

export default App;
