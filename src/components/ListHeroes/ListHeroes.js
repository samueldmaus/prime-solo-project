import React, {Component} from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {Grid} from '@material-ui/core'


class ListHeroes extends Component{
    componentDidMount(){
        this.props.dispatch({type:"FETCH_HEROES"})
    }
    render(){
        return(
            <div>
                {this.props.store.heroes.map(hero => (
                    <p>{hero.name}</p>
                ))}
            </div>
        )
    }
}

export default connect(mapStoreToProps)(ListHeroes);