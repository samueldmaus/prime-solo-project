import React, {Component} from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {withStyles} from '@material-ui/core/styles';
import {Card, CardHeader, Grid, IconButton, Typography, TextField, RadioGroup, FormControlLabel, Radio, Avatar} from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import axios from 'axios';

const styles = theme => ({
    card: {
        margin: 15
    },
    image: {
        margin: 10,
        float: 'left',
        height: 550,
        width: 550,
        borderRadius: '5%'
    },
    info: {
        align: 'right',
        margin: 10,

    },
    header: {
        backgroundImage: 'linear-gradient(to left, rgba(255,0,0,0), rgba(250, 156,29))',
    },
    title: {
        color: '#f99e1a'
    }
});

class IndividualHero extends Component{
    componentDidMount(){
        let id = this.props.match.params.id;
        this.props.dispatch({type: "GET_IND_HERO", payload: id});
        this.props.dispatch({type: "FETCH_HERO_FAVORITES"});
    }

    state = {
        editIconOn: true,
        hero: {
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

    // switches the view to edit mode and set the hero information to state
    editMode = () => {
        this.setState({
            editIconOn: !this.state.editIconOn,
            hero: {
                name: this.props.store.individualHero.name,
                role: this.props.store.individualHero.role,
                image: this.props.store.individualHero.image,
                ability_one: this.props.store.individualHero.ability_one,
                ability_two: this.props.store.individualHero.ability_two,
                ability_three: this.props.store.individualHero.ability_three,
                ability_four: this.props.store.individualHero.ability_four,
                ability_ult: this.props.store.individualHero.ability_ult
            }
        })
    };

    // handle changes to hero information on edit side of card 
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
    updateHero = (event) => {
        event.preventDefault();
        let id = this.props.match.params.id;
        console.log(this.state.hero)
        axios.put(`/api/hero/${id}`, this.state.hero)
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
    };

    //delete hero from the db
    deleteHero = (hero) => {
       axios.delete(`/api/hero/${hero.id}`)
       .then(response => {
           this.props.history.push('/heroes')
       }).catch(error => {
           console.log('error in HERO DELETE', error)
       })
    };

    //favorite hero for the logged in user
    favoriteHero = (hero) => {
        this.props.dispatch({type:"SAVE_FAV_HERO", payload: hero.id});
    };

    //remove hero from user's favorites
    removeHeroFavorite = (hero) => {
        this.props.dispatch({type: "DELETE_FAV_HERO", payload: hero.id})
    }


    render(){
        const {classes} = this.props;
        let hero = this.props.store.individualHero;
        let isFavorite = false
        for(let i = 0; i < this.props.store.favHeroes.length; i++){
            if(hero.id === this.props.store.favHeroes[i].id){
                isFavorite = true
            }
        }
        return(
            <>
                <Card className={classes.card}>
                    {hero && 
                        this.state.editIconOn ? 
                        (<>
                            <CardHeader className={classes.header} title={hero.name} subheader={hero.role}/>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Avatar className={classes.image} src={hero.image} alt={hero.name}/>
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
                            <IconButton onLoad={()=>this.isHeroFavorited()} onClick={()=>this.props.history.push('/heroes')}><KeyboardBackspaceIcon fontSize="large"></KeyboardBackspaceIcon></IconButton>
                            {this.props.store.user.isAdmin ? (
                                <>
                                    <IconButton onClick={()=>this.deleteHero(hero)}><DeleteIcon fontSize="large"></DeleteIcon></IconButton>
                                    <IconButton onClick={this.editMode}><EditIcon fontSize="large"></EditIcon></IconButton>
                                </>
                            ) : ( isFavorite ? (
                                <IconButton color="secondary" onClick={()=>this.removeHeroFavorite(hero)}><FavoriteIcon fontSize="large"></FavoriteIcon></IconButton>
                            ) : (
                                <IconButton onClick={()=>this.favoriteHero(hero)}><FavoriteIcon fontSize="large"></FavoriteIcon></IconButton>
                            )

                            )}
                            
                        </>) :
                        (hero && <>
                            <form className={classes.info}>
                                <TextField margin="dense" label="Hero Name" value={this.state.hero.name} onChange={(event)=>this.handleChange(event, 'name')} />
                                <RadioGroup row id="heroRoleRadio" value={this.state.hero.role} onChange={(event)=>this.handleChange(event, 'role')}>
                                        <FormControlLabel value="Tank" control={<Radio />} label="Tank" />
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
                                <IconButton type="submit" onClick={this.updateHero}><SaveIcon fontSize="large"></SaveIcon></IconButton>
                            </form>
                        </>)
                    }
                </Card>
            </>
        )
    }
}

export default connect(mapStoreToProps)(withStyles(styles)(IndividualHero))