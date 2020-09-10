import React, {Component} from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {withStyles} from '@material-ui/core/styles';
import {Card, CardHeader, Grid, IconButton, Typography, TextField, RadioGroup, FormControlLabel, Radio} from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

const styles = theme => ({
    card: {
        margin: 15
    },
    image: {
        margin: 10,
        float: 'left',
        height: 400,
        width: 400
    },
    info: {
        align: 'right',
        margin: 10,

    },
    header: {
        backgroundColor: '#f99e1a'
    },
    title: {
        color: '#f99e1a'
    }
});

class IndividualHero extends Component{
    componentDidMount(){
        let id = this.props.match.params.id;
        this.props.dispatch({type: "GET_IND_HERO", payload: id});
    }

    state = {
        editIconOn: true,
        hero: {
            id: '',
            name: '',
            role: '',
            image: '',
            ability_one: '',
            ability_two: '',
            ability_three: '',
            ability_four: '',
            ability_ult: ''
        }
    };

    editMode = () => {
        this.setState({
            editIconOn: !this.state.editIconOn,
            hero: {
                id: this.props.store.individualHero[0].id,
                name: this.props.store.individualHero[0].name,
                role: this.props.store.individualHero[0].role,
                image: this.props.store.individualHero[0].image,
                ability_one: this.props.store.individualHero[0].ability_one,
                ability_two: this.props.store.individualHero[0].ability_two,
                ability_three: this.props.store.individualHero[0].ability_three,
                ability_four: this.props.store.individualHero[0].ability_four,
                ability_ult: this.props.store.individualHero[0].ability_ult
            }
        })
    };

    handleChange = (event, property) => {
        this.setState({
            ...this.state,
            hero: {
                ...this.state.hero,
                [property]: event.target.value
            }
        })
    }
    
    // update hero information on db when save button is clicked
    updateHero = () => {

        console.log(this.state.hero)
        axios.put('/api/hero', this.state.hero)
        .then(response => {
            this.setState({
                editIconOn: !this.state.editIconOn,
                ...this.state.hero
            })
            let id = this.props.match.params.id;
            this.props.dispatch({type: "GET_IND_HERO", payload: id});
        }).catch(error => {
            console.log('error in HERO PUT:', error)
        })
    }

    render(){
        const {classes} = this.props;
        let hero = this.props.store.individualHero[0];
        return(
            <>
                <Card className={classes.card}>
                    {hero && 
                        this.state.editIconOn ? 
                        (<>
                            <CardHeader className={classes.header} title={hero.name} subheader={hero.role}/>
                            <Grid container>
                            <Grid item xs={12}>
                                <img className={classes.image} src={hero.image} alt={hero.name}/>
                                <div className={classes.info}>
                                    <Typography className={classes.title} variant="h5">ABILITIES:</Typography>
                                        <h4>{hero.ability_one}</h4>
                                        <h4>{hero.ability_two}</h4>
                                        <h4>{hero.ability_three}</h4>
                                        <h4>{hero.ability_four}</h4>
                                    <Typography className={classes.title} variant="h5">ULTIMATE:</Typography><h4>{hero.ability_ult}</h4>
                                </div>
                            </Grid>
                            </Grid>
                            <IconButton onClick={()=>this.props.history.push('/heroes')}><KeyboardBackspaceIcon fontSize="large"></KeyboardBackspaceIcon></IconButton>
                            <IconButton><DeleteIcon fontSize="large"></DeleteIcon></IconButton>
                            <IconButton onClick={this.editMode}><EditIcon fontSize="large"></EditIcon></IconButton>
                        </>) :
                        (hero && <>
                            <form className={classes.info}>
                                <TextField margin="dense" label="Hero Name" value={this.state.hero.name} onChange={(event)=>this.handleChange(event, 'name')} />
                                <RadioGroup row id="heroRoleRadio" value={this.state.hero.role} onChange={(event)=>this.handleChange(event, 'role')}>
                                        <FormControlLabel selected value="Tank" control={<Radio />} label="Tank" />
                                        <FormControlLabel value="DPS" control={<Radio />} label="DPS" />
                                        <FormControlLabel value="Support" control={<Radio />} label="Support" />
                                </RadioGroup>
                                <TextField margin="dense" label="Hero Image" value={this.state.hero.image} onChange={(event)=>this.handleChange(event, 'image')} />
                                <TextField multiline fullWidth rows={4} variant="outlined" margin="dense"
                                label="First Ability" value={this.state.hero.ability_one} onChange={(event)=>this.handleChange(event, 'ability_one')}/>
                                <TextField multiline fullWidth rows={4} variant="outlined" margin="dense"
                                label="Second Ability" value={this.state.hero.ability_two} onChange={(event)=>this.handleChange(event, 'ability_two')}/>
                                <TextField multiline fullWidth rows={4} variant="outlined" margin="dense"
                                label="Third Ability" value={this.state.hero.ability_three} onChange={(event)=>this.handleChange(event, 'ability_three')}/>
                                <TextField multiline fullWidth rows={4} variant="outlined" margin="dense"
                                label="Fourth Ability" value={this.state.hero.ability_four} onChange={(event)=>this.handleChange(event, 'ability_four')}/>
                                <TextField multiline fullWidth rows={4} variant="outlined" margin="dense"
                                label="Ultimate Ability" value={this.state.hero.ability_ult} onChange={(event)=>this.handleChange(event, 'ability_ult')}/>
                                <IconButton onClick={()=>this.props.history.push('/heroes')}><KeyboardBackspaceIcon fontSize="large"></KeyboardBackspaceIcon></IconButton>
                                <IconButton onClick={this.updateHero}><SaveIcon fontSize="large"></SaveIcon></IconButton>
                            </form>
                        </>)
                    }
                </Card>
            </>
        )
    }
}

export default connect(mapStoreToProps)(withStyles(styles)(IndividualHero))