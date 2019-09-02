/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import Header from '../Header';

import '../../assets/styles/components/compose.scss';

class Compose extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="compose__container">
        <Header />
        <div className="mails">
          <div id="sidebar" className="mail-area-nav-container sidebar">
            <ul className="mail-area-nav">
              <li>
                <a className="icon" href="inbox.html" title="Inbox">
                  <i className="fas fa-inbox" />
                </a>
              </li>
              <li>
                <a className="icon" href="compose.html" title="Compose">
                  <i className="fas fa-pen" />
                </a>
              </li>
            </ul>
          </div>
          <button id="sidebar-toggle" className="float" type="button">
            <i className="fas fa-angle-double-left" />
          </button>
          <div className="mail-area">
            <form className="mail">
              <div className="mail-info">
                <label>To: </label>
                <input
                  type="email"
                  name="to"
                  id="to"
                  placeholder="brucewayne@epic.mail"
                  className="text-input"
                />
                <label>Subject: </label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  placeholder="Welcome, master"
                  className="text-input"
                />
              </div>
              <div className="mail-editor-container">
                <textarea
                  id="mail-editor"
                  className="text-input editor"
                  cols="30"
                  rows="10"
                />
              </div>
              <div className="mail-actions">
                <a
                  href="#"
                  id="reply-mail"
                  className="primary-btn"
                  type="submit"
                >
                  <i className="fas fa-check" />
                  Send
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Compose;
