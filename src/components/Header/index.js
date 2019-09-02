import React from 'react';

import imgPlaceholder from '../../assets/images/profile_placeholder.png';

const Header = () => (
  <div className="wrapper">
    <header className="mail-nav">
      <div className="logo">
        <span id="epic-text">Epic</span>
        <span id="mail-text">.Mail</span>
      </div>
      <h1 id="page-title">Inbox</h1>
      <div className="mail-nav-items">
        <a href="#">
          <div className="image-cropper">
            <img id="profile-picture" src={imgPlaceholder} alt="Profile" />
          </div>
        </a>
      </div>
      <ul className="dropdown">
        <li className="dropdown-item">
          <a href="../index.html">
            <i className="fas fa-sign-out-alt" />
            &nbsp; Signout
          </a>
        </li>
        <li className="dropdown-item">
          <a href="#">
            <i className="fas fa-upload" />
            &nbsp; Upload profile photo
          </a>
        </li>
      </ul>
    </header>
  </div>
);

export default Header;
