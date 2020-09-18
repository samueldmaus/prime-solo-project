import React, {Component} from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {withStyles} from '@material-ui/core/styles';
import {Grid, Card, CardHeader, Avatar, IconButton, TextField, Button} from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined'
import axios from 'axios';

const styles = theme => ({
    card: {
        marginLeft: 15,
        marginBottom: 5,
        marginRight: 15
    },
    input: {
        width: 300
    },
    header: {
        marginLeft: 15
    },
    heroDiv: {
        display: 'flex',
        margin: 10,
    },
    name: {
        marginRight: 40
    },
    addBttn: {
        
        marginLeft: 70
    }
})
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
        const {classes} = this.props;
        return(
            <>
            {this.state.createNewComp ? (
                <div>
                <Grid item xs={12}>
                    <Card className={classes.card}>
                        <CardHeader title="Team Composition" />
                        <div className={classes.card}>
                            <TextField className={classes.input} variant="outlined" label="Team Composition Name" value={this.state.comp.name} onChange={(event)=>this.handleTeamCompName(event, 'name')}/>
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
                
                <h2 className={classes.header}>Tank</h2>
                <Grid container>
                {this.props.store.heroes.map(hero => {
                    if(hero.role === 'Tank' && hero.name !== this.state.comp.tank_one && hero.name !== this.state.comp.tank_two){
                        return (
                            <Grid item xs={2} key={hero.id}>
                                <Card className={classes.card}>
                                    <div className={classes.heroDiv}>
                                        <p className={classes.name}>{hero.name}</p>
                                        <Avatar alt={hero.name} src={hero.image} />
                                        <div className={classes.addBttn}>
                                            <IconButton onClick={()=>this.checkTankTeamComp(hero)}><AddCircleOutlineOutlinedIcon></AddCircleOutlineOutlinedIcon></IconButton>
                                        </div>
                                    </div>
                                </Card>
                            </Grid>
                           
                        )
                    }
                })}
                </Grid>
                <br/>

                <h2 className={classes.header}>DPS</h2>
                <Grid container>
                {this.props.store.heroes.map(hero => {
                    if(hero.role === 'DPS' && hero.name !== this.state.comp.dps_one && hero.name !== this.state.comp.dps_two){
                        return (
                            <Grid item xs={2} key={hero.id}>
                                <Card className={classes.card}>
                                    <div className={classes.heroDiv}>
                                        <p className={classes.name}>{hero.name}</p>
                                        <Avatar alt={hero.name} src={hero.image} />
                                        <div className={classes.addBttn}>
                                        <IconButton onClick={()=>this.checkDPSTeamComp(hero)}><AddCircleOutlineOutlinedIcon></AddCircleOutlineOutlinedIcon></IconButton>
                                        </div>
                                    </div>                                
                                </Card>
                            </Grid>
                           
                        )
                    }
                })}
                </Grid>
                <br/>
                <h2 className={classes.header}>Support</h2>
                <Grid container>
                {this.props.store.heroes.map(hero => {
                    if(hero.role === 'Support' && hero.name !== this.state.comp.support_one && hero.name !== this.state.comp.support_two){
                        return (
                            <Grid item xs={2} key={hero.id}>
                                <Card className={classes.card}>
                                    <div className={classes.heroDiv}>
                                        <p className={classes.name}>{hero.name}</p>
                                        <Avatar alt={hero.name} src={hero.image} />
                                        <div className={classes.addBttn}>
                                        <IconButton onClick={()=>this.checkSupportTeamComp(hero)}><AddCircleOutlineOutlinedIcon></AddCircleOutlineOutlinedIcon></IconButton>
                                        </div>
                                    </div>
                                </Card>
                            </Grid>
                        )
                    }
                })}
                </Grid>
                </div>
            ) : (
                <div className={classes.card}>
                    <h2>Team Composition</h2>
                    <Button onClick={()=>this.setState({createNewComp: true, ...this.state.comp})}variant="contained" color="primary">Create New Team Composition</Button>
                </div>
            )}
        </>
        )
    }
}

export default connect(mapStoreToProps)(withStyles(styles)(TeamComposition));