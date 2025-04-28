import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import flexiLogo from '../../assets/flexicrm_icon.png';
import { ThemeToggle } from './ThemeToggle';
import './Navbar.css';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__left">
          <img src={flexiLogo} alt="Logo" className="navbar__logo" />
          <span className="navbar__brand">FlexiCRM</span>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="navbar__mobile-menu-btn"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span className={`navbar__hamburger ${isMobileMenuOpen ? 'open' : ''}`}></span>
        </button>

        {/* Desktop Menu */}
        <div className={`navbar__right ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <ThemeToggle />
          {!loading && !isAuthenticated && (
            <>
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
      </div>
    </nav>
  );
} 