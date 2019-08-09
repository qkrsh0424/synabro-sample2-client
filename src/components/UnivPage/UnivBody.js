import React from 'react';
import Axios from 'axios';
import '../PublicCss/UnivBody.css';
import '../PublicCss/SlideAnimation.css';

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
        }

        this.listStyleHandle = this.listStyleHandle.bind(this);
        this.calculateTime = this.calculateTime.bind(this);
        this._infiniteScroll = this._infiniteScroll.bind(this);
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
        const url = '/univ_post/'+this.props.univ_id+'/'+this.props.board_type;
        return Axios.get(url,)
        .then((response)=>{
            return response.data.slice(this.state.initPostListIndex,this.state.postListIndex);
        });
    }

    callPostApi = ()=>{
        return this._LoadPostApi().then(res=>this.setState({postVals:res})).catch(err=>console.log(err));
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
            console.log(scrollHeight);
            this.setState({postListIndex:this.state.postListIndex+10});
        }

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
                    noticeIcon={noticeIcon}
                    postVals = {this.state.postVals} 
                    calcTime ={this.calculateTime}
                    postListIndex = {this.state.postListIndex}
                />
            );
        }else{
            listform.push(
                <UnivPostListStyle 
                    noticeIcon={noticeIcon}
                    postVals = {this.state.postVals}
                    calcTime ={this.calculateTime}
                    postListIndex = {this.state.postListIndex}
                />
            );
        }
        return(
            <div>
                <div class="board_card py-3 bg-#ffffff">
                    <div class="container">
                        <div class="jumbotron">

                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <h4 class="clearfix text-danger">
                                    공지사항
                                    <button class="float-right btn btn-light active" id="listStyle_list" onClick={()=>this.listStyleHandle("list")}><ViewList_icon/></button>
                                    <button class="float-right btn btn-light" id="listStyle_module" onClick={()=>this.listStyleHandle("module")}><ViewModule_icon/></button>
                                </h4>
                                {listform}
                                {this.state.postVals?
                                    <div>
                                        <h6 className="text-center">마지막 포스터 입니다.</h6>
                                        <button type="button" className="btn btn-info btn-lg btn-block shadow-sm" onClick={()=>window.location.reload()}>페이지 새로고침</button>
                                    </div>
                                    :<p className="text-center"><CircularProgress color="secondary"/></p>}
                                
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
                <div class="table-body animate slideIn clearfix">
                    {this.props.postVals?this.props.postVals.map((rows,index)=>{
                        var currentDate = new Date();
                        var createDate = new Date(rows.post_created);
                        // if(index<this.props.postListIndex){
                            return(
                                <div class="table-bar p-3 mb-2 shadow-sm hover_animate">
                                    <a href="/" class="text-dark">
                                        <div class="table-bar_column clearfix">
                                            {/* <Notification_icon color="secondary"/> */}
                                            {this.props.noticeIcon}
                                            <span class="table-bar_writer">{index+1}작성자: 학생회</span>
                                            <span class="table-bar_time float-right">{this.props.calcTime(currentDate,createDate)}</span>
                                        </div>
                                        <div class="table-bar_column">
                                            <p class="text">{rows.post_topic}</p>
                                        </div>
                                    </a>
                                    <div class="table-bar_column text-right">
                                        <a href="#" className="text-secondary"><ThumbUp_icon/>0</a>
                                        &nbsp;
                                        <a href="#" className="text-secondary"><Comment_icon/>0</a>
                                        &nbsp;
                                        <span href="#" className="text-secondary"><Eye_icon/>0</span>
                                    </div>
                                </div>
                            );
                        // }
                    }):""}
                </div>
            </div>
        );
    }
}

class UnivPostModuleStyle extends React.Component{
    render(){
        return(
            <div class="wrapper_notice animate slideIn">
                {this.props.postVals?this.props.postVals.map((rows,index)=>{
                    var currentDate = new Date();
                    var createDate = new Date(rows.post_created);
                    if(index<this.props.postListIndex){
                        return(
                            <a href="/" class="card card_notice_t hover_animate">
                                <img src="https://synabrodemo.s3.ap-northeast-2.amazonaws.com/bigbene/logomain.png" class="card-img-top car-img-top_t" alt="..."/>
                                <div class="card_header_t  pt-0 ml-1 mr-3 text-dark">
                                    {/* <Notification_icon color="secondary"/>{rows.post_topic} */}
                                    {this.props.noticeIcon}{rows.post_topic}
                                </div>
                                <div class="card-body_t mt-0 ml-1 mr-1">
                                    <div class="card_writer">
                                        <p class="text-muted">작성자: 학생회</p>
                                    </div>

                                    <div class="card_footer text-muted">
                                        <p class="view text-muted">조회수 154회</p>
                                    </div>
                                    <div class="card_comment">
                                        <p class="comment text-muted">댓글 3개</p>
                                        <p class="view time text-muted">{this.props.calcTime(currentDate,createDate)}</p>
                                    </div>
                                </div>
                            </a>
                        );
                    }
                    
                }):""}
            </div>
        );
    }
}

export default UnivBody;