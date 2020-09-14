import React from 'react';
import './AboutPage.css'

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'
const AboutPage = () => (
  <div className="container">
    <h2>Start Overwatch</h2>
    <div className="info">
      <p>Welcome to 'Start Overwatch'! 'Start Overwatch' is an application designed to help beginner players understand the complex
        hero abilities and interactions in Overwatch. All of the hereos in the game are described in detail, including their abilities, matching hero picks, and 
        counter hero picks. 

        In addition to the heroes, all of the maps are listed for viewing. Each map includes the map type, a short description of the map, and a list of heroes that typically
        perform well on that specific map. Users can create an account and save their favorite heroes and maps for easy reference later!
      </p>
      <img src="https://bit.ly/2Fksrrk" alt="Overwatch Heroes" id="aboutPic"/>
    </div>
  </div>
);

export default AboutPage;
