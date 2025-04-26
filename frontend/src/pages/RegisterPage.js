import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion'; 
import { FaUser, FaEnvelope, FaLock, FaShieldAlt, FaArrowRight } from 'react-icons/fa';
import './AuthPages.css';
import './LoginPage.css'; // We'll reuse the login page styling

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');
  
  const { register, userInfo, isLoading, error } = useContext(AuthContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    // If user is already logged in, redirect to home
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    
    if (!name || !email || !password || !confirmPassword) {
      setFormError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setFormError('Password must be at least 6 characters long');
      return;
    }
    
    try {
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      // Error is handled in the context
    }
  };

  return (
    <div className="login-page">
      {/* Background shapes */}
      <div className="blue-shape shape-1"></div>
      <div className="blue-shape shape-2"></div>
      
      <div className="login-container">
        <motion.div 
          className="login-card compact-form" // Added compact-form class
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ padding: '2rem' }} // Reduce padding from default
        >
          <div className="login-header" style={{ marginBottom: '1rem' }}>
            <div className="login-logo">GiGy</div>
            <h1 className="login-title" style={{ marginBottom: '0.25rem', fontSize: '1.8rem' }}>Create account</h1>
            <p className="login-subtitle">Join our community today</p>
          </div>
          
          {(error || formError) && (
            <motion.div 
              className="error-message"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              style={{ marginBottom: '0.75rem', padding: '0.5rem 0.75rem' }}
            >
              {error || formError}
            </motion.div>
          )}
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group" style={{ marginBottom: '0.75rem' }}>
              <label htmlFor="name" style={{ marginBottom: '0.25rem', display: 'block' }}>Full Name</label>
              <div className="input-container" style={{ height: '42px' }}>
                <div className="icon-container">
                  <FaUser />
                </div>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                  style={{ padding: '0.5rem 1rem' }}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '0.75rem' }}>
              <label htmlFor="email" style={{ marginBottom: '0.25rem', display: 'block' }}>Email</label>
              <div className="input-container" style={{ height: '42px' }}>
                <div className="icon-container">
                  <FaEnvelope />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  style={{ padding: '0.5rem 1rem' }}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '0.75rem' }}>
              <label htmlFor="password" style={{ marginBottom: '0.25rem', display: 'block' }}>Password</label>
              <div className="input-container" style={{ height: '42px' }}>
                <div className="icon-container">
                  <FaLock />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  required
                  style={{ padding: '0.5rem 1rem' }}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '0.75rem' }}>
              <label htmlFor="confirmPassword" style={{ marginBottom: '0.25rem', display: 'block' }}>Confirm Password</label>
              <div className="input-container" style={{ height: '42px' }}>
                <div className="icon-container">
                  <FaShieldAlt />
                </div>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                  style={{ padding: '0.5rem 1rem' }}
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="login-submit-btn" 
              disabled={isLoading}
              style={{ marginTop: '0.75rem', height: '46px' }}
            >
              {isLoading ? 'Creating Account...' : (
                <>
                  Sign up
                  <FaArrowRight className="btn-icon" />
                </>
              )}
            </button>
          </form>
          
          <div className="auth-footer" style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
