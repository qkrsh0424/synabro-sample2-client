import React from 'react';
import Grid from '@material-ui/core/Grid';

//Component
import CardList from './RightMain/CardList';

class RightMain extends React.Component {
    render(){
        // const { classes } = this.props;
        return (
            // <Grid container spacing={2}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <CardList/>
                </Grid>
                <Grid item xs={12}>
                    <CardList/>
                </Grid>
            </Grid>
        );
    }
}

export default RightMain;