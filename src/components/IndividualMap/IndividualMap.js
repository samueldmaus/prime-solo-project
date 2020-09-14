import React, {Component} from 'react';
import {connect} from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import axios from 'axios';
import {Card, CardHeader, TextField, Grid, Typography, IconButton, RadioGroup, Radio, FormControlLabel} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save'

const styles = theme => ({
    card: {
        margin: 15
    },
    image: {
        margin: 10,
        height: 500,
        width: 900,
        borderRadius: '5%',
        align: 'left'
    },
    info: {
        align: 'right',
        margin: 10,
        
    },
    header: {
        backgroundColor: '#f99e1a',
    },
    title: {
        color: '#f99e1a'
    }
});

class IndividualMap extends Component{
    componentDidMount(){
        let id = this.props.match.params.id;
        this.props.dispatch({type: "GET_IND_MAP", payload: id})
    }

    state = {
        editIconOn: true,
        map: {
            name: '',
            type: '',
            image: '',
            description: ''
        }
    };

    // delete the individual map
    deleteMap = (map) => {
        axios.delete(`/api/map/${map.id}`)
        .then(response => {
            this.props.history.push('/maps')
        }).catch(error => {
            console.log('error in MAP DELETE:', error)
        })
    };

    // switch the view to edit mode & set the state to the map information
    editMode = () => {
        this.setState({
            editIconOn: false,
            map: {
                name: this.props.store.individualMap[0].name,
                type: this.props.store.individualMap[0].type,
                image: this.props.store.individualMap[0].image,
                description: this.props.store.individualMap[0].description
            }
        })
    };

    // handle change for updating the map information
    handleChange = (event, property) => {
        this.setState({
            ...this.state,
            map: {
                ...this.state.map,
                [property]: event.target.value
            }
        })
    };

    updateMap = (event) => {
        event.preventDefault();
        let id = this.props.match.params.id;
        axios.put(`/api/map/${id}`, this.state.map)
        .then(response => {
            this.setState({
                editIconOn: true,
                ...this.state.map
            })
            let id = this.props.match.params.id;
            this.props.dispatch({type: "GET_IND_MAP", payload: id})
        }).catch(error => {
            console.log('error in INDIVIDUAL MAP PUT:', error)
        })
    };

    favoriteMap = (map) => {
        let userId = this.props.store.user.id;
        let mapId = map.id;
        axios.put(`/api/favmap/${mapId}/${userId}`)
    }

    render(){
        const {classes} = this.props;
        let map = this.props.store.individualMap[0]
        return (
            <>
                <Card className={classes.card}>
                    {map && 
                        this.state.editIconOn ? (
                            <>
                                <CardHeader className={classes.header} title={map.name} subheader={map.type} />
                                <Grid container>
                                    <Grid item xs={6}>
                                        <img className={classes.image} src={map.image} alt={map.name} />
                                        <div className={classes.info}>
                                            <Typography className={classes.title} variant="h5">DESCRIPTION</Typography>
                                            <p>{map.description}</p>
                                        </div>
                                    </Grid>
                                </Grid>
                                <IconButton onClick={()=>this.props.history.push('/maps')}><KeyboardBackspaceIcon fontSize="large"></KeyboardBackspaceIcon></IconButton>
                                {this.props.store.user.isAdmin ? (
                                    <>
                                        <IconButton onClick={()=>this.deleteMap(map)}><DeleteIcon fontSize="large"></DeleteIcon></IconButton>
                                        <IconButton onClick={this.editMode}><EditIcon fontSize="large"></EditIcon></IconButton>
                                    </>
                                ) : (
                                    <IconButton onClick={()=>this.favoriteMap(map)}><FavoriteIcon fontSize="large"></FavoriteIcon></IconButton>
                                )}
                            </>
                        ) : (
                            map &&
                                <form className={classes.info}>
                                    <TextField margin="dense" label="Map Name" value={this.state.map.name} onChange={(event)=>this.handleChange(event, 'name')}/>
                                    <RadioGroup row id="mapTypeRadio" value={this.state.map.type} onChange={(event)=>this.handleChange(event, 'type')}>
                                        <FormControlLabel value="Assault" control={<Radio />} label="Assault" />
                                        <FormControlLabel value="Control" control={<Radio />} label="Control" />
                                        <FormControlLabel value="Escort" control={<Radio />} label="Escort" />
                                        <FormControlLabel value="Hybrid" control={<Radio />} label="Hybrid" />
                                    </RadioGroup>
                                    <TextField margin="dense" label="Map Image" value={this.state.map.image} onChange={(event)=>this.handleChange(event, 'image')}/>
                                    <TextField multiline fullWidth rows={4} margin="dense" variant="outlined"
                                    label="Map Description" value={this.state.map.description} onChange={(event)=>this.handleChange(event, 'description')}/>
                                    <IconButton onClick={()=>this.props.history.push('/maps')}><KeyboardBackspaceIcon fontSize="large"></KeyboardBackspaceIcon></IconButton>
                                    <IconButton type="submit" onClick={this.updateMap}><SaveIcon fontSize="large"></SaveIcon></IconButton>
                                </form>
                        )}
                </Card>
            </>
        )
    }
}

export default connect(mapStoreToProps)(withStyles(styles)(IndividualMap));