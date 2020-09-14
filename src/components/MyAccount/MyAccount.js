import React, {Component} from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {withStyles} from '@material-ui/core/styles'
import {Accordion, AccordionDetails, AccordionSummary, Avatar, IconButton, Grid} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InfoIcon from '@material-ui/icons/Info'

const styles = theme => ({
  card: {
    margin: 15
  },
  pic: {
    margin: 15
  },
  infoDiv: {
    display: 'flex',
    margin: 30
  },
  name: {
    margin: 15
  }

})
class MyAccount extends Component{
  componentDidMount(){
    this.props.dispatch({type: "FETCH_HERO_FAVORITES"});
    this.props.dispatch({type: "FETCH_MAP_FAVORITES"})
  };

  render(){
    const {classes} = this.props;
    return(
      <>
        {this.props.store.heroes && 
          <Accordion className={classes.card} >
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}><Avatar className={classes.pic} alt="Overwatch Heroes" src="https://bit.ly/2ZyfEbz" /><h3>FAVORITE HEROES</h3></AccordionSummary>
            <AccordionDetails className={classes.card}>
              <Grid>
                {this.props.store.favHeroes.map(hero => (
                    <Grid item xs={6} className={classes.infoDiv} key={hero.id}>
                      <Avatar alt={hero.name} src={hero.image} />
                      <h4 className={classes.name}>{hero.name} - {hero.role}</h4>
                      <IconButton onClick={()=>this.props.history.push(`/heroes/${hero.id}`)}><InfoIcon></InfoIcon></IconButton>
                    </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        }
        {this.props.store.maps &&
          <Accordion className={classes.card} >
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}><Avatar className={classes.pic} alt="Overwatch Heroes" src="https://bit.ly/32rZnqz" /><h3>FAVORITE MAPS</h3></AccordionSummary>
            <AccordionDetails className={classes.card}>
              <Grid>
                {this.props.store.maps.map(map => (
                    <Grid item xs={6} className={classes.infoDiv} key={map.id}>
                      <Avatar alt={map.name} src={map.image} />
                      <h4 className={classes.name}>{map.name} - {map.type}</h4>
                      <IconButton onClick={()=>this.props.history.push(`/maps/${map.id}`)}><InfoIcon></InfoIcon></IconButton>
                    </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        }
      </>
    )
  }
}


export default connect(mapStoreToProps)(withStyles(styles)(MyAccount));
