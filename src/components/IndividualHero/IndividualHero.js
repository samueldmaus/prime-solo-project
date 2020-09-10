import React, {Component} from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {withStyles} from '@material-ui/core/styles';
import {Card, CardHeader, Grid, IconButton, Typography, TextField, RadioGroup, FormControlLabel, Radio} from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';

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
        editIconOn: true
    };

    editMode = () => {
        this.setState({
            editIconOn: !this.state.editIconOn,
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
                                <TextField margin="dense" label="Hero Name" value={this.props.store.individualHero[0].name} />
                                <RadioGroup row id="heroRoleRadio" value={this.props.store.individualHero[0].role}>
                                        <FormControlLabel selected value="Tank" control={<Radio />} label="Tank" />
                                        <FormControlLabel value="DPS" control={<Radio />} label="DPS" />
                                        <FormControlLabel value="Support" control={<Radio />} label="Support" />
                                </RadioGroup>
                                <TextField margin="dense" label="Hero Image" value={this.props.store.individualHero[0].image} />
                                <TextField multiline fullWidth rows={4} variant="outlined" margin="dense"
                                label="First Ability" value={this.props.store.individualHero[0].ability_one}/>
                                <TextField multiline fullWidth rows={4} variant="outlined" margin="dense"
                                label="Second Ability" value={this.props.store.individualHero[0].ability_two}/>
                                <TextField multiline fullWidth rows={4} variant="outlined" margin="dense"
                                label="Third Ability" value={this.props.store.individualHero[0].ability_three}/>
                                <TextField multiline fullWidth rows={4} variant="outlined" margin="dense"
                                label="Fourth Ability" value={this.props.store.individualHero[0].ability_four}/>
                                <TextField multiline fullWidth rows={4} variant="outlined" margin="dense"
                                label="Ultimate Ability" value={this.props.store.individualHero[0].ability_ult}/>
                                <IconButton onClick={()=>this.props.history.push('/heroes')}><KeyboardBackspaceIcon fontSize="large"></KeyboardBackspaceIcon></IconButton>
                                <IconButton onClick={this.editMode}><SaveIcon fontSize="large"></SaveIcon></IconButton>
                            </form>
                        </>)
                    }
                </Card>
            </>
        )
    }
}

export default connect(mapStoreToProps)(withStyles(styles)(IndividualHero))