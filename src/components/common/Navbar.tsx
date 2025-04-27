import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import flexiLogo from '../../assets/flexicrm_icon.png';
import { ThemeToggle } from './ThemeToggle';
import * as clientService from '../../services/clientService';
import * as projectService from '../../services/projectService';
import { Client } from '../../types/client';
import { Project } from '../../types/project';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, logout, loading } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectDropdown, setProjectDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      clientService.getAllClients().then(setClients);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && clients.length > 0) {
      // Fetch all projects for all clients
      Promise.all(clients.map(client => projectService.getAllProjects(client.id)))
        .then(results => setProjects(results.flat()));
    }
  }, [isAuthenticated, clients]);

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
};

export default Navbar; 