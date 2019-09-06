/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Header from '../Header';
import '../../assets/styles/components/compose.scss';
import { sendMessage } from '../../store/actions/messages.actions';
import Spinner from '../Spinner';

export class Compose extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newMessage: {
        receiverEmail: '',
        subject: '',
        message: '',
        status: 'sent',
      }
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState(state => {
      const { newMessage } = state;
      const updated = { ...newMessage, [name]: value };
      return { ...state, newMessage: updated };
    });
  };

  toggleSidebar = () => {
    const sidebar = document.getElementById('sidebar');
    const sidebarBtn = document.getElementById('sidebar-toggle');

    if (sidebar.classList.contains('is-collapsed')) {
      sidebar.classList.replace('is-collapsed', 'is-full-width');
      sidebarBtn.innerHTML = '<i class="fas fa-angle-double-left"></i>';
    } else if (sidebar.classList.contains('is-full-width')) {
      sidebar.classList.replace('is-full-width', 'is-collapsed');
      sidebarBtn.innerHTML = '<i class="fas fa-angle-double-right"></i>';
    } else {
      sidebar.classList.add('is-collapsed');
      sidebarBtn.innerHTML = '<i class="fas fa-angle-double-right"></i>';
    }
  };

  submitNewMessage = (e) => {
    e.preventDefault();
    const { onNewMessage } = this.props;
    const { newMessage } = this.state;
    onNewMessage(newMessage);
  };

  render() {
    const {
      authReducer,
      messageReducer: {
        postMessageStart,
        postMessageDone
      },
      history
    } = this.props;

    if (!authReducer.currentUser) {
      history.push('/?auth=false');
    }

    let form;

    if (postMessageStart && !postMessageDone) form = <Spinner />;
    else {
      form = (
        <form className="mail" onSubmit={this.submitNewMessage}>
          <div className="mail-info">
            <label>To: </label>
            <input
              type="email"
              name="receiverEmail"
              id="to"
              placeholder="brucewayne@epic.mail"
              className="text-input"
              onChange={(e) => this.handleChange(e)}
            />
            <label>Subject: </label>
            <input
              type="text"
              name="subject"
              id="subject"
              placeholder="Welcome, master"
              className="text-input"
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          <div className="mail-editor-container">
            <textarea
              id="mail-editor"
              name="message"
              className="text-input editor"
              cols="30"
              rows="10"
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          <div className="mail-actions">
            <button
              id="reply-mail"
              className="primary-btn"
              type="submit"
            >
              <i className="fas fa-check" />
              Send
            </button>
          </div>
        </form>
      );
    }

    return (
      <div className="compose__container">
        <Header />
        <div className="mails">
          <div id="sidebar" className="mail-area-nav-container sidebar">
            <ul className="mail-area-nav">
              <li>
                <Link className="icon" to={authReducer.currentUser ? `/${authReducer.currentUser.email}/inbox` : '/?auth=false'} title="Inbox">
                  <i className="fas fa-inbox" />
                </Link>
              </li>
              <li>
                <Link className="icon" to={authReducer.currentUser ? `/${authReducer.currentUser.email}/compose` : '/?auth=false'} title="Compose">
                  <i className="fas fa-pen" />
                </Link>
              </li>
            </ul>
          </div>
          <button id="sidebar-toggle" className="float" type="button" onClick={() => this.toggleSidebar()}>
            <i className="fas fa-angle-double-left" />
          </button>
          <div className="mail-area">
            {form}
          </div>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = ({
  authReducer,
  messageReducer
}) => ({ authReducer, messageReducer });
export const mapDispatchToProps = dispatch => ({
  onNewMessage: (newMessage) => dispatch(sendMessage(newMessage))
});

Compose.propTypes = {
  authReducer: PropTypes.instanceOf(Object).isRequired,
  messageReducer: PropTypes.instanceOf(Object).isRequired,
  onNewMessage: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Compose);
