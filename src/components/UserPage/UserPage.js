import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {withStyles} from '@material-ui/core/styles'
import {Grid, Card, CardActionArea, CardHeader, Avatar} from '@material-ui/core';

const styles = theme => ({
  card: {
    margin: 5,
    alignItems: 'center'
  },
  media: {
    height:450,
    width: 600,
    margin: 10,
    borderRadius: '5%'
  },
  header: {
    backgroundImage: 'linear-gradient(to left, rgba(255,0,0,0), rgba(250, 156,29))',
  },
  title: {
    margin:10
  }
})

class UserPage extends Component {
  render() {
    const {classes} = this.props;

    return (
      <>
        <div className={classes.title}>
          <h1 id="welcome">Welcome, {this.props.store.user.username}!</h1>

        </div>
        <Grid container>
          <Grid item xs={4}>
            <Card className={classes.card}>
              <CardActionArea onClick={()=>this.props.history.push('/heroes')}>
                <CardHeader className={classes.header} title="HEROES" />
                <Avatar className={classes.media} src="https://bit.ly/3bDvFSa" alt="Overwatch Heroes"/>
              </CardActionArea>
            </Card>
          </Grid>
          
          <Grid item xs={4}>
            <Card className={classes.card}>
              <CardActionArea onClick={()=>this.props.history.push('/maps')}>
                <CardHeader className={classes.header} title="MAPS" />
                <Avatar className={classes.media} src="https://bit.ly/2FBMQaN" alt="Overwatch Maps" />
              </CardActionArea>
            </Card>
          </Grid>

        <Grid item xs={4}>
            <Card className={classes.card}>
              <CardActionArea onClick={()=>this.props.history.push('/teamcomposition')}>
                <CardHeader className={classes.header} title="TEAMS" />
                <Avatar className={classes.media} src="https://bit.ly/2ZMBKas" alt="Overwatch Team" />
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
