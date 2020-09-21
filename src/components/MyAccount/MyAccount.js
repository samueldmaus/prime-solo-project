import React, {Component} from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {withStyles} from '@material-ui/core/styles';
import {Accordion, AccordionDetails, AccordionSummary, Avatar, IconButton, Grid} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InfoIcon from '@material-ui/icons/Info';
import DeleteIcon from '@material-ui/icons/Delete'

const styles = theme => ({
  card: {
    margin: 15
  },
  pic: {
    margin: 15,
    width: 75,
    height: 75
  },
  infoDiv: {
    display: 'inline-block',
    margin: 30,
  },
  name: {
    margin: 15
  },
  heroDiv: {
    margin: 5,
    display: 'flex'
  }

})
class MyAccount extends Component{
  componentDidMount(){
    this.props.dispatch({type: "FETCH_HERO_FAVORITES"});
    this.props.dispatch({type: "FETCH_MAP_FAVORITES"});
    this.props.dispatch({type: "FETCH_TEAM_COMPS"});
  };

  deleteTeamComp = (comp) => {
    this.props.dispatch({type: "DELETE_TEAM_COMP", payload: comp.id})
  }

  render(){
    const {classes} = this.props;
    return(
      <>
        {this.props.store.heroes && 
          <Accordion className={classes.card} >
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}><Avatar className={classes.pic} alt="Overwatch Heroes" src="https://bit.ly/3hRWPq2" /><h3>FAVORITE HEROES</h3></AccordionSummary>
            <AccordionDetails className={classes.card}>
              <Grid>
                {this.props.store.favHeroes.map(hero => (
                    <Grid item xs={6} className={classes.infoDiv} key={hero.id}>
                      <Avatar alt={hero.name} src={hero.image} />
                      <h4 className={classes.name}>{hero.name}</h4>
                      <IconButton onClick={()=>this.props.history.push(`/heroes/${hero.id}`)}><InfoIcon></InfoIcon></IconButton>
                    </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        }
        {this.props.store.maps &&
          <Accordion className={classes.card} >
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}><Avatar className={classes.pic} alt="Overwatch Maps" src="https://bit.ly/32rZnqz" /><h3>FAVORITE MAPS</h3></AccordionSummary>
            <AccordionDetails className={classes.card}>
              <Grid>
                {this.props.store.favMaps.map(map => (
                    <Grid item xs={6} className={classes.infoDiv} key={map.id}>
                      <Avatar alt={map.name} src={map.image} />
                      <h4 className={classes.name}>{map.name}</h4>
                      <IconButton onClick={()=>this.props.history.push(`/maps/${map.id}`)}><InfoIcon></InfoIcon></IconButton>
                    </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        }
        {this.props.store.teamComps && 
          <Accordion className={classes.card}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}><Avatar className={classes.pic} alt="Overwatch Team" src="https://bit.ly/2RwPfXl"/><h3>TEAM COMPOSITIONS</h3></AccordionSummary>
            <AccordionDetails className={classes.card}>
              <Grid container>
                {this.props.store.teamComps.map(comp => (
                  <>
                  <Grid item xs={12} className={classes.heroDiv} key={comp.id}>
                    <h4>{comp.name}</h4> 
                    <IconButton onClick={()=>this.deleteTeamComp(comp)}><DeleteIcon></DeleteIcon></IconButton>
                  </Grid>
                  <Grid item xs={12} className={classes.heroDiv} >
                    {comp.heroList.map(hero => (
                      <div key={hero.heroId} className={classes.heroDiv}>
                        <p className={classes.heroDiv}>{hero.hero} - {hero.role}</p>
                        <Avatar alt={hero.hero} src={hero.image} />
                      </div>
                    ))}
                  </Grid>
                  </>
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
