import React from 'react';
import '../PublicCss/UnivHome.css';
import '../PublicCss/SlideAnimation.css';
import Axios from 'axios';

import {Link} from '../../UiCore';

import {PostPreview} from '../../ComponentList';

class UnivHome extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            univ_id: this.props.univ_id,
            bene_big:"",
        }

        this._callLoadBeneBig = this._callLoadBeneBig.bind(this);
    }
    componentDidMount(){
        this._callLoadBeneBig()
        .then(res => this.setState({bene_big: res}))
        .catch(err => console.log(err)) 
    }

    _callLoadBeneBig(){
        let univ_item_address = this.props.board_type;
        let bene_type = 'big';
        if(univ_item_address===undefined){
            univ_item_address = 10000;  //address 10000은 항상 서브 페이지의 홈을 의미함.
        }

        const url = '/univ_bene/'+this.props.univ_id+'/boardType/'+univ_item_address+'/beneType/'+bene_type;
        return Axios.get(url)
        .then((response)=>{
            return response.data;
        });
    }
    callApiBeneBig = async() => {
        
        // const response = await fetch('/api/beneBig/'+univ_item_address+'/'+this.state.univ_id);
        // const response = await fetch('/univ_bene/'+this.props.univ_id+'/boardType/'+univ_item_address+'/beneType/'+bene_type);
        // const body = await response.json();
        // return body;
    }
    render(){
        return(
            <div>
                <div className="container">
                    <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                        {this.state.bene_big?this.state.bene_big.map((row,index)=>{
                            if(index===0){
                                return(
                                    <div key={index} className="carousel-item active" data-interval="2000">
                                        <img src={row.bene_image} className="d-block bene_Big_Size" alt="..."/>
                                    </div>
                                );
                            }else{
                                return(
                                    <div key={index} className="carousel-item" data-interval="2000">
                                        <img src={row.bene_image} className="d-block bene_Big_Size" alt="..."/>
                                    </div>
                                );
                            }
                        }):<div className="carousel-item" data-interval="2000">
                                hihi
                            </div>}
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                    <hr/>
                    <HomeNoticeArea 
                        univ_id = {this.props.univ_id}
                        board_type={10002}
                    />
                    <div className="row mb-2">
                        <div className="col-md-6">
                        <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            <div className="col p-4 d-flex flex-column position-static">
                            <strong className="d-inline-block mb-2 text-primary">World</strong>
                            <h3 className="mb-0">Featured post</h3>
                            <div className="mb-1 text-muted">Nov 12</div>
                            <p className="card-text mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
                            <a href="/" className="stretched-link">Continue reading</a>
                            </div>
                            <div className="col-auto d-none d-lg-block">
                                <img src="https://synabrodemo.s3.ap-northeast-2.amazonaws.com/boardlogo/LibroDemo.png" alt="..."style={{width:200, height:250}}></img>
                            </div>
                        </div>
                        </div>
                        <div className="col-md-6">
                        <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            <div className="col p-4 d-flex flex-column position-static">
                            <strong className="d-inline-block mb-2 text-success">Design</strong>
                            <h3 className="mb-0">Post title</h3>
                            <div className="mb-1 text-muted">Nov 11</div>
                            <p className="mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
                            <a href="/" className="stretched-link">Continue reading</a>
                            </div>
                            <div className="col-auto d-none d-lg-block">
                                <img src="https://synabrodemo.s3.ap-northeast-2.amazonaws.com/boardlogo/LibroDemo.png" alt="..." style={{width:200, height:250}}></img>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="hot_topic container">
                        <div className="container">
                            <h4 className="univ_title">{this.props.univ_title}</h4>
                            <div className="card-deck">
                                <div className="card">
                                    <img src="https://synabrodemo.s3.ap-northeast-2.amazonaws.com/smallbene/notbene.png" className="card-img-top" alt="..."/>
                                </div>
                                <div className="card">
                                    <img src="https://synabrodemo.s3.ap-northeast-2.amazonaws.com/smallbene/notbene.png" className="card-img-top" alt="..."/>
                                </div>
                                <div className="card">
                                    <img src="https://synabrodemo.s3.ap-northeast-2.amazonaws.com/smallbene/notbene.png" className="card-img-top" alt="..."/>
                                </div>
                            </div>
                            <nav className="pagination_tab" aria-label="...">
                                <ul className="pagination pagination-sm">
                                    <li className="page-item active" aria-current="page">
                                    <span className="page-link">
                                        1
                                        <span className="sr-only">(current)</span>
                                    </span>
                                    </li>
                                    <li className="page-item"><a className="page-link" href="/">2</a></li>
                                    <li className="page-item"><a className="page-link" href="/">3</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
                
                univHomeasd
                {this.props.univ_id}
                {this.props.univ_title}
                {this.props.board_type}

            </div>
        );
    }
}

class HomeNoticeArea extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            noticePosts:"",
        }
        this.reloadData = this.reloadData.bind(this);
    }
    componentDidMount(){
        this.callApi()
        .then((res)=>this.setState({noticePosts : res}))
        .catch(err => console.log(err));
    }
    
    callApi = async() =>{
        // const response = await fetch('/univ_post/'+this.props.univ_id+'/'+this.props.board_type);
        // const body = await response.json();
        // return body;
        const url = '/univ_post/'+this.props.univ_id+'/'+this.props.board_type;
        return Axios.get(url)
        .then((response)=>{
            return response.data;
        });
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

    reloadData(){
        this.callApi()
        .then((res)=>this.setState({noticePosts : res}))
        .catch(err => console.log(err));
    }

    render(){
        return(
            <div className="my-3 p-3 bg-white rounded shadow-sm">
                <h6 className="border-bottom border-gray pb-2 mb-0"><Link className="text-danger" to={'/univ/'+this.props.univ_id+'/10002'}>공지사항</Link></h6>
                {this.state.noticePosts?this.state.noticePosts.map((row,index)=>{
                    var currentDate = new Date();
                    var createDate = new Date(row.post_created);
                    if(index<3){
                        return(
                            <div className="media text-muted pt-3 border-bottom border-gray" key={index}>
                                <h6>
                                    <span className="badge badge-pill badge-danger">공 지</span>
                                    <hr/>
                                    <div className="small">조회수:3000<br/> 댓글:[0] </div>
                                </h6>
                                <div className="media-body pb-3 pl-2 mb-0 lh-125">
                                    <p><strong className="d-block text-gray-dark">작성자 : {row.user_nickname}</strong></p>
                                    <p><a href="/" className="text-dark">{row.post_topic}</a></p>
                                    <PostPreview
                                        btn_name={"미리보기"}
                                        post_id={row.post_id} 
                                        post_topic={row.post_topic} 
                                        post_desc={row.post_desc}
                                    />
                                </div>
                                
                                <time>{this.calculateTime(currentDate,createDate)}</time>
                                
                            </div>
                        );
                    }
                }):
                ""
                }
                <small className="d-block text-right mt-3">
                <button className="btn" onClick={this.reloadData}>All updates</button>
                </small>
            </div>
        );
    }
}

export default UnivHome;