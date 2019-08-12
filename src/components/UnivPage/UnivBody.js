import React from 'react';
import Axios from 'axios';
import '../PublicCss/UnivBody.css';
import '../PublicCss/SlideAnimation.css';

//Call Apis
import {
    univ_postRouteApi
} from '../../callApi/callApi';

//import Cores
import {
    CircularProgress,
} from '../../UiCore';

//import Icons
import {
    Notification_icon,
    ViewList_icon,
    ViewModule_icon,
    ThumbUp_icon,
    Comment_icon,
    Eye_icon,
} from '../../UiIcons';

class UnivBody extends React.Component{
    _isMounted = false;
    constructor(props){
        super(props);
        this.state={
            liststyle:true,
            postVals:"",
            initPostListIndex:0,
            postListIndex:20,
            isLoading:true,
        }

        this.listStyleHandle = this.listStyleHandle.bind(this);
        this.calculateTime = this.calculateTime.bind(this);
        this._infiniteScroll = this._infiniteScroll.bind(this);
        this._refresh_post = this._refresh_post.bind(this);
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

    componentDidMount(){
        this._isMounted = true;

        if(this._isMounted){
            this.callPostApi();
        }
        window.addEventListener('scroll',this._infiniteScroll,true);
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    _LoadPostApi = () =>{
        // const url = '/api/univ_post/'+this.props.univ_id+'/'+this.props.board_type;
        // return Axios.get(url,)
        // .then((response)=>{
        //     return response.data.slice(this.state.initPostListIndex,this.state.postListIndex);
        // });
        return univ_postRouteApi(this.props.univ_id, this.props.board_type)
        .then(data=>{
            return data.slice(this.state.initPostListIndex,this.state.postListIndex);
        })
        .catch(err=>{
            console.log(err);
        });
    }

    callPostApi = ()=>{
        return this._LoadPostApi().then(res=>{
            this.setState({postVals:res})
        }).catch(err=>console.log(err));
    }

    listStyleHandle(listStyleIndex){
        if(listStyleIndex==='list'){
            document.getElementById('listStyle_list').classList.add('active');
            document.getElementById('listStyle_module').classList.remove('active');
            this.setState({...this.state,liststyle:true,postListIndex:20});
        }else if(listStyleIndex==='module'){
            document.getElementById('listStyle_module').classList.add('active');
            document.getElementById('listStyle_list').classList.remove('active');
            this.setState({...this.state,liststyle:false,postListIndex:20});
        }
    }

    _infiniteScroll(){
        let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        let clientHeight = document.documentElement.clientHeight;

        if(scrollTop + clientHeight === scrollHeight){
            if(this.state.postVals[(this.state.postListIndex-1)]===undefined){
                this.setState({isLoading:false});
            }
            this.setState({postListIndex:this.state.postListIndex+10});
            this.callPostApi();
        }
    }

    _refresh_post(){
        // window.location.reload();
        this.setState({isLoading:true});
        this.setState({postListIndex:20});
        document.documentElement.scrollTop=document.body.scrollTop=0;
        this.callPostApi();
    }

    render(){
        const listform = [];
        let noticeIcon = [];

        if(this.props.board_type==='10002'){
            noticeIcon.push(
                <Notification_icon key={this.props.board_type} color="secondary"/>
            );
        }

        if(this.state.liststyle===false){
            listform.push(
                <UnivPostModuleStyle
                    key="module"
                    noticeIcon={noticeIcon}
                    postVals = {this.state.postVals} 
                    calcTime ={this.calculateTime}
                    postListIndex = {this.state.postListIndex}
                />
            );
        }else{
            listform.push(
                <UnivPostListStyle
                    key="list"
                    noticeIcon={noticeIcon}
                    postVals = {this.state.postVals}
                    calcTime ={this.calculateTime}
                    postListIndex = {this.state.postListIndex}
                />
            );
        }
        return(
            <div>
                <div className="board_card py-3 bg-#ffffff">
                    <div className="container">
                        <div className="jumbotron">

                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <h4 className="clearfix text-danger">
                                    공지사항
                                    <button className="float-right btn btn-light active" id="listStyle_list" onClick={()=>this.listStyleHandle("list")}><ViewList_icon/></button>
                                    <button className="float-right btn btn-light" id="listStyle_module" onClick={()=>this.listStyleHandle("module")}><ViewModule_icon/></button>
                                </h4>
                                {listform}
                                 {this.state.isLoading?<div className="text-center"><CircularProgress color="secondary"/></div>
                                 :<div><p>마지막 포스터 입니다.</p><button className="btn btn-info btn-lg btn-block shadow-sm" onClick={this._refresh_post}>페이지 새로고침</button></div>
                                 }
                            </div>  
                        </div>
                    </div>
                </div>
                univBody
                {this.props.univ_id}
                {this.props.univ_title}
                {this.props.board_type}
            </div>
        );
    }
}

class UnivPostListStyle extends React.Component{
    constructor(props){
        super(props);
        this.viewmore = this.viewmore.bind(this);
    }

    viewmore(){
        this.setState({stateIndex:this.state.stateIndex+20});
    }

    render(){
        
        return(
            <div>
                <div className="table-body animate slideIn clearfix">
                    {this.props.postVals?this.props.postVals.map((rows,index)=>{
                        var currentDate = new Date();
                        var createDate = new Date(rows.post_created);
                            return(
                                <div className="table-bar p-3 mb-2 shadow-sm hover_animate" key={index}>
                                    <a href="/" className="text-dark">
                                        <div className="table-bar_column clearfix">
                                            {/* <Notification_icon color="secondary"/> */}
                                            {this.props.noticeIcon}
                                            <span className="table-bar_writer">{index+1}작성자: 학생회</span>
                                            <span className="table-bar_time float-right">{this.props.calcTime(currentDate,createDate)}</span>
                                        </div>
                                        <div className="table-bar_column">
                                            <p className="text">{rows.post_topic}</p>
                                        </div>
                                    </a>
                                    <div className="table-bar_column text-right">
                                        <a href="#" className="text-secondary"><ThumbUp_icon/>0</a>
                                        &nbsp;
                                        <a href="#" className="text-secondary"><Comment_icon/>0</a>
                                        &nbsp;
                                        <span href="#" className="text-secondary"><Eye_icon/>0</span>
                                    </div>
                                </div>
                            );
                    }):""}
                </div>
            </div>
        );
    }
}

class UnivPostModuleStyle extends React.Component{
    render(){
        return(
            <div className="wrapper_notice animate slideIn">
                {this.props.postVals?this.props.postVals.map((rows,index)=>{
                    var currentDate = new Date();
                    var createDate = new Date(rows.post_created);
                    // if(index<this.props.postListIndex){
                        return(
                            <a href="/" className="card card_notice_t hover_animate" key={index}>
                                <img src="https://synabrodemo.s3.ap-northeast-2.amazonaws.com/bigbene/logomain.png" className="card-img-top car-img-top_t" alt="..."/>
                                <div className="card_header_t  pt-0 ml-1 mr-3 text-dark">
                                    {/* <Notification_icon color="secondary"/>{rows.post_topic} */}
                                    {this.props.noticeIcon}{rows.post_topic}
                                </div>
                                <div className="card-body_t mt-0 ml-1 mr-1">
                                    <div className="card_writer">
                                        <p className="text-muted">작성자: 학생회</p>
                                    </div>

                                    <div className="card_footer text-muted">
                                        <p className="view text-muted">조회수 154회</p>
                                    </div>
                                    <div className="card_comment">
                                        <p className="comment text-muted">댓글 3개</p>
                                        <p className="view time text-muted">{this.props.calcTime(currentDate,createDate)}</p>
                                    </div>
                                </div>
                            </a>
                        );
                    // }
                    
                }):""}
            </div>
        );
    }
}

export default UnivBody;