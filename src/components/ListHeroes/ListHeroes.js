import React, {Component} from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {withStyles} from '@material-ui/core/styles';
import {Grid, Card, CardHeader, FormControl, NativeSelect, FormHelperText, IconButton} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info'

const styles = theme => ({
    card: {
        margin: 8,
        textAlign: 'center'
    },
    img: {
        height: 100,
        width: 100,
        borderRadius: '50%'
    },
    title: {
        margin: 5
    },
})

class ListHeroes extends Component{
    componentDidMount(){
        this.setState({
            heroRole: 'All'
        });
        this.props.dispatch({type:"FETCH_HEROES"});
    };

    state = {
        heroRole: 'All'
    };

    handleRoleSearch = (event) => {
        console.log(event.target.value)
    };
    
    // sends individual hero to reducer
    viewHero = (hero) => {
        console.log(hero);
        this.props.history.push(`/heroes/${hero.id}`);
    }
    render(){
        const {classes} = this.props;

        return(
            <>
                <div className={classes.title}>
                    <h1>Overwatch Heroes</h1>
                <FormControl onChange={this.handleRoleSearch}>
                    <NativeSelect defaultValue='All'>
                        <option value='All'>All</option>
                        <option value='Tank'>Tank</option>
                        <option value='DPS'>DPS</option>
                        <option value='Support'>Support</option>
                    </NativeSelect>
                    <FormHelperText>View Heroes by Role</FormHelperText>
                </FormControl>
                <br/>
                </div>
                <Grid container spacing={1}>
                    {this.props.store.heroes.map(hero => (
                        <Grid item xs={3} key={hero.id}>
                            <Card className={classes.card}>
                                <CardHeader title={hero.name} subheader={hero.role} />
                                <img className={classes.img} src={hero.image} alt={hero.name} />
                                <IconButton onClick={()=>this.viewHero(hero)}><InfoIcon></InfoIcon></IconButton>
                            </Card>
                        </Grid>   
                    ))}
                </Grid>
            </>
        )
    }
}

export default connect(mapStoreToProps)(withStyles(styles)(ListHeroes));