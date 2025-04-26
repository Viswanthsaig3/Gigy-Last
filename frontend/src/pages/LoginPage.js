import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion'; 
import { FaEnvelope, FaLock, FaArrowRight } from 'react-icons/fa';
import './AuthPages.css';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  
  const { login, userInfo, isLoading, error } = useContext(AuthContext);
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
    
    if (!email || !password) {
      setFormError('Please fill in all fields');
      return;
    }
    
    try {
      await login(email, password);
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
          className="login-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="login-header">
            <div className="login-logo">GiGy</div>
            <h1 className="login-title">Welcome back</h1>
            <p className="login-subtitle">Sign in to your account</p>
          </div>
          
          {(error || formError) && (
            <motion.div 
              className="error-message"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              {error || formError}
            </motion.div>
          )}
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              {/* Replace the input-with-icon div with new containers */}
              <div className="input-container">
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
                />
              </div>
            </div>

            <div className="form-group">
              <div className="label-row">
                <label htmlFor="password">Password</label>
                <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
              </div>
              {/* Replace the input-with-icon div with new containers */}
              <div className="input-container">
                <div className="icon-container">
                  <FaLock />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="login-submit-btn" 
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : (
                <>
                  Sign in
                  <FaArrowRight className="btn-icon" />
                </>
              )}
            </button>
          </form>
          
          <div className="auth-footer">
            Don't have an account? <Link to="/register">Sign up</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
