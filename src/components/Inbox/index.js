import React, { Component } from 'react';
import Header from '../Header';

import '../../assets/styles/components/inbox.scss';

class Inbox extends Component {
  constructor(props) {
    super(props);
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
    return (
      <div className="inbox__container">
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
              <li className="mail-item">
                <a href="readmail.html">
                  <div id="mail-right" className="truncate">
                    <span id="mail-sender">1. Kounou Deschant</span>
                    <span id="mail-title">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ipsum, ratione qu
                    </span>
                  </div>
                  <div id="mail-left">
                    <span id="mail-timestamp">16:47</span>
                    <span id="mail-delete">
                      <i className="fas fa-trash-alt" />
                    </span>
                  </div>
                </a>
              </li>
              <li className="mail-item">
                <a href="readmail.html">
                  <div id="mail-right" className="truncate">
                    <span id="mail-sender">2. Kounou Deschant</span>
                    <span id="mail-title">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ipsum, ratione qu
                    </span>
                  </div>
                  <div id="mail-left">
                    <span id="mail-timestamp">16:47</span>
                    <span id="mail-delete">
                      <i className="fas fa-trash-alt" />
                    </span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Inbox;
