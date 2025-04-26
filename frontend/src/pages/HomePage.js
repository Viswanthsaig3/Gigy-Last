import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaBriefcase, FaSearch, FaCheckCircle, FaArrowRight, FaHandshake } from 'react-icons/fa';
import { FaRocket, FaShieldAlt, FaStar, FaChartLine, FaHeadset } from 'react-icons/fa';
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
        
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                className="benefit-card"
                ref={el => benefitCardsRef.current[index] = el}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: "easeOut" 
                }}
                whileHover={{
                  y: -8,
                  boxShadow: "0 20px 30px rgba(0, 0, 0, 0.1)",
                  transition: { duration: 0.2 }
                }}
              >
                <div className={`benefit-icon-container benefit-color-${index % 3}`}>
                  <benefit.icon className="benefit-icon" />
                </div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </motion.div>
            ))}
          </div>
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
    icon: FaRocket,
    title: "Quick Matching",
    description: "Find the perfect freelancer or job within minutes using our advanced matching algorithm."
  },
  {
    icon: FaShieldAlt,
    title: "Secure Payments",
    description: "Our escrow system ensures secure transactions and payments are released only when you're satisfied."
  },
  {
    icon: FaStar,
    title: "Verified Talent",
    description: "Work with pre-vetted professionals who have proven their expertise and reliability."
  },
  {
    icon: FaChartLine,
    title: "Grow Your Business",
    description: "Access tools and resources to help you expand your client base and increase your earnings."
  },
  {
    icon: FaHandshake,
    title: "Direct Communication",
    description: "Our platform enables clear, direct communication between clients and freelancers."
  },
  {
    icon: FaHeadset,
    title: "24/7 Support",
    description: "Get assistance whenever you need it with our dedicated customer support team."
  }
];

export default HomePage;
