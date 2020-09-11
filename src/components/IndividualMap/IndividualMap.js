import React, {Component} from 'react';
import {connect} from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import axios from 'axios';
import {Card, CardHeader, TextField, Grid, Typography, IconButton} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';

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

    deleteMap = (map) => {
        axios.delete(`/api/map/${map.id}`)
        .then(response => {
            this.props.history.push('/maps')
        }).catch(error => {
            console.log('error in MAP DELETE:', error)
        })
    };

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
                                        <IconButton><EditIcon fontSize="large"></EditIcon></IconButton>
                                    </>
                                ) : (
                                    <IconButton><FavoriteIcon fontSize="large"></FavoriteIcon></IconButton>
                                )}
                            </>
                        ) : (
                            <TextField />
                        )}
                </Card>
            </>
        )
    }
}

export default connect(mapStoreToProps)(withStyles(styles)(IndividualMap));