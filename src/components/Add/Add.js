import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
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
        isFlipped: false,
        newHero: {
            name: '',
            role: '',
            image: '',
            ability_one: '',
            ability_two: '',
            ability_three: '',
            ability_four: '',
            ability_ult: ''
        },
        newMap: {
            name: '',
            type: '',
            image: '',
            description: ''
        }
    };

    // handles change for entering hero information
    handleChange = (event, property) => {
        this.setState({
            ...this.state,
            newHero: {
                ...this.state.newHero,
                [property]: event.target.value
            }
        })
    };

    // flips card back over and resets set
    resetForm = () => {
        this.setState({
            ...this.state,
            isFlipped: false,
            newHero: {
                name: '',
                role: '',
                image: '',
                ability_one: '',
                ability_two: '',
                ability_three: '',
                ability_four: '',
                ability_ult: ''
            }
        })
    }

    // sends new hero information
    addHero = (event) => {
        event.preventDefault();
        console.log(this.state.newHero);
        axios.post('/api/hero/add', this.state.newHero)
        .then(response => {
            console.log('ADDED HERO TO DB');
            this.resetForm();
        }).catch(error => {
            console.log('error in POST', error)
        })
    }
    render(){
        return(
            <ReactCardFlip isFlipped={this.state.isFlipped} flipSpeedFrontToBack={1.0}
            flipSpeedBackToFront={1.0}>
                <Card variant='outlined'>
        
                    <CardActionArea onClick={()=>this.setState({...this.state, isHero:true, isFlipped:true})}>
                        <h2>Add Hero</h2>
                        <CardMedia style={{height: 150, width: 100}} />
                    </CardActionArea>
                    <CardActionArea onClick={()=>this.setState({...this.state, isHero:false, isFlipped:true})}>
                        <h2>Add Map</h2>
                        <CardMedia style={{height: 150, width: 100}} />
                    </CardActionArea>
                </Card>

                {this.state.isHero ? (
                    <Card>
                        <form onSubmit={this.addHero}>
                            <div className="heroForm">
                                <TextField margin="dense" label="Hero Name" value={this.state.newHero.name} onChange={(event)=>this.handleChange(event, 'name')}/>
                                <RadioGroup row id="heroRole" onChange={(event)=>this.handleChange(event, 'role')}>
                                    <FormControlLabel value="Tank" control={<Radio />} label="Tank" />
                                    <FormControlLabel value="DPS" control={<Radio />} label="DPS" />
                                    <FormControlLabel value="Support" control={<Radio />} label="Support" />
                                </RadioGroup>
                                <TextField margin="dense" label="Hero Image" value={this.state.newHero.image} onChange={(event)=>this.handleChange(event, 'image')}/>
                            </div>
                            <TextField margin="dense" variant="outlined" rows={4} fullWidth multiline 
                            label="First Ability" value={this.state.newHero.ability_one} onChange={(event)=>this.handleChange(event, 'ability_one')}/>
                            <TextField margin="dense" variant="outlined" rows={4} fullWidth multiline
                            label="Second Ability" value={this.state.newHero.ability_two} onChange={(event)=>this.handleChange(event, 'ability_two')}/>
                            <TextField margin="dense" variant="outlined" rows={4} fullWidth multiline
                            label="Third Ability" value={this.state.newHero.ability_three} onChange={(event)=>this.handleChange(event, 'ability_three')}/>
                            <TextField margin="dense" variant="outlined" rows={4} fullWidth multiline
                            label="Fourth Ability" value={this.state.newHero.ability_four} onChange={(event)=>this.handleChange(event, 'ability_four')} />
                            <TextField margin="dense" variant="outlined" rows={4} fullWidth multiline
                            label="Ultimate Ability" value={this.state.newHero.ability_ult} onChange={(event)=>this.handleChange(event, 'ability_ult')}/>
                            <IconButton onClick={this.resetForm}><ArrowBackTwoToneIcon fontSize="large"></ArrowBackTwoToneIcon></IconButton>
                            <IconButton type="submit"><AddSharpIcon fontSize="large"></AddSharpIcon></IconButton>
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

export default connect()(Add);