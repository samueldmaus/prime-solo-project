import React, {Component} from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {withStyles} from '@material-ui/core/styles';

class MapList extends Component{
    componentDidMount(){
        this.props.dispatch({type: "FETCH_MAPS"})
    }
    render(){
        return (

        )
    }
}

export default connect(mapStoreToProps)(withStyles(styles)(MapList))