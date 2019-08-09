import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import {Link} from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../../PublicCss/CenterMain.css';

// import Bene1 from '../../../images/bene/image1.jpeg';
// import Bene2 from '../../../images/bene/image2.jpeg';
// import Bene3 from '../../../images/bene/image3.jpeg';

import Bene1 from '../../../images/man/chairman1.jpeg';
import Bene2 from '../../../images/man/chairman2.jpeg';
import Bene3 from '../../../images/man/chairman3.jpeg';


class Header extends React.Component{
    render(){
        return(
            <div id="carouselExampleInterval" className="carousel slide carousel-fade" data-ride="carousel">
                {/* <div class="carousel-inner MainPageContainer"> */}
                <div className="carousel-inner">
                    <div className="carousel-item active" data-interval="2000">
                        <img src={Bene1} className="d-block w-100 CarouselHeight" alt="Bene1"/>
                    </div>
                    <div className="carousel-item" data-interval="2000">
                        <img src={Bene2} className="d-block w-100 CarouselHeight" alt="Bene2"/>
                    </div>
                    <div className="carousel-item" data-interval="2000">
                        <img src={Bene3} className="d-block w-100 CarouselHeight" alt="Bene3"/>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleInterval" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleInterval" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        );
    }
}

class Body extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            univ: this.props.univ,
            univ_post:"",
        }
    }

    componentDidMount(){
        this.callApi()
            .then(res => this.setState({univ_post: res}))
            .catch(err => console.log(err))
    }

    callApi = async() => {
        const response = await fetch('/api/univ_post/u/'+this.state.univ.univ_id);
        const body = await response.json();
        return body;
    }

    render(){
        return(
            <div>
                <Link className="btn btn-light btn-block univ_text_color" to={"/univ/"+this.state.univ.univ_id}>{this.state.univ.univ_title}</Link>
                <Divider/>
                {this.state.univ_post?this.state.univ_post.map((row,index)=>{
                    if(index<5){
                        let createTime = new Date(row.post_created);
                        let currentTime = new Date();
                        return(
                            <div key={row.post_id}>
                                <Link className="btn btn-light btn-block post_list clearfix" to={"/univ/"+row.univ_id}>
                                    {/* <img src={Bene1} width="64" height="64" className="float-left pr-2"/> 보류 아이템*/} 
                                    <span className="post_overflow">
                                        {row.post_desc}
                                    </span>
                                    {/* <span className="float-left small text-muted">조회수:[{row.post_view_count}] 댓글:[{row.post_comment_count}]</span> */}
                                    <span className="float-right small text-muted"><time>{this.props.calcTime(currentTime,createTime)}</time></span>
                                </Link>
                                <Divider/>
                            </div>
                        );
                    }
                }):<CircularProgress/>}
            </div>
        );
    }
}

class CenterMain extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            univ:"",
        }
    }

    componentDidMount(){
        this.callApi()
            .then(res => this.setState({univ: res}))
            .catch(err => console.log(err));
            // console.log(this.state.univ);
    }

    callApi = async() => {
        const response = await fetch('/api/univ');
        const body = await response.json();
        return body;
    }

    render(){
        return(
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Header/>
                </Grid>
                {this.state.univ?this.state.univ.map((row)=>{
                    return(
                        <Grid item xs={12} sm={6} key={row.univ_id}>
                            <Paper><Body univ={row} calcTime={this.props.calcTime}/></Paper>
                        </Grid>
                    );
                }):
                <Grid item xs={12} sm={12} className="text-center">
                    <CircularProgress/>
                </Grid>
                }
            </Grid>
        );
    }
}

export default CenterMain;