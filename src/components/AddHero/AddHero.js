import React, {Component} from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class AddHero extends Component{
    render(){
        return(
            <h1>Add Hero</h1>
        )
    }
}

export default AddHero;