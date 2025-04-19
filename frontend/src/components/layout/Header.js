import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineUser, HiOutlineLogout, HiOutlineBriefcase, HiOutlineClipboardList, 
         HiOutlineDocumentText, HiOutlineChatAlt, HiOutlineMenu, HiChevronDown } from 'react-icons/hi';
import { AuthContext } from '../../context/AuthContext';
import './Header.css';

const Header = () => {
  const { userInfo, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close profile menu on navigation
  useEffect(() => {
    setShowProfileMenu(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo-link">
          <span className="logo-text">GiGy</span>
        </Link>

        {/* Mobile menu button */}
        <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <HiOutlineMenu />
        </button>

        {/* Navigation Links */}
        <nav className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/gigs" className="nav-link">Browse Gigs</Link>
            </li>
            {userInfo && (
              <li className="nav-item">
                <Link to="/gigs/create" className="nav-link">Post Gig</Link>
              </li>
            )}
          </ul>
        </nav>

        {/* Auth Section */}
        <div className="auth-section">
          {userInfo ? (
            <div className="user-menu">
              <button 
                className="user-dropdown-btn"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <span>{userInfo.name}</span>
                <HiChevronDown className={`dropdown-icon ${showProfileMenu ? 'open' : ''}`} />
              </button>

              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="dropdown-menu"
                  >
                    <Link to="/profile" className="dropdown-item">
                      <HiOutlineUser className="icon" /> Profile
                    </Link>
                    <Link to="/my-gigs" className="dropdown-item">
                      <HiOutlineBriefcase className="icon" /> My Gigs
                    </Link>
                    <Link to="/my-assignments" className="dropdown-item">
                      <HiOutlineClipboardList className="icon" /> My Assignments
                    </Link>
                    <Link to="/my-applications" className="dropdown-item">
                      <HiOutlineDocumentText className="icon" /> My Applications
                    </Link>
                    
                    <div className="dropdown-divider"></div>
                    
                    <Link to="/messages" className="dropdown-item">
                      <HiOutlineChatAlt className="icon" /> Messages
                    </Link>
                    
                    <button onClick={handleLogout} className="dropdown-item logout-item">
                      <HiOutlineLogout className="icon" /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-outline">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
