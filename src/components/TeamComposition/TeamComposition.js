import React, {Component} from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {Grid, Card, CardHeader, Avatar, IconButton, TextField, Button} from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined'
import axios from 'axios';

class TeamComposition extends Component{
    componentDidMount(){
        this.props.dispatch({type:"FETCH_HEROES", payload: 'All'})
    };
    
    state = {
        createNewComp : false,
        comp: {
            name: '',
            tank_one: '',
            tank_one_id: '',
            tank_two: '',
            tank_two_id: '',
            dps_one: '',
            dps_one_id: '',
            dps_two: '',
            dps_two_id: '',
            support_one: '',
            support_one_id: '',
            support_two: '',
            support_two_id: ''
        }
    };

    checkTankTeamComp = (hero) => {
        if(this.state.comp.tank_one !== '') {
            this.handleTeamCompChange(hero, 'tank_two', 'tank_two_id')
        } else{
            this.handleTeamCompChange(hero, 'tank_one', 'tank_one_id')
        }
    };

    checkDPSTeamComp = (hero) => {
        if(this.state.comp.dps_one !== '') {
            this.handleTeamCompChange(hero, 'dps_two', 'dps_two_id')
        } else {
            this.handleTeamCompChange(hero, 'dps_one', 'dps_one_id')
        }
    };

    checkSupportTeamComp = (hero) => {
        if(this.state.comp.support_one !== '') {
            this.handleTeamCompChange(hero, 'support_two', 'support_two_id')
        } else {
            this.handleTeamCompChange(hero, 'support_one', 'support_one_id')
        }
    };

    handleTeamCompChange = (hero, propertyOne, propertyTwo) => {
        this.setState({
            ...this.state,
            comp: {
                ...this.state.comp,
                [propertyOne]: hero.name,
                [propertyTwo]: hero.id
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
    };

    addTeamComposition = () => {
        console.log(this.state.comp);
        axios.post('/api/teamcomp', this.state.comp).then(response => {
            this.setState({
                createNewComp : false,
                comp: {
                    name: '',
                    tank_one: '',
                    tank_one_id: '',
                    tank_two: '',
                    tank_two_id: '',
                    dps_one: '',
                    dps_one_id: '',
                    dps_two: '',
                    dps_two_id: '',
                    support_one: '',
                    support_one_id: '',
                    support_two: '',
                    support_two_id: ''
                }
            })
        }).catch(error => {
            console.log('error in TEAM COMP POST:', error)
        })
    }

    render(){
        return(
            <>
            <Grid item xs={12}>
                    <Card>
                        <CardHeader title="Team Composition" />
                        <div>
                            <TextField variant="outlined" label="Team Composition Name" value={this.state.comp.name} onChange={(event)=>this.handleTeamCompName(event, 'name')}/>
                            <h4>{this.state.comp.tank_one}</h4>
                            <h4>{this.state.comp.tank_two}</h4>
                            <h4>{this.state.comp.dps_one}</h4>
                            <h4>{this.state.comp.dps_two}</h4>
                            <h4>{this.state.comp.support_one}</h4>
                            <h4>{this.state.comp.support_two}</h4>
                            <br/>
                            <Button variant="contained" color="primary" onClick={this.addTeamComposition}>Create Team Composition</Button>
                        </div>
                    </Card>
                </Grid>
            <Grid>
                <h2>Tank</h2>
                
                {this.props.store.heroes.map(hero => {
                    if(hero.role === 'Tank' && hero.name !== this.state.comp.tank_one && hero.name !== this.state.comp.tank_two){
                        return (
                            <Grid item xs={3} key={hero.id}>
                                <Card>
                                    <p>{hero.name}</p>
                                    <Avatar alt={hero.name} src={hero.image} />
                                    <IconButton onClick={()=>this.checkTankTeamComp(hero)}><AddCircleOutlineOutlinedIcon></AddCircleOutlineOutlinedIcon></IconButton>
                                </Card>
                            </Grid>
                           
                        )
                    }
                })}
                
                <br/>
                <h2>DPS</h2>
                {this.props.store.heroes.map(hero => {
                    if(hero.role === 'DPS' && hero.name !== this.state.comp.dps_one && hero.name !== this.state.comp.dps_two){
                        return (
                            <Grid item xs={3} key={hero.id}>
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
                    if(hero.role === 'Support' && hero.name !== this.state.comp.support_one && hero.name !== this.state.comp.support_two){
                        return (
                            <Grid item xs={3} key={hero.id}>
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
                </Grid>
                </>
        )
    }
}

export default connect(mapStoreToProps)(TeamComposition);