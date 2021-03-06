import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import mapStoreToProps from '../../redux/mapStoreToProps';

const Nav = (props) => {
  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (props.store.user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }

  return (
    <div className="nav">
      <Link to="/home">
        <img id="navLogo" width="64" alt="Overwatch circle logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Overwatch_circle_logo.svg/512px-Overwatch_circle_logo.svg.png"/>
        <h2 className="nav-title">Start Overwatch</h2>
      </Link>
      <div className="nav-right">
        <Link className="nav-link" to={loginLinkData.path}>
          {/* Show this link if they are logged in or not,
          but call this link 'Home' if they are logged in,
          and call this link 'Login / Register' if they are not */}
          {loginLinkData.text}
        </Link>
        <Link className="nav-link" to="/about">
          About
        </Link>
        {/* Show the link to the info page and the logout button if the user is logged in */}
        {props.store.user.id && !props.store.user.isAdmin && (
          <>
            <Link className="nav-link" to="/myaccount">
              My Account
            </Link>
            <LogOutButton className="nav-link" />
          </>
        )}
        {/* Shows links for the admin */}
        {props.store.user.id && props.store.user.isAdmin && (
          <>
            <Link className="nav-link" to="/add">Add</Link>
            <LogOutButton className="nav-link" />
          </>
        )}

      </div>
    </div>
  );
};

export default connect(mapStoreToProps)(Nav);
