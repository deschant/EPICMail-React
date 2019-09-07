/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import queryString from 'query-string';
import { login } from '../../store/actions/auth.actions';

import Spinner from '../Spinner';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: {
        email: '',
        password: ''
      },
      toasted: false,
    };
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState(state => {
      const { credentials } = state;
      const updated = { ...credentials, [name]: value };
      return { ...state, credentials: updated };
    });
  };

  handleLogin = e => {
    e.preventDefault();
    const { onLogin } = this.props;
    const { credentials } = this.state;
    onLogin(credentials);
  };

  render() {
    const {
      authReducer: {
        loginStart,
        loginDone,
        isAuthenticated,
        currentUser
      },
      history,
      location
    } = this.props;
    const { toasted } = this.state;

    if (loginStart && !loginDone) {
      return <Spinner />;
    }

    const { auth } = queryString.parse(location.search);
    if (auth && !toasted) {
      toast.warn('Please login or signup!');
      this.setState({ toasted: true });
    }

    if (isAuthenticated) {
      history.push(`/${currentUser.email}/compose`);
    }

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
            <form onSubmit={this.handleLogin} id="login-form" className="form-group">
              <div className="input-group">
                <input
                  required
                  id="login-email"
                  type="email"
                  className="text-input"
                  placeholder="Enter your email address"
                  name="email"
                  onChange={(e) => this.handleInputChange(e)}
                />
              </div>
              <div>
                <input
                  required
                  id="login-password"
                  type="password"
                  className="text-input"
                  name="password"
                  onChange={(e) => this.handleInputChange(e)}
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

export const mapStateToProps = ({ authReducer }) => ({ authReducer });

export const mapDispatchToProps = dispatch => ({
  onLogin: (creds) => dispatch(login(creds)),
});

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  authReducer: PropTypes.instanceOf(Object).isRequired,
  location: PropTypes.instanceOf(Object).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
