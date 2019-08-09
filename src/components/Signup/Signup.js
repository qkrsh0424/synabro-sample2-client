import React from 'react';
import Axios from 'axios';
import '../PublicCss/Signup.css';
import '../PublicCss/SlideAnimation.css';
// import logo from '../../images/Logo/synabrologo2.png';

class Signup extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user_job:"",
            user_major:"",
            user_email:"",
            user_password:"",
            user_password_confirm:"",
            user_name:"",
            user_nickname:"",
            user_gender:"",
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

    AuthenticateUser = () =>{
        const url = "/auth/signup";
        let formData = new FormData();
        formData.append("user_job", this.state.user_job);
        formData.append("user_major", this.state.user_major);
        formData.append("user_email", this.state.user_email);
        formData.append("user_password", this.state.user_password);
        formData.append("user_name", this.state.user_name);
        formData.append("user_nickname", this.state.user_nickname);
        formData.append("user_gender", this.state.user_gender);

        Axios.post(url,{
            user_job : this.state.user_job,
            user_major : this.state.user_major,
            user_email:this.state.user_email,
            user_password:this.state.user_password,
            user_name:this.state.user_name,
            user_nickname:this.state.user_nickname,
            user_gender:this.state.user_gender
        })
        .then(response=>response.data)
        .then(data=>{
            if(data){
                window.location.href='/';
            }else{
                document.getElementById('user_email').focus();
                alert('이미 사용중인 이메일입니다. 이메일을 다시 한번 확인해 주세요.');
                this.setState({
                    user_email:'',
                    user_password:'',
                    user_password_confirm:'',
                });
            }
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        if(this.state.user_password===this.state.user_password_confirm){
            this.AuthenticateUser();
        }else{
            document.getElementById('user_password').focus();
            this.setState({
                user_password:"",
                user_password_confirm:"",
            });
            alert("패스워드를 확인하세요");
        }
    }

    render(){
        if(localStorage.getItem('user_id')){
            window.location.href="/";
        }else{
            return(
                <div>
                    <div className="container animate slideIn">
                        <div className="header py-5 text-center">
                            <img className="d-block mx-auto mb-3" src='https://synabrodemo.s3.ap-northeast-2.amazonaws.com/synabrologo/synabrologo2.png' alt=""/>
                            <h2>회원가입</h2>
                            <p className="lead">"한인들의 정보를 효율적으로 관리해 한인들의 삶의 질을 향상시킨다."</p>
                        </div>
    
                        <div className="row row__t">
                            <div className="test__t">
                                <form className="was-validated" onSubmit={this.handleFormSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="user_job">학교 입력</label>
                                        <input 
                                            type="text" className="form-control" name="user_job" id="user_job" placeholder="xx대학교" required
                                            value={this.state.user_job} onChange={this.handleValueChange}
                                        />
                                        <div className="invalid-feedback">
                                        *Please enter a valid shcool for shipping updates.
                                        </div>
                                    </div>
    
                                    <div className="mb-3">
                                        <label htmlFor="user_major">학과 </label>
                                        <input 
                                            type="text" className="form-control" name="user_major" id="user_major" placeholder="국제무역학과" required
                                            value={this.state.user_major} onChange={this.handleValueChange}
                                        />
                                        <div className="invalid-feedback">
                                        *Please enter a valid mojor for shipping updates.
                                        </div>
                                    </div>
    
                                    <div className="mb-3">
                                        <label htmlFor="user_email">이메일 (로그인시 이메일 로그인을 사용합니다.)</label>
                                        <input 
                                            type="email" className="form-control" name="user_email" id="user_email" placeholder="you@example.com" required
                                            value={this.state.user_email} onChange={this.handleValueChange}    
                                        />
                                        <div className="invalid-feedback">
                                        *Please enter a valid email address for shipping updates.
                                        </div>
                                    </div>
    
                                    <div className="mb-3">
                                        <label htmlFor="user_password">비밀번호</label>
                                        <input 
                                            type="password" className="form-control" name="user_password" id="user_password" placeholder="password" required
                                            value={this.state.user_password} onChange={this.handleValueChange}
                                        />
                                        <div className="invalid-feedback">
                                        *Please enter a valid password for shipping updates.
                                        </div>
                                    </div>
    
                                    <div className="mb-3">
                                        <label htmlFor="user_password_confirm">비밀번호 확인</label>
                                        <input 
                                            type="password" className="form-control" name="user_password_confirm" id="user_password_confirm" placeholder="password" required
                                            value={this.state.user_password_confirm} onChange={this.handleValueChange}    
                                        />
                                        <div className="invalid-feedback">
                                        *Please enter a valid password for shipping updates.
                                        </div>
                                    </div>
    
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="user_name">이름(실명)</label>
                                            <input 
                                                type="text" className="form-control" name="user_name" id="user_name" placeholder="" value="" required
                                                value={this.state.user_name} onChange={this.handleValueChange}    
                                            />
                                            <div className="invalid-feedback">
                                            Valid name is required.
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="user_nickname">별명</label>
                                            <input 
                                                type="text" className="form-control" name="user_nickname" id="user_nickname" placeholder="" value="" required
                                                value={this.state.user_nickname} onChange={this.handleValueChange}    
                                            />
                                            <div className="invalid-feedback">
                                            Valid last nickname is required.
                                            </div>
                                        </div>
                                    </div>
    
                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlSelect1">Gender</label>
                                        <select className="form-control" id="exampleFormControlSelect1" name="user_gender" required
                                            value={this.state.user_gender} onChange={this.handleValueChange}
                                        >
                                            <option value="">--------</option>
                                            <option value="남자">남자</option>
                                            <option value="여자">여자</option>
                                        </select>
                                    </div>
    
                                    <hr className="mb-3"/>
                                    <button className="btn btn-primary btn-lg btn-block" type="submit">회원가입</button>
                                </form>
                            </div>
                        </div>
    
    
                        <footer className="footer my-5 pt-5 text-muted text-center text-small">
                            <p className="mb-1">&copy; 2019 Synabro</p>
                            <ul className="list-inline">
                                <li className="list-inline-item"><a href="/Users/hellomyworld/Desktop/bootstrap-4.3.1-dist/synabro/login.html">Privacy</a></li>
                                <li className="list-inline-item"><a href="#">Terms</a></li>
                                <li className="list-inline-item"><a href="#">Support</a></li>
                            </ul>
                        </footer>
                    </div>
                </div>
            );
        }
    }
}

export default Signup;