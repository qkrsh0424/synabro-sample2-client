import React from 'react';
import Axios from 'axios';
import ReactPullToRefresh from 'react-pull-to-refresh';
import '../PublicCss/UnivMain.css';

import {
    ArrowUp_icon
} from '../../UiIcons';

//componentsList
import {
    UnivNav,
    UnivHome,
    UnivBody,
} from '../../ComponentList';

class UnivMain extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            univ_id : this.props.match.params.univ_id,
            univ_item:"",
            univ:"",
            board_type:this.props.match.params.board_type,
        }

        this._scrollUp = this._scrollUp.bind(this);
    }

    componentDidMount(){
        this.callApi()
        .then(res=>{this.setState({univ_item:res})})
        .catch(err=>{console.log(err)});
        
        this.callApiUniv()
        .then(res=>{this.setState({univ:res})})
        .catch(err=>{console.log(err)});
    }

    // callApi = async()=>{
    //     const response = await fetch('/api/univ_item/'+this.state.univ_id);
    //     const body = await response.json();
    //     return body;
    // }
    callApi(){
        const url = '/api/univ_item/'+this.state.univ_id;
        return Axios.get(url,)
        .then((response)=>{
            return response.data;
        });
    }

    callApiUniv = async()=>{
        // const response = await fetch('/api/univ/'+this.state.univ_id);
        // const body = await response.json();
        // return body;
        const url = '/api/univ/'+this.state.univ_id;
        return Axios.get(url,)
        .then((response)=>{
            return response.data;
        });
    }

    _scrollUp(){
        document.documentElement.scrollTop=document.body.scrollTop=0;
    }

    render(){
        let BodyContents = [];
        let boardForkey;
        if(this.state.board_type===undefined){
            boardForkey = "10000";
            BodyContents.push(
                    <UnivHome
                        key={this.state.univ_id+'_'+boardForkey}
                        univ_title={this.state.univ.univ_title} 
                        univ_id = {this.state.univ_id}
                        board_type = {boardForkey}
                    />
                );
        }else{
            boardForkey = this.state.board_type;
            BodyContents.push(
                    <UnivBody 
                        key={this.state.univ_id+'_'+boardForkey}
                        univ_title={this.state.univ.univ_title} 
                        univ_id = {this.state.univ_id} 
                        board_type = {boardForkey}
                    />
                );
        }
        return(
            <div>
                <UnivNav 
                    univ_title={this.state.univ.univ_title} 
                    univ_item={this.state.univ_item} 
                    board_type={this.state.board_type}
                />
                {BodyContents}
                <button className="btn btn-light shadow-lg position-fixed buttonTest" onClick={this._scrollUp}><ArrowUp_icon/></button>
            </div>
        );
    }
}

export default UnivMain;