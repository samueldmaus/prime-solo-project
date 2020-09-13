import React, {Component} from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class MyAccount extends Component{
  componentDidMount(){
    this.props.dispatch({type: "FETCH_HERO_FAVORITES", payload: this.props.store.user.id})
  }
  render(){
    return(
      <>
      </>
    )
  }
}


export default connect(mapStoreToProps)(MyAccount);
