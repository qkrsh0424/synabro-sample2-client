import React from 'react';
import '../PublicCss/UnivNav.css';
import {Link} from 'react-router-dom';

class UnivNav extends React.Component{
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         in:this.props.board_type
    //     }
    // }
    // componentDidUpdate(){
    //     if(this.props.board_type===undefined){
    //         document.getElementById("10000").classList.add("link_active");    
    //     }else{
    //         document.getElementById(this.props.board_type).classList.add("link_active");
    //     }
        
    // }
    componentWillUpdate(){
        // console.log(this.props.board_type);
        if(this.props.univ_item){
            if(this.props.board_type===undefined){
                document.getElementById("itemActive"+"10000").classList.add("link_active");    
            }else{
                document.getElementById("itemActive"+this.props.board_type).classList.add("link_active");
            }
        }
    }
    
    render(){
        return(
            <div className="nav-scroller bg-white shadow-sm fixed_top_second align-center">
                <nav className="nav nav-underline">
                    <p className="align-text-bottom title_font">{this.props.univ_title}</p>
                    {this.props.univ_item?this.props.univ_item.map(
                        (row)=>{
                            if(row.univ_item_address===10000){
                                return(
                                    <a
                                        key={row.univ_item_title} 
                                        id={"itemActive"+row.univ_item_address} 
                                        className="nav-link" 
                                        href={"/univ/"+row.univ_id}
                                    >{row.univ_item_title}</a>
                                );
                            }else{
                                return(
                                    <a
                                        key={row.univ_item_title} 
                                        id={"itemActive"+row.univ_item_address} 
                                        className="nav-link"
                                        href={"/univ/"+row.univ_id+"/"+row.univ_item_address}
                                    >{row.univ_item_title}</a> 
                                );
                            }
                        }
                    ):""}
                    {/* <a id="home" className="nav-link" href={"/univ/"+this.props.univ_id}>홈</a>
                    <a id="notice" className="nav-link" href={"/univ/"+this.props.univ_id+"/10002"}>공지사항</a>
                    <a id="board" className="nav-link" href={"/univ/"+this.props.univ_id+"/10003"}>게시판</a>
                    <a id="story" className="nav-link" href={"/univ/"+this.props.univ_id+"/10004"}>스토리</a> */}
                </nav>
            </div>
        );
    }
}

export default UnivNav;