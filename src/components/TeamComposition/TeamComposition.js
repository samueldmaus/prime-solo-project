import React, {Component} from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {Grid, Card, CardHeader, Avatar, IconButton, TextField} from '@material-ui/core';
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

    checkTankTeamComp = (hero) => {
        if(this.state.comp.tank_one !== '') {
            this.handleTeamCompChange(hero, 'tank_two')
        } else{
            this.handleTeamCompChange(hero, 'tank_one')
        }
    };

    checkDPSTeamComp = (hero) => {
        if(this.state.comp.dps_one !== '') {
            this.handleTeamCompChange(hero, 'dps_two')
        } else {
            this.handleTeamCompChange(hero, 'dps_one')
        }
    };

    checkSupportTeamComp = (hero) => {
        if(this.state.comp.support_one !== '') {
            this.handleTeamCompChange(hero, 'support_two')
        } else {
            this.handleTeamCompChange(hero, 'support_one')
        }
    }

    handleTeamCompChange = (hero, property) => {
        this.setState({
            ...this.state,
            comp: {
                ...this.state.comp,
                [property]: hero.name
            }
        })
    };

    handleTeamCompName = (event, property) => {
        this.setState({
            ...this.state,
            comp: {
                ...this.state.comp,
                [property]: event.target.value
            }
        })
    }

    render(){
        return(
            <Grid>
                <h2>Tank</h2>
                <Grid>
                {this.props.store.heroes.map(hero => {
                    if(hero.role === 'Tank' && hero.name !== this.state.comp.tank_one && hero.name !== this.state.comp.tank_two){
                        return (
                            <Grid item xs={6} key={hero.id}>
                                <Card>
                                    <p>{hero.name}</p>
                                    <Avatar alt={hero.name} src={hero.image} />
                                    <IconButton onClick={()=>this.checkTankTeamComp(hero)}><AddCircleOutlineOutlinedIcon></AddCircleOutlineOutlinedIcon></IconButton>
                                </Card>
                            </Grid>
                           
                        )
                    }
                })}
                </Grid>
                <br/>
                <h2>DPS</h2>
                {this.props.store.heroes.map(hero => {
                    if(hero.role === 'DPS' && hero.name !== this.state.comp.dps_one && hero.name !== this.state.comp.dps_two){
                        return (
                            <Grid item xs={6} key={hero.id}>
                                <Card>
                                    <p>{hero.name}</p>
                                    <Avatar alt={hero.name} src={hero.image} />
                                    <IconButton onClick={()=>this.checkDPSTeamComp(hero)}><AddCircleOutlineOutlinedIcon></AddCircleOutlineOutlinedIcon></IconButton>
                                </Card>
                            </Grid>
                           
                        )
                    }
                })}
                <br/>
                <h2>Support</h2>
                {this.props.store.heroes.map(hero => {
                    if(hero.role === 'Support' && hero.name !== this.state.comp.support_one && hero.name !== this.state.comp.support){
                        return (
                            <Grid item xs={6} key={hero.id}>
                                <Card>
                                    <p>{hero.name}</p>
                                    <Avatar alt={hero.name} src={hero.image} />
                                    <IconButton onClick={()=>this.checkSupportTeamComp(hero)}><AddCircleOutlineOutlinedIcon></AddCircleOutlineOutlinedIcon></IconButton>
                                </Card>
                            </Grid>
                        )
                    }
                })}
                <br/>
                <Grid item xs={6}>
                    <Card>
                        <CardHeader title="Team Composition" />
                        <TextField variant="outlined" label="Team Composition Name" value={this.state.comp.name} onChange={(event)=>this.handleTeamCompName(event, 'name')}/>
                        <h4>{this.state.comp.tank_one}</h4>
                        <h4>{this.state.comp.tank_two}</h4>
                        <h4>{this.state.comp.dps_one}</h4>
                        <h4>{this.state.comp.dps_two}</h4>
                        <h4>{this.state.comp.support_one}</h4>
                        <h4>{this.state.comp.support_two}</h4>
                    </Card>
                    
                </Grid>
               
                
            </Grid>
        )
    }
}

export default connect(mapStoreToProps)(TeamComposition);