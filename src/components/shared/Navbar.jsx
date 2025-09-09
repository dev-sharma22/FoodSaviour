// src/components/shared/Navbar.jsx

import { Link, NavLink, useNavigate } from 'react-router-dom'; // Import useNavigate
import { Moon, Sun, HandHeart } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';

// NavItem component remains the same
const NavItem = ({ to, children }) => {
  const activeClass = "text-primary";
  const inactiveClass = "text-light-text dark:text-dark-text hover:text-primary transition-colors";
  
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => `${isActive ? activeClass : inactiveClass} font-semibold`}
    >
      {children}
    </NavLink>
  );
};

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate(); // Initialize navigate hook

  // --- THIS IS THE FIX ---
  // A new function to handle both logging out and redirecting
  const handleLogout = () => {
    logout(); // Clears the user session
    navigate('/'); // Immediately redirects to the homepage
  };
  
  return (
    <header className="fixed top-0 left-0 w-full bg-light-card/80 dark:bg-dark-bg/80 backdrop-blur-sm z-50 border-b border-light-border dark:border-dark-border/20">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2 text-primary">
          <HandHeart />
          Food Savior
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/how-it-works">How It Works</NavItem>
          <NavItem to="/about">About Us</NavItem>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-dark-border/20">
            {theme === 'dark' ? <Sun className="text-dark-text" /> : <Moon className="text-light-text" />}
          </button>
          
          {user ? (
             <div className="flex items-center gap-4">
               <NavLink to={`/dashboard/${user.role}`} className="font-semibold hover:text-primary transition-colors">
                 My Dashboard
               </NavLink>
               {/* The button now calls our new handleLogout function */}
               <Button onClick={handleLogout} variant="secondary">Logout</Button>
             </div>
          ) : (
            <div className="flex items-center gap-4">
              <NavLink to="/login" className="font-semibold hover:text-primary transition-colors">Login</NavLink>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;