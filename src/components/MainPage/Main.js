import React from 'react';
import '../PublicCss/Main.css';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

//Component
import CenterMain from './Layout/CenterMain';
import RightMain from './Layout/RightMain';

export default class Main extends React.Component{
    componentDidMount(){
        document.documentElement.scrollTop=document.body.scrollTop=0;
    }
    calculateTime(date1,date2){
        var Time1 = date1.getTime();
        var Time2 = date2.getTime();
        var calTime = (Time1-Time2)/(1000*60);
        var resultTime = Math.round(calTime) + "분 전";
        if(calTime>=60 && calTime<1440){
            calTime = (Time1-Time2)/(1000*60*60);
            resultTime = Math.round(calTime) + "시간 전";
        }
        else if(calTime>=1440 && calTime<(1440*30)){
            calTime = (Time1-Time2)/(1000*60*60*24);
            resultTime = Math.round(calTime) + "일 전";
        }
        else if(calTime>=(1440*30) && calTime<(1440*30*12)){
            calTime = (Time1-Time2)/(1000*60*60*24*30);
            resultTime = Math.round(calTime) + "개월 전";
        }
        else if(calTime>=(1440*30*12)){
            calTime = (Time1-Time2)/(1000*60*60*24*30*12);
            resultTime = Math.round(calTime) + "년 전";
        }
        
        return resultTime;
    }

    render(){    
        return(
            <div className="main_container">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                        <Paper>hi</Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <CenterMain calcTime={this.calculateTime}/>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <RightMain/>
                    </Grid>
                </Grid>
            </div>
        );
    }    
}