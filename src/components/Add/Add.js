import React, {Component} from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import ReactCardFlip from 'react-card-flip';
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import AddSharpIcon from '@material-ui/icons/AddSharp';
import ArrowBackTwoToneIcon from '@material-ui/icons/ArrowBackTwoTone'


class Add extends Component{
    state = {
        isHero: true,
        isFlipped: false
    }
    render(){
        return(
            <ReactCardFlip isFlipped={this.state.isFlipped} flipSpeedFrontToBack={1.0}
            flipSpeedBackToFront={1.0}>
                <Card variant='outlined'>
        
                    <CardActionArea onClick={()=>this.setState({isHero:true, isFlipped:true})}>
                        <h2>Add Hero</h2>
                        <CardMedia style={{height: 150, width: 100}} />
                    </CardActionArea>
                    <CardActionArea onClick={()=>this.setState({isHero:false, isFlipped:true})}>
                        <h2>Add Map</h2>
                        <CardMedia style={{height: 150, width: 100}} />
                    </CardActionArea>
                </Card>

                {this.state.isHero ? (
                    <Card>
                        <form>
                            <div className="heroForm">
                                <TextField margin="dense" required label="Hero Name" />
                                <RadioGroup row id="heroRole">
                                    <FormControlLabel value="Tank" control={<Radio />} label="Tank" />
                                    <FormControlLabel value="DPS" control={<Radio />} label="DPS" />
                                    <FormControlLabel value="Support" control={<Radio />} label="Support" />
                                </RadioGroup>
                                <TextField margin="dense" required label="Hero Image" />
                            </div>
                            <TextField margin="dense" required variant="outlined" rows={4} fullWidth multiline label="First Ability" />
                            <TextField margin="dense" variant="outlined" rows={4} fullWidth multiline label="Second Ability" />
                            <TextField margin="dense" variant="outlined" rows={4} fullWidth multiline label="Third Ability" />
                            <TextField margin="dense" variant="outlined" rows={4} fullWidth multiline label="Fourth Ability" />
                            <TextField margin="dense" required variant="outlined" rows={4} fullWidth multiline label="Ultimate Ability" />
                            <IconButton type="submit" ><ArrowBackTwoToneIcon fontSize="large"></ArrowBackTwoToneIcon></IconButton>
                            <IconButton><AddSharpIcon fontSize="large"></AddSharpIcon></IconButton>
                        </form>
                    </Card>
                ) : (
                    <Card>
                        <TextField fullWidth label="Map Name" />
                    </Card>
                )}
                
            </ReactCardFlip>
        )
    }
}

export default Add;