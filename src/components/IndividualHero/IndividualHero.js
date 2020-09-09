import React, {Component} from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {withStyles} from '@material-ui/core/styles';

class IndividualHero extends Component{
    render(){
        return(
            JSON.stringify(this.props.store.individualHero)
        )
    }
}

export default connect(mapStoreToProps)(IndividualHero)