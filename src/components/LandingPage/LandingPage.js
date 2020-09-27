import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

class LandingPage extends Component {
  state = {
    heading: 'Class Component',
  };

  onLogin = (event) => {
    this.props.history.push('/login');
  };

  render() {
    return (
      <div className="container">
        <h2>{this.state.heading}</h2>

        <div className="grid">
          <div className="grid-col grid-col_8">
            <p>
              Welcome to 'Start Overwatch'! 'Start Overwatch' is an application designed to help beginner players understand the complex
              hero abilities and interactions in Overwatch. All of the hereos in the game are described in detail, including their abilities, matching hero picks, and 
              counter hero picks. 

              In addition to the heroes, all of the maps are listed for viewing. Each map includes the map type, a short description of the map, and a list of heroes that typically
              perform well on that specific map. Users can create an account and save their favorite heroes and maps for easy reference later!
            </p>
          </div>
          <div className="grid-col grid-col_4">
            <RegisterForm />

            <center>
              <h4>Already a Member?</h4>
              <button className="btn btn_sizeSm" onClick={this.onLogin}>
                Login
              </button>
            </center>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LandingPage);
