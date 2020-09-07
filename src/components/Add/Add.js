import React, {Component} from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import ReactCardFlip from 'react-card-flip'


class Add extends Component{
    state = {
        isFlipped: false
    }
    render(){
        return(
            <ReactCardFlip isFlipped={this.state.isFlipped}>
                <Card variant='outlined'>
        
                    <CardActionArea>
                        <h2>Add Hero</h2>
                        <CardMedia style={{height: 150, width: 100}} />
                    </CardActionArea>
                    <CardActionArea>
                        <h2>Add Map</h2>
                        <CardMedia style={{height: 150, width: 100}} />
                        <button onClick={()=>this.setState({isFlipped: !this.state.isFlipped})}>Click</button>
                    </CardActionArea>
                </Card>

                <Card>
                    <h2>Card is flipped</h2>
                    <button onClick={()=>this.setState({isFlipped: !this.state.isFlipped})}>Click</button>
                </Card>
            </ReactCardFlip>
        )
    }
}

export default Add;