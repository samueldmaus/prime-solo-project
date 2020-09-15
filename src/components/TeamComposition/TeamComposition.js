import React, {Component} from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {Grid, Card, Avatar, IconButton} from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined'

class TeamComposition extends Component{
    componentDidMount(){
        this.props.dispatch({type:"FETCH_HEROES", payload: 'All'})
    }
    
    state = {
        createNewComp : false,
        comp: {
            name: '',
            tank_one: '',
            tank_two: '',
            dps_one: '',
            dps_two: '',
            support_one: '',
            support_two: ''
        }
    }
    render(){
        return(
            <Grid >
                <h2>Tank</h2>
                <Grid>
                {this.props.store.heroes.map(hero => {
                    if(hero.role === 'Tank' && hero.name !== this.state.comp.tank_one && hero.name !== this.state.comp.tank_two){
                        return (
                            <Grid item xs={6} key={hero.id}>
                                <Card>
                                    <p>{hero.name}</p>
                                    <Avatar alt={hero.name} src={hero.image} />
                                    <IconButton><AddCircleOutlineOutlinedIcon></AddCircleOutlineOutlinedIcon></IconButton>
                                </Card>
                            </Grid>
                           
                        )
                    }
                })}
                </Grid>
                <br/>
                <h2>DPS</h2>
                {this.props.store.heroes.map(hero => {
                    if(hero.role === 'DPS'){
                        return (
                            <Grid item xs={6} key={hero.id}>
                                <Card>
                                    <p>{hero.name}</p>
                                    <Avatar alt={hero.name} src={hero.image} />
                                    <IconButton><AddCircleOutlineOutlinedIcon></AddCircleOutlineOutlinedIcon></IconButton>
                                </Card>
                            </Grid>
                           
                        )
                    }
                })}
                <br/>
                <h2>Support</h2>
                {this.props.store.heroes.map(hero => {
                    if(hero.role === 'Support'){
                        return (
                            <Grid item xs={6} key={hero.id}>
                                <Card>
                                    <p>{hero.name}</p>
                                    <Avatar alt={hero.name} src={hero.image} />
                                    <IconButton><AddCircleOutlineOutlinedIcon></AddCircleOutlineOutlinedIcon></IconButton>
                                </Card>
                            </Grid>
                        )
                    }
                })}
            </Grid>
        )
    }
}

export default connect(mapStoreToProps)(TeamComposition);