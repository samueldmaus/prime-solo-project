import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {withStyles} from '@material-ui/core/styles'
import {Grid, Card, CardActionArea, CardHeader, CardMedia} from '@material-ui/core';

const styles = theme => ({
  card: {
    margin: 5,
    alignItems: 'center'
  },
  media: {
    height: 350
  }
})

class UserPage extends Component {
  render() {
    const {classes} = this.props;

    return (
      <>
        <div>
          <h1 id="welcome">Welcome, {this.props.store.user.username}!</h1>
          <p>Your ID is: {this.props.store.user.id}</p>
        </div>
        <Grid>
          <Grid item xs={12}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardHeader title="HEROES" />
                <CardMedia className={classes.media} title="HEROES" image="https://bit.ly/2R3o464" />
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardActionArea>
                <CardHeader title="MAP" />
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </>
    )
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(withStyles(styles)(UserPage));
