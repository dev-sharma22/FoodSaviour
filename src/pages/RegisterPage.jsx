import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const RegisterPage = () => {
  // State to hold all form data in one object
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'donor', // Default role
  });

  // A single handler to update the state for any form field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handles the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend API
    console.log('Registering user:', formData);
    alert(`Thank you for registering, ${formData.fullName}! You can now log in.`);
    // Here you would typically redirect the user to the login page
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
      <Card className="w-full max-w-md mx-4">
        <h2 className="text-3xl font-bold text-center text-light-text dark:text-dark-text mb-2">Join Food Savior</h2>
        <p className="text-center text-light-subtle dark:text-gray-400 mb-6">Create an account to get started.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-light-subtle dark:text-gray-300 mb-1" htmlFor="fullName">Full Name</label>
            <input 
              type="text" 
              id="fullName" 
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-light-input dark:bg-dark-bg border border-light-border dark:border-dark-border/50 focus:ring-2 focus:ring-primary outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-light-subtle dark:text-gray-300 mb-1" htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-light-input dark:bg-dark-bg border border-light-border dark:border-dark-border/50 focus:ring-2 focus:ring-primary outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-light-subtle dark:text-gray-300 mb-1" htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
              className="w-full p-2 rounded bg-light-input dark:bg-dark-bg border border-light-border dark:border-dark-border/50 focus:ring-2 focus:ring-primary outline-none" 
            />
          </div>
          <div>
              <label className="block text-sm font-medium text-light-subtle dark:text-gray-300 mb-1" htmlFor="role">I am a...</label>
              <select 
                id="role" 
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2 rounded bg-light-input dark:bg-dark-bg border border-light-border dark:border-dark-border/50 focus:ring-2 focus:ring-primary outline-none"
              >
                  <option value="donor">Donor</option>
                  <option value="student">Student (Volunteer)</option>
                  <option value="ngo">NGO Partner</option>
              </select>
          </div>
          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </form>

        <p className="text-center text-sm text-light-subtle dark:text-gray-400 mt-6">
          Already have an account? <Link to="/login" className="text-primary hover:underline">Login here</Link>
        </p>
      </Card>
    </div>
  );
};

export default RegisterPage;