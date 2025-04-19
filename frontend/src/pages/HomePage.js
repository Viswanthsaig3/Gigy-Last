import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaBriefcase, FaSearch, FaCheckCircle, FaArrowRight, FaHandshake } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './HomePage.css';

const HomePage = () => {
  // Refs for scroll animations
  const processCardsRef = useRef([]);
  const benefitCardsRef = useRef([]);
  const opportunitiesTextRef = useRef(null);
  const opportunitiesImageRef = useRef(null);
  const opportunitiesListItems = useRef([]);
  const ctaCardRef = useRef(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe process cards
    processCardsRef.current.forEach(card => {
      if (card) observer.observe(card);
    });
    
    // Observe benefits cards
    benefitCardsRef.current.forEach(card => {
      if (card) observer.observe(card);
    });
    
    // Observe opportunities section
    if (opportunitiesTextRef.current) observer.observe(opportunitiesTextRef.current);
    if (opportunitiesImageRef.current) observer.observe(opportunitiesImageRef.current);
    
    // Observe list items
    opportunitiesListItems.current.forEach(item => {
      if (item) observer.observe(item);
    });
    
    // Observe CTA card
    if (ctaCardRef.current) observer.observe(ctaCardRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="blue-gradient-circle circle-1"></div>
          <div className="blue-gradient-circle circle-2"></div>
          <div className="blue-gradient-circle circle-3"></div>
          <div className="dotted-pattern"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-text-content">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="hero-badge"
            >
              <span className="badge-icon">🇮🇳</span>
              <span>India's Own Gig Platform</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hero-title"
            >
              Find Local <span className="highlight">Work</span> or <span className="highlight">Talent</span> Near You
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="hero-subtitle"
            >
              GiGy connects you with skilled workers or job opportunities in your city. Need help with a task? Find reliable local talent. Looking for work? Discover flexible gigs that match your skills.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="hero-buttons"
            >
              <Link to="/gigs" className="primary-button">
                <FaSearch className="button-icon" /> Find Services
              </Link>
              <Link to="/gigs/create" className="secondary-button">
                <FaBriefcase className="button-icon" /> Offer Your Skills
              </Link>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hero-image-container"
          >
            <div className="hero-image-wrapper">
              <div className="hero-image-overlay"></div>
              <img 
                src="/images/hero-illustration.png" 
                alt="GiGy Platform Illustration" 
                className="hero-image"
              />
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="scroll-indicator"
        >
          <div className="mouse"></div>
          <div className="down-arrow">↓</div>
          <span>Scroll to explore</span>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="section stats-section">
        <div className="section-inner">
          <motion.div 
            className="stats-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="stat-box">
              <span className="stat-value">10K+</span>
              <span className="stat-label">Active Gigs</span>
            </div>
            <div className="stat-box">
              <span className="stat-value">5K+</span>
              <span className="stat-label">Freelancers</span>
            </div>
            <div className="stat-box">
              <span className="stat-value">8K+</span>
              <span className="stat-label">Completed Tasks</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section how-it-works-section">
        <div className="section-inner">
          <div className="section-header">
            <h2 className="section-title">How GiGy Works</h2>
            <p className="section-subtitle">Simple steps to get started with our platform</p>
          </div>
          
          <div className="process-steps">
            <div 
              className="process-card"
              ref={el => processCardsRef.current[0] = el}
            >
              <div className="card-icon-wrapper blue">
                <FaBriefcase className="card-icon" />
              </div>
              <h3>Post a Gig</h3>
              <p>Describe your task, set a budget, and post it on our platform.</p>
              <span className="step-number">1</span>
            </div>
            
            <div className="connector"></div>
            
            <div 
              className="process-card"
              ref={el => processCardsRef.current[1] = el}
            >
              <div className="card-icon-wrapper light-blue">
                <FaSearch className="card-icon" />
              </div>
              <h3>Get Applications</h3>
              <p>Receive applications from skilled individuals ready for your task.</p>
              <span className="step-number">2</span>
            </div>
            
            <div className="connector"></div>
            
            <div 
              className="process-card"
              ref={el => processCardsRef.current[2] = el}
            >
              <div className="card-icon-wrapper dark-blue">
                <FaHandshake className="card-icon" />
              </div>
              <h3>Collaborate & Complete</h3>
              <p>Choose the best person and work together to complete the gig.</p>
              <span className="step-number">3</span>
            </div>
          </div>
        </div>
      </section>

      {/* Find Opportunities Section */}
      <section className="section find-opportunities-section">
        <div className="opportunities-content">
          <div
            className="opportunities-text"
            ref={opportunitiesTextRef}
          >
            <h2 className="section-title">Find Opportunities That Match Your Skills</h2>
            <p className="section-description">
              Browse available gigs and apply to the ones that match your expertise. Join thousands of
              freelancers making their mark on GiGy.
            </p>
            
            <ul className="opportunities-list">
              <li 
                className="opportunities-list-item"
                ref={el => opportunitiesListItems.current[0] = el}
              >
                <FaCheckCircle className="check-icon" />
                <span>Discover gigs in your area of expertise</span>
              </li>
              <li 
                className="opportunities-list-item"
                ref={el => opportunitiesListItems.current[1] = el}
              >
                <FaCheckCircle className="check-icon" />
                <span>Set your own schedule and work on your terms</span>
              </li>
              <li 
                className="opportunities-list-item"
                ref={el => opportunitiesListItems.current[2] = el}
              >
                <FaCheckCircle className="check-icon" />
                <span>Build your profile and grow your reputation</span>
              </li>
            </ul>
            
            <Link to="/gigs" className="primary-button">
              Find Work <FaArrowRight className="button-icon-end" />
            </Link>
          </div>
          
          <div
            className="opportunities-image"
            ref={opportunitiesImageRef}
          >
            <img src="/images/oppurtunities.png" alt="Find Opportunities" />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section benefits-section">
        <div className="section-inner">
          <div className="section-header">
            <h2 className="section-title">Why Choose GiGy</h2>
            <p className="section-subtitle">Our platform offers unique advantages for both clients and freelancers</p>
          </div>
        </div>
        
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="benefit-card"
              ref={el => benefitCardsRef.current[index] = el}
            >
              <div className="benefit-icon">
                <benefit.icon />
              </div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call To Action Section */}
      <section className="section cta-section">
        <div 
          className="cta-card"
          ref={ctaCardRef}
        >
          <h2>Ready to Get Started with GiGy?</h2>
          <p>Join our community of freelancers and clients today.</p>
          <div className="cta-buttons">
            <Link to="/register" className="primary-button">Sign Up Now</Link>
            <Link to="/gigs" className="text-button">Learn More</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// Benefits data
const benefits = [
  {
    icon: () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" /></svg>,
    title: "Community Verified",
    description: "Connect with trusted, reviewed professionals in our secure community network."
  },
  {
    icon: () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" /></svg>,
    title: "Fast Responses",
    description: "Get quick replies from freelancers, enabling you to complete your projects on time."
  },
  {
    icon: () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4.5 3.75a3 3 0 00-3 3v.75h21v-.75a3 3 0 00-3-3h-15z" /><path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 003 3h15a3 3 0 003-3v-7.5zm-18 3.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" clipRule="evenodd" /></svg>,
    title: "No Hidden Fees",
    description: "Our transparent pricing means no surprise charges or hidden costs."
  },
  {
    icon: () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" /></svg>,
    title: "Secure Payments",
    description: "Your transactions are protected with our secure payment processing system."
  },
  {
    icon: () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" /><path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" /></svg>,
    title: "Real-time Chat",
    description: "Communicate directly with clients or freelancers through our built-in messaging system."
  },
  {
    icon: () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.644 1.59a.75.75 0 01.712 0l9.75 5.25a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.712 0l-9.75-5.25a.75.75 0 010-1.32l9.75-5.25z" /><path d="M3.265 10.602l7.668 4.129a2.25 2.25 0 002.134 0l7.668-4.13 1.37.739a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.71 0l-9.75-5.25a.75.75 0 010-1.32l1.37-.738z" /><path d="M10.933 19.231l-7.668-4.13-1.37.739a.75.75 0 000 1.32l9.75 5.25c.221.12.489.12.71 0l9.75-5.25a.75.75 0 000-1.32l-1.37-.738-7.668 4.13a2.25 2.25 0 01-2.134-.001z" /></svg>,
    title: "Flexible Work",
    description: "Find short-term gigs or long-term projects that fit your schedule and preferences."
  }
];

export default HomePage;
