import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { signup } from "../../store/actions/auth.actions";
import Spinner from "../Spinner";

export class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newUser: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirmation: ""
      }
    };
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState(state => {
      const { newUser } = state;
      let updated;
      if (name === "email") {
        updated = { ...newUser, [name]: `${value}@epic.mail` };
      } else {
        updated = { ...newUser, [name]: value };
      }
      return { ...state, newUser: updated };
    });
  };

  handleSignup = e => {
    e.preventDefault();
    const { onSignup } = this.props;
    const { newUser } = this.state;
    if (newUser.password !== newUser.passwordConfirmation) {
      toast.error("Sorry, passwords do not match");
    } else {
      onSignup(newUser);
    }
  };

  render() {
    const {
      authReducer: {
        signupStart,
        signupDone,
        isAuthenticated,
        currentUser
      },
      history,
    } = this.props;
    if (signupStart && !signupDone) {
      return <Spinner />;
    }

    if (isAuthenticated) {
      history.push(`/${currentUser.email}/inbox`);
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
          <div className="form" id="signup">
            <form onSubmit={this.handleSignup} className="form-group">
              <div id="user-names">
                <input
                  required
                  id="fN"
                  type="text"
                  className="text-input"
                  placeholder="First Name"
                  name="firstName"
                  onChange={e => this.handleInputChange(e)}
                />
                <input
                  required
                  id="lN"
                  type="text"
                  className="text-input"
                  placeholder="Last Name"
                  name="lastName"
                  onChange={e => this.handleInputChange(e)}
                />
              </div>
              <div className="input-group">
                <input
                  required
                  type="text"
                  id="email-input"
                  className="text-input"
                  placeholder="Email address"
                  name="email"
                  onChange={e => this.handleInputChange(e)}
                />
                <span id="email-suffix">@epic.mail</span>
              </div>
              <div>
                <input
                  required
                  id="password"
                  type="password"
                  className="text-input"
                  placeholder="Password"
                  name="password"
                  onChange={e => this.handleInputChange(e)}
                />
              </div>
              <div>
                <input
                  required
                  id="confirm-password"
                  type="password"
                  className="text-input"
                  placeholder="Confirm password"
                  name="passwordConfirmation"
                  onChange={e => this.handleInputChange(e)}
                />
              </div>
              <button id="signup-btn" type="submit" className="primary-btn">
                Signup
              </button>
              <div className="links">
                <Link to="/login">Sign in instead ?</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = ({ authReducer }) => ({ authReducer });

export const mapDispatchToProps = dispatch => ({
  onSignup: newUser => dispatch(signup(newUser))
});

Signup.defaultProps = {
  authReducer: {}
};

Signup.propTypes = {
  onSignup: PropTypes.func.isRequired,
  authReducer: PropTypes.instanceOf(Object),
  history: PropTypes.instanceOf(Object).isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
