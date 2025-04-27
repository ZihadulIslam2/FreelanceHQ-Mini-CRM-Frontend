import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import flexiLogo from '../../assets/flexicrm_icon.png';
import { ThemeToggle } from './ThemeToggle';
import './Navbar.css';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeNavbar = async () => {
      try {
        setLoading(true);
      } finally {
        setLoading(false);
      }
    };

    initializeNavbar();
  }, [isAuthenticated]);

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <img src={flexiLogo} alt="Logo" className="navbar__logo" />
        <span className="navbar__brand">FlexiCRM</span>
      </div>
      <div className="navbar__right">
        <ThemeToggle />
        {!loading && !isAuthenticated && (
          <>
            <Link to="/about" className="navbar__link">About</Link>
            <Link to="/signup" className="navbar__link">Signup</Link>
            <Link to="/login" className="navbar__link">Login</Link>
          </>
        )}
        {!loading && isAuthenticated && (
          <>
            <Link to="/dashboard" className="navbar__link">Dashboard</Link>
            <Link to="/clients" className="navbar__link">Clients</Link>
            <Link to="/projects" className="navbar__link">Projects</Link>
            <Link to="/reminders" className="navbar__link">Reminders</Link>
            <Link to="/about" className="navbar__link">About</Link>
            <button className="navbar__btn navbar__btn--outline" onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
} 