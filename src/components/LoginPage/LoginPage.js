import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import LoginForm from '../LoginForm/LoginForm';
import axios from 'axios'

class LoginPage extends Component {

  bnetAuth = () => {
    axios.get('/oauth/authorize')
  }
  render() {
    return (
      <div>
        <LoginForm />

        <center>
          <button
            type="button"
            className="btn btn_asLink"
            onClick={() => {
              this.props.history.push('/registration');
            }}
          >
            Register
          </button>
          <br />
          <br />
          <button onClick={this.bnetAuth}>LOG IN WITH BATTLE.NET</button>
        </center>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LoginPage);
