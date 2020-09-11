import React, {Component} from 'react';
import {connect} from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {Card, CardHeader} from '@material-ui/core';

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
        let map = this.props.store.individualMap[0]
        return (
            <>
                <Card>
                    
                </Card>
            </>
        )
    }
}

export default connect(mapStoreToProps)(IndividualMap);