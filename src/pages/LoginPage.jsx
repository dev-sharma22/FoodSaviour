// src/pages/LoginPage.jsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate here
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('admin@example.com'); // Pre-filled for easy testing
  const [password, setPassword] = useState('password123'); // Pre-filled for easy testing
  const { login } = useAuth();
  const navigate = useNavigate(); // Initialize navigate here

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Call the login function from the context
    const userData = await login(email, password);
    
    // Check if the login was successful
    if (userData) {
      // If successful, navigate from here based on the role
      if (userData.role === 'admin') navigate('/dashboard/admin');
      if (userData.role === 'donor') navigate('/dashboard/donor');
      if (userData.role === 'student') navigate('/dashboard/student');
      if (userData.role === 'ngo') navigate('/dashboard/ngo');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
      <Card className="w-full max-w-md mx-4">
          <h2 className="text-3xl font-bold text-center text-light-text dark:text-dark-text mb-2">Welcome Back!</h2>
          <p className="text-center text-light-subtle dark:text-gray-400 mb-6">Log in to continue your mission.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-light-subtle dark:text-gray-300 mb-1" htmlFor="email">Email</label>
              <input 
                type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded bg-light-input dark:bg-dark-bg border border-light-border dark:border-dark-border/50 focus:ring-2 focus:ring-primary outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-light-subtle dark:text-gray-300 mb-1" htmlFor="password">Password</label>
              <input 
                type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 rounded bg-light-input dark:bg-dark-bg border border-light-border dark:border-dark-border/50 focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <p className="text-center text-sm text-light-subtle dark:text-gray-400 mt-6">
            Don't have an account? <Link to="/register" className="text-primary hover:underline">Register here</Link>
          </p>
      </Card>
    </div>
  );
};

export default LoginPage;