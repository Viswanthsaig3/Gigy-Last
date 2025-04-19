import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiOutlineUser, 
  HiOutlineLogout, 
  HiOutlineBriefcase, 
  HiOutlineClipboardList, 
  HiOutlineDocumentText, 
  HiOutlineChatAlt, 
  HiOutlineMenuAlt3, 
  HiOutlineX,
  HiChevronDown 
} from 'react-icons/hi';
import { AuthContext } from '../../context/AuthContext';
import './Header.css';

const Header = () => {
  const { userInfo, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const profileButtonRef = useRef(null);

  // Handle scroll effect with throttle to improve performance
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 20);
      ticking = false;
    };

    const onScroll = () => {
      lastScrollY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScrollState();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close profile menu when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current && 
        !profileMenuRef.current.contains(event.target) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on navigation
  useEffect(() => {
    setShowProfileMenu(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="header-logo">
          <span className="logo-gradient">GiGy</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="header-nav desktop-nav">
          <Link to="/gigs" className="nav-item">Browse Gigs</Link>
          {userInfo && (
            <Link to="/gigs/create" className="nav-item">Post a Gig</Link>
          )}
        </nav>

        {/* Auth Section */}
        <div className="header-auth">
          {userInfo ? (
            <div className="user-profile-menu">
              <button 
                ref={profileButtonRef}
                className="profile-button"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                aria-expanded={showProfileMenu}
              >
                {userInfo.profilePicture ? (
                  <img 
                    src={userInfo.profilePicture} 
                    alt={userInfo.name} 
                    className="profile-image" 
                  />
                ) : (
                  <div className="profile-icon">
                    {userInfo.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="profile-name">{userInfo.name}</span>
                <HiChevronDown className={`profile-arrow ${showProfileMenu ? 'open' : ''}`} />
              </button>

              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    ref={profileMenuRef}
                    initial={{ opacity: 0, y: -5, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -5, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="profile-dropdown"
                  >
                    <div className="dropdown-header">
                      <span>My Account</span>
                    </div>
                    
                    <div className="dropdown-content">
                      <Link to="/profile" className="dropdown-item">
                        <HiOutlineUser /> Profile
                      </Link>
                      <Link to="/my-gigs" className="dropdown-item">
                        <HiOutlineBriefcase /> My Gigs
                      </Link>
                      <Link to="/my-assignments" className="dropdown-item">
                        <HiOutlineClipboardList /> Assignments
                      </Link>
                      <Link to="/my-applications" className="dropdown-item">
                        <HiOutlineDocumentText /> Applications
                      </Link>
                      <Link to="/messages" className="dropdown-item">
                        <HiOutlineChatAlt /> Messages
                      </Link>
                      
                      <button onClick={handleLogout} className="dropdown-item logout-item">
                        <HiOutlineLogout /> Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn-secondary">Log In</Link>
              <Link to="/register" className="btn-primary">Sign Up</Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button 
            className="menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <nav className="mobile-nav">
                <Link to="/gigs" className="mobile-nav-item">
                  Browse Gigs
                </Link>
                {userInfo && (
                  <Link to="/gigs/create" className="mobile-nav-item">
                    Post a Gig
                  </Link>
                )}
                {userInfo ? (
                  <>
                    <div className="mobile-divider"></div>
                    <Link to="/profile" className="mobile-nav-item">
                      <HiOutlineUser className="mobile-icon" /> Profile
                    </Link>
                    <Link to="/my-gigs" className="mobile-nav-item">
                      <HiOutlineBriefcase className="mobile-icon" /> My Gigs
                    </Link>
                    <Link to="/my-assignments" className="mobile-nav-item">
                      <HiOutlineClipboardList className="mobile-icon" /> Assignments
                    </Link>
                    <Link to="/my-applications" className="mobile-nav-item">
                      <HiOutlineDocumentText className="mobile-icon" /> Applications
                    </Link>
                    <Link to="/messages" className="mobile-nav-item">
                      <HiOutlineChatAlt className="mobile-icon" /> Messages
                    </Link>
                    <div className="mobile-divider"></div>
                    <button onClick={handleLogout} className="mobile-nav-item logout-button">
                      <HiOutlineLogout className="mobile-icon" /> Sign Out
                    </button>
                  </>
                ) : (
                  <div className="mobile-auth-buttons">
                    <Link to="/login" className="mobile-btn-secondary">Log In</Link>
                    <Link to="/register" className="mobile-btn-primary">Sign Up</Link>
                  </div>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
