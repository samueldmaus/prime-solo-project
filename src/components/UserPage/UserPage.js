import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {withStyles} from '@material-ui/core/styles'
import {Grid, Card, CardActionArea, CardHeader} from '@material-ui/core';

const styles = theme => ({
  card: {
    margin: 5,
    alignItems: 'center'
  },
  media: {
    height: 400,
    margin: 10,
  },
  header: {
    backgroundImage: 'linear-gradient(to left, rgba(255,0,0,0), rgba(250, 156,29))',
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
              <CardActionArea onClick={()=>this.props.history.push('/heroes')}>
                <CardHeader className={classes.header} title="HEROES" />
                <img className={classes.media} src="https://bit.ly/3bDvFSa" alt="Overwatch Heroes"/>
              </CardActionArea>
            </Card>
          </Grid>
          
          <Grid item xs={12}>
            <Card className={classes.card}>
              <CardActionArea onClick={()=>this.props.history.push('/maps')}>
                <CardHeader className={classes.header} title="MAPS" />
                <img className={classes.media} src="https://bit.ly/2FBMQaN" alt="Overwatch Maps" />
              </CardActionArea>
            </Card>
          </Grid>

        <Grid item xs={12}>
            <Card className={classes.card}>
              <CardActionArea onClick={()=>this.props.history.push('/teamcomposition')}>
                <CardHeader className={classes.header} title="Team Compositions" />
                
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
