import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Header from '../Header';
import '../../assets/styles/components/inbox.scss';
import { fetchMessages } from '../../store/actions/messages.actions';
import Spinner from '../Spinner';

class Inbox extends Component {
  constructor(props) {
    super(props);
    props.onFetchMessages();
    this.state = {};
  }

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

  render() {
    const { authReducer, messageReducer: { messages } } = this.props;

    let messageItems;
    if (messages && messages.length > 0) {
      messageItems = messages.map((msg) => (
        <li key={msg.id} className="mail-item">
          <a href="#">
            <div id="mail-right" className="truncate">
              <span id="mail-sender">{msg.subject}</span>
              <span id="mail-title">
                {msg.message}
              </span>
            </div>
            <div id="mail-left">
              <span id="mail-timestamp">{moment(msg.created_at).format('hh:mm a')}</span>
              <span id="mail-delete">
                <i className="fas fa-trash-alt" />
              </span>
            </div>
          </a>
        </li>
      ));
    } else if (messages && messages.length <= 0) messageItems = <h3>You inbox is empty!</h3>;
    else messageItems = <Spinner />;

    return (
      <div className="inbox__container">
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
          <button
            id="sidebar-toggle"
            type="button"
            className="float"
            onClick={() => this.toggleSidebar()}
          >
            <i className="fas fa-angle-double-left" />
          </button>
          <div className="mail-area">
            <ul className="mail-list">
              {messageItems}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapPropsToState = ({ authReducer, messageReducer }) => ({ authReducer, messageReducer });
const mapDispatchToState = dispatch => ({
  onFetchMessages: () => dispatch(fetchMessages())
});

Inbox.propTypes = {
  authReducer: PropTypes.instanceOf(Object).isRequired,
  messageReducer: PropTypes.instanceOf(Object).isRequired,
  onFetchMessages: PropTypes.func.isRequired,
};

export default connect(mapPropsToState, mapDispatchToState)(Inbox);
