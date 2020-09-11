import React, {Component} from 'react';
import {connect} from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class IndividualMap extends Component{
    componentDidMount(){
        let id = this.props.match.params.id;
        this.props.dispatch({type: "GET_IND_MAP", payload: id})
    }
    render(){
        return (
            <>
            </>
        )
    }
}

export default connect(mapStoreToProps)(IndividualMap);