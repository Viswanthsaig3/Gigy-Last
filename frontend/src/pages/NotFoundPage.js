import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404 - Page Not Found</h1>
        <p className="not-found-message">
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="home-button">
          Return to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
