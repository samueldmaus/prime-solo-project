import React, {Component} from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {withStyles} from '@material-ui/core/styles';
import {FormControl, NativeSelect, FormHelperText, Grid, Card, CardHeader, IconButton, TextField} from '@material-ui/core';
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
    },
    searchDiv: {
        display: 'inline-block',
        margin: 10
    },
    searchText: {
        marginLeft: 40,
        width: 300
    },
    formSearch: {
        width: 200
    }
})

class ListMaps extends Component{
    componentDidMount(){
        this.props.dispatch({type: "FETCH_MAPS", payload: document.getElementById('typeSelect').value})
    }

    // function to view individual map
    viewMap = (map) => {
        console.log(map);
        this.props.history.push(`/maps/${map.id}`)
    };

    handleTypeSelectChange = () => {
        this.props.dispatch({type: "FETCH_MAPS", payload: document.getElementById('typeSelect').value})
    }

    searchForMap = () => {
        let name = document.getElementById('searchMapInput').value;
        if(name !== ''){
            this.props.dispatch({type: "FETCH_MAPS_NAME", payload: name})
        }else {
            this.props.dispatch({type: "FETCH_MAPS", payload: document.getElementById('typeSelect').value})
        }
    }
    render(){
        const {classes} = this.props;
        return (
            <>
                <div className={classes.title}>
                    <h1>Overwatch Maps</h1>
                    <div className={classes.searchDiv}>
                        <FormControl className={classes.formSearch}>
                            <NativeSelect id="typeSelect" onChange={this.handleTypeSelectChange} >
                                <option value='All'>All</option>
                                <option value='Assault'>Assault</option>
                                <option value='Control'>Control</option>
                                <option value='Escort'>Escort</option>
                                <option value='Hybrid'>Hybrid</option>
                            </NativeSelect>
                            <FormHelperText>View Maps by Type</FormHelperText>
                        </FormControl>
                        <TextField id='searchMapInput' onChange={this.searchForMap}className={classes.searchText} variant='outlined' label='Search by Map Name'/>
                    </div>
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