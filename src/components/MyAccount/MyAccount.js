import React, {Component} from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {withStyles} from '@material-ui/core/styles'
import {Accordion, AccordionDetails, AccordionSummary, Avatar, IconButton} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InfoIcon from '@material-ui/icons/Info'

const styles = theme => ({
  card: {
    margin: 15
  },
  pic: {
    margin: 15
  },
  heroDiv: {
    flex: 1,
    display: 'flex',
    margin: 10
  },
  name: {
    margin: 15
  }

})
class MyAccount extends Component{
  componentDidMount(){
    this.props.dispatch({type: "FETCH_HERO_FAVORITES", payload: this.props.store.user.id})
  };

  render(){
    const {classes} = this.props;
    return(
      <>
        {this.props.store.heroes && 
          <Accordion className={classes.card} >
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}><Avatar className={classes.pic} alt="Overwatch Heroes" src="https://bit.ly/2ZyfEbz" /><h3>FAVORITE HEROES</h3></AccordionSummary>
            <AccordionDetails>
              {this.props.store.heroes.map(hero => (
                <div className={classes.heroDiv} key={hero.id}>
                  <Avatar alt={hero.name} src={hero.image} />
                  <h4 className={classes.name}>{hero.name} - {hero.role}</h4>
                  <IconButton><InfoIcon></InfoIcon></IconButton>
                </div>
              ))}
            </AccordionDetails>
          </Accordion>
        }

      </>
    )
  }
}


export default connect(mapStoreToProps)(withStyles(styles)(MyAccount));
