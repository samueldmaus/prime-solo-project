import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import LoginForm from '../LoginForm/LoginForm';
import {withStyles, Grid, Avatar} from '@material-ui/core'

const styles = theme => ({
  media: {
    width: 700,
    height: 500,
    borderRadius: '0%',
  },
  rightGrid: {
    marginTop: 100
  }
})
class LoginPage extends Component {
  render() {
    const {classes} = this.props
    return (
      <Grid container>
        <Grid item xs={6}>
          <Avatar className={classes.media} alt="Overwatch" src="https://bit.ly/2RCI7bL" />
        </Grid>
        <Grid item xs={6} className={classes.rightGrid}>
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
            </center>
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default connect(mapStoreToProps)(withStyles(styles)(LoginPage));
