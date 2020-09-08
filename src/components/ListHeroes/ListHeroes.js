import React, {Component} from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {withStyles} from '@material-ui/core/styles';
import {Grid, Card, CardHeader, } from '@material-ui/core'

const styles = theme=> ({
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
    }
})

class ListHeroes extends Component{

    componentDidMount(){
        this.props.dispatch({type:"FETCH_HEROES"});
    }
    render(){
        const {classes} = this.props;

        return(
            <>
                <div>
                    <h1 className={classes.title}>Overwatch Heroes</h1>
                    <br/>
                
                </div>
                <Grid container spacing={1}>
                    {this.props.store.heroes.map(hero => (
                        <Grid item xs={3} key={hero.id}>
                            <Card className={classes.card}>
                                <CardHeader title={hero.name} subheader={hero.role} />
                                <img className={classes.img} src={hero.image} alt={hero.name} />
                            </Card>
                        </Grid>   
                    ))}
                </Grid>
            </>
        )
    }
}

export default connect(mapStoreToProps)(withStyles(styles)(ListHeroes));