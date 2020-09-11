import React, {Component} from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {withStyles} from '@material-ui/core/styles';
import {FormControl, NativeSelect, FormHelperText, Grid, Card, CardHeader, IconButton} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info'

const styles = theme => ({
    title: {
        margin: 5
    },
    card: {
        margin: 8,
        textAlign: 'left'
    },
    image: {
        width: 210,
        height: 120,
        borderRadius: '10%',
        margin: 5
    },
    imageDiv: {
        textAlign: 'center'
    },
    info: {
        float: 'right'
    }
})

class ListMaps extends Component{
    componentDidMount(){
        this.props.dispatch({type: "FETCH_MAPS"})
    }

    // function to view individual map
    viewMap = (map) => {
        console.log(map);
        this.props.history.push(`/maps/${map.id}`)
    }

    render(){
        const {classes} = this.props;
        return (
            <>
                <div className={classes.title}>
                    <h1>Overwatch Maps</h1>
                    <FormControl onChange={this.handleRoleSearch}>
                        <NativeSelect defaultValue='All'>
                            <option value='All'>All</option>
                            <option value='Assault'>Assault</option>
                            <option value='Control'>Control</option>
                            <option value='Escort'>Escort</option>
                            <option value='Hybrid'>Hybrid</option>
                        </NativeSelect>
                        <FormHelperText>View Maps by Type</FormHelperText>
                    </FormControl>
                </div>
                <Grid container spacing={1}>
                    {this.props.store.maps.map(map => (
                        <Grid item xs={3} key={map.id}>
                        <Card className={classes.card}>
                            <CardHeader title={map.name} subheader={map.type} />
                            <div className={classes.imageDiv}>
                            <img className={classes.image} src={map.image} alt={map.name} />
                            </div>
                            <IconButton className={classes.info} onClick={()=>this.viewMap(map)}><InfoIcon></InfoIcon></IconButton>
                        </Card>
                    </Grid>  
                    ))}

                </Grid>
            </>
        )
    }
}

export default connect(mapStoreToProps)(withStyles(styles)(ListMaps))