import React, {Component} from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {withStyles} from '@material-ui/core/styles';
import {Card, CardHeader, Grid, IconButton} from '@material-ui/core'

const styles = theme => ({
    card: {
        margin: 15
    },
    image: {
        margin: 10,
        float: 'left'
    },
    info: {
        float: 'right'
    },
    header: {
        backgroundColor: '#f99e1a'
    }
})
class IndividualHero extends Component{
    componentDidMount(){
        console.log(this.props.store.individualHero, this.props.match.params.id);
        if(this.props.store.individualHero === {}){
            console.log('TRUE')
            this.props.dispatch({type: "GET_IND_HERO", payload: this.props.match.paras.id})
        }
    };

    render(){
        let hero = this.props.store.individualHero;
        const {classes} = this.props;
        return(
            <Card className={classes.card}>
                <CardHeader className={classes.header} title={hero.name} subheader={hero.role}/>
                    <Grid container>
                    <Grid item xs={12}>
                        <img className={classes.image} src={hero.image} alt={hero.name}/>
                        <div className={classes.info}>
                            <h4>{hero.ability_one}</h4>
                            <h4>{hero.ability_two}</h4>
                            <h4>{hero.ability_three}</h4>
                            <h4>{hero.ability_four}</h4>
                            <h4>ULTIMATE: {hero.ability_ult}</h4>
                        </div>
                    </Grid>
                    </Grid>
            </Card>
        )
    }
}

export default connect(mapStoreToProps)(withStyles(styles)(IndividualHero))