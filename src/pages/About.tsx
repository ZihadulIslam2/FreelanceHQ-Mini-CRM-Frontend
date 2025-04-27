import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <div className="about">
      {/* Hero Section */}
      <div className="about__hero">
        <div className="about__container">
          <div className="about__hero-content">
            <h1 className="about__title">About FreelanceHQ CRM</h1>
            <p className="about__subtitle">
              Empowering freelancers with powerful tools to manage their business efficiently.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="about__features">
        <div className="about__container">
          <div>
            <h2 className="about__section-title">Features</h2>
            <p className="about__section-subtitle">
              Everything you need to manage your freelance business
            </p>
          </div>

          <div className="about__features-grid">
            {/* Feature 1 */}
            <div className="about__feature">
              <div className="about__feature-icon">
                <svg className="about__feature-icon-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <h3 className="about__feature-title">Client Management</h3>
                <p className="about__feature-description">
                  Keep track of all your clients, their projects, and communication history in one place.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="about__feature">
              <div className="about__feature-icon">
                <svg className="about__feature-icon-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h3 className="about__feature-title">Project Tracking</h3>
                <p className="about__feature-description">
                  Monitor project progress, deadlines, and deliverables with our intuitive project management tools.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="about__feature">
              <div className="about__feature-icon">
                <svg className="about__feature-icon-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="about__feature-title">Financial Management</h3>
                <p className="about__feature-description">
                  Track invoices, payments, and expenses to keep your finances organized and transparent.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="about__feature">
              <div className="about__feature-icon">
                <svg className="about__feature-icon-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="about__feature-title">Time Tracking</h3>
                <p className="about__feature-description">
                  Monitor your time spent on projects and tasks to ensure accurate billing and productivity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="about__team">
        <div className="about__container">
          <div>
            <h2 className="about__section-title">Our Team</h2>
            <p className="about__section-subtitle">
              Meet the people behind FreelanceHQ CRM
            </p>
          </div>

          <div className="about__team-grid">
            {/* Team Member 1 */}
            <div className="about__team-member">
              <div className="about__team-avatar">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Team member"
                />
              </div>
              <h3 className="about__team-name">Sarah Johnson</h3>
              <p className="about__team-role">Founder & CEO</p>
            </div>

            {/* Team Member 2 */}
            <div className="about__team-member">
              <div className="about__team-avatar">
                <img
                  src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Team member"
                />
              </div>
              <h3 className="about__team-name">Michael Chen</h3>
              <p className="about__team-role">Lead Developer</p>
            </div>

            {/* Team Member 3 */}
            <div className="about__team-member">
              <div className="about__team-avatar">
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Team member"
                />
              </div>
              <h3 className="about__team-name">Emily Rodriguez</h3>
              <p className="about__team-role">Product Manager</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 