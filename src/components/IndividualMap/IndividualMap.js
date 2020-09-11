import React, {Component} from 'react';
import {connect} from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {Card, CardHeader, TextField, Grid, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
    card: {
        margin: 15
    },
    image: {
        margin: 10,
        height: 500,
        width: 900,
        borderRadius: '5%'
    },
    info: {
        align: 'right',
        margin: 10,
    },
})
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
                                <CardHeader title={map.name} subheader={map.type} />
                                <Grid container>
                                    <Grid item xs={6}>
                                        <img className={classes.image} src={map.image} alt={map.name} />
                                        <div className={classes.info}>
                                            <Typography>DESCRIPTION</Typography>
                                            <p>{map.description}</p>
                                        </div>
                                    </Grid>
                                </Grid>
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