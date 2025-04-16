import React from 'react';
import { Link } from 'react-router-dom';
import './css/AuthChoicePage.css';

function AuthChoicePage() {
  return (
    <div className="auth-choice-container">
      {/* Wave animation background */}
      <div className="ocean">
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
      
      {/* Main content container - now properly layered */}
      <div className="main-content-wrapper">
        <div className="container" id="container">
          <div className="form-container choice-container">
            <div className="choice-content">
              <h1>Welcome!</h1>
              <p>Choose how you want to continue</p>
              
              <div className="social-container">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social">
                  <i className="fab fa-github fa-lg"></i>
                </a>
                <a href="https://codepen.io" target="_blank" rel="noopener noreferrer" className="social">
                  <i className="fab fa-codepen fa-lg"></i>
                </a>
                <a href="mailto:example@example.com" className="social">
                  <i className="fab fa-google fa-lg"></i>
                </a>
              </div>
              
              <span className="divider">Or choose one of the options below</span>
              
              <div className="auth-buttons">
                <Link to="/login" className="auth-button login-button">
                  Login In
                </Link>
                <Link to="/signup" className="auth-button signup-button">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
          
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>Sign in here if you already have an account</p>
                <Link to="/login" className="ghost" id="signIn">
                  Sign In
                </Link>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Sign up if you don't have an account yet</p>
                <Link to="/signup" className="ghost" id="signUp">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthChoicePage;