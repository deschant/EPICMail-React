/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="wrapper">
        <div className="left">
          <div className="art" />
        </div>
        <div className="right">
          <div className="logo">
            <span id="epic-text">Epic</span>
            <span id="mail-text">.Mail</span>
          </div>
          <div className="form" id="signin">
            <form id="login-form" className="form-group">
              <div className="input-group">
                <input
                  required
                  type="email"
                  className="text-input"
                  placeholder="Enter your email address"
                />
              </div>
              <div>
                <input
                  required
                  type="password"
                  className="text-input"
                  placeholder="Enter your password"
                />
              </div>
              <button id="login-submit" type="submit" className="primary-btn">
                Login
              </button>
            </form>
            <div className="links">
              <a href="html/forgotpassword.html">Forgot password?</a>
            </div>
            <div className="or">
              <hr className="bar" />
              <span>New User</span>
              <hr className="bar" />
            </div>
            <Link to="/signup" className="secondary-btn">
              Sign Up
            </Link>
            <footer id="signin-footer">
              <p>Copyright &copy; 2019, Andela Developer Challenge</p>
              <br />
              <a href="#">Terms of Use</a> | <a href="#">Privacy Policy</a>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
