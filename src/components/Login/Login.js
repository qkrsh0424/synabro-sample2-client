import React from 'react';
import { setCookie, getCookie, deleteCookie } from '../Handler/Cookie';
import '../PublicCss/Login.css';
import '../PublicCss/SlideAnimation.css';

import Axios from 'axios';
// import logo from 'https://synabrodemo.s3.ap-northeast-2.amazonaws.com/synabrologo/synabrologo2.png';
import {Link} from '../../UiCore';


class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user_email:"",
            user_password:""
        }
    }
    componentDidMount(){
        document.documentElement.scrollTop=document.body.scrollTop=0;
    }
    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.AuthenticateUser();
    }

    AuthenticateUser = () =>{
        const url = "/api/auth/login";
        let formData = new FormData();
        formData.append("user_email", this.state.user_email);
        formData.append("user_password", this.state.user_password);

        Axios.post(url,{
            user_email:this.state.user_email,
            user_password:this.state.user_password,
        })
        // .then(function (response) {
        //     if(response.data===''){
        //         document.getElementById('user_email').focus();
        //         alert("아이디 혹은 비밀번호를 다시 확인해주세요.");
        //     }else{
        //         localStorage.setItem('user_id',response.data.user_id);
        //         window.location.href="/";
        //     }
        //   })
        .then(response => response.data)
        .then(data=>{
            if(data){
                // localStorage.setItem('user_id',data);
                setCookie('ESPID',data);
                alert(getCookie('ESPID'));
                window.location.href="/";
            }else{
                document.getElementById('user_email').focus();
                alert("아이디 혹은 비밀번호를 다시 확인해주세요.");
                this.setState({
                    user_email:'',
                    user_password:'',
                  });
            }
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    render(){
        if(localStorage.getItem('user_id')){
            window.location.href="/";
        }else{
            return(
                <main className="body body__t">
                    <div className="container container__t animate slideIn">
                        <div className="row row__t">
                            <form className="form-signin form-signin__t text-center" onSubmit={this.handleFormSubmit}>
                                <img className="mb-4" src='https://synabrodemo.s3.ap-northeast-2.amazonaws.com/synabrologo/synabrologo2.png' alt="" width="288" height="72"/>
                                <h1 className="h3 mb-3 font-weight-normal">로그인</h1>
                                <label htmlFor="user_email" className="sr-only">Email address</label>
                                <input type="email" id="user_email" name="user_email" className="form-control" placeholder="Email address" required
                                    value={this.state.user_email} onChange={this.handleValueChange}
                                />
    
                                <label htmlFor="user_password" className="sr-only">Password</label>
                                <input type="password" id="user_password" name="user_password" className="form-control" placeholder="Password" required
                                    value={this.state.user_password} onChange={this.handleValueChange}
                                />
    
                                {/* <div className="checkbox mb-3">
                                    <label>
                                        <input type="checkbox" value="remember-me"/> Remember me
                                    </label>
                                </div> */}
    
                                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                                <div className="text-muted__t">
                                    <p className="mt-5 mb-3">"한인들의 정보를 효율적으로 관리해 한인들의 삶의 질을 향상시킨다."</p>
                                </div>
    
    
                                <div className="signin signin__t">
                                    <p className="signin__box">회원가입을 원하시면 링크를 클릭하세요. <Link to="./signup">회원가입</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            );
        }
    }
}

export default Login;