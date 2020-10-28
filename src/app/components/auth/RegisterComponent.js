import React, { Component } from 'react';
import {Redirect} from "react-router-dom";

import {toAbsoluteUrl} from "../../helpers";
import "../../assets/sass/pages/login/classic/login-3.scss";
import ApiService from '../../service/ApiService';

class RegisterComponent extends Component {
    constructor(props) {
        super(props);
        this.api = new ApiService();
        this.state = {
            redirectPath : null,
            isLoading : false,

            email : null,
            password : null,
            centerName : null,
            userName : null,
            tel : null
        };
    }

    componentDidMount (){
    
    }

    onChangeValue = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    createCenter = async () => {
        let param = {
            email : this.state.email,
            password : this.state.password,
            centerName : this.state.centerName,
            userName : this.state.userName,
            tel : this.state.tel
        }

        let result = await this.api.createCenter(param);

        if (result.resultCode == "200") {
            this.setState({
                redirectPath : '/auth/login'
            })
        }
    }

    valid = () => {
        const email = this.state.email;
        const password = this.state.password;
        const centerName = this.state.centerName;
        const userName = this.state.userName;
        const tel = this.state.tel;

        let result = false;
        let emailStr = "";
        let passwordStr = "";
        let nameStr = "";

        const regExp1 = /[0-9]/;
        const regExp2 = /[a-zA-Z]/;

        //이메일 null 체크
        if (email == "" || email == undefined || email == null) {
            result = false;
            emailStr = "이메일을 입력하세요.";
    
        //이메일 정규식 체크
        } else if (/.+@.+\.[A-Za-z]+$/.test(email) == false) {
            result = false;
            emailStr = "이메일을 정확히 입력해주세요.";

        //패스워드 null 체크
        } else if (password == "" || password == undefined || password == null) {
            result = false;
            passwordStr= "패스워드를 입력하세요.";
        
        //패스워드 길이값 체크
        } else if (password.length < 6) {
            result = false;
            passwordStr= "패스워드는 6자리 이상입니다.";

        //패스워드 조합 체크
        } else if (!regExp1.test(password) || !regExp2.test(password)) {
            result = false;
            passwordStr= "패스워드는 영문, 숫자 포함입니다.";

        //가입사 null 체크
        } else if (centerName == "" || centerName == undefined || centerName == null) {
            result = false;
            nameStr = "센터명을 입력하세요.";
        }
    }

    render() {
        return (
            <>  
                {
                    this.state.redirectPath ? 
                    <>
                            <Redirect    
                                to={{
                                    pathname: this.state.redirectPath
                                }}
                            />
                    </> : <></>
                }
                <div className="d-flex flex-column flex-root">
                    {/*begin::Login*/}
                    <div
                        className="login login-3 login-signin-on d-flex flex-column flex-lg-row flex-row-fluid bg-white"
                        id="kt_login"
                    >
                        <div className="d-flex flex-center bgi-size-cover bgi-no-repeat flex-row-fluid"  style={{
                            backgroundColor: '#A593E0'
                            }}>
                                <div className="login-form text-center text-white p-7 position-relative overflow-hidden">
                                    {/* <!--begin::Login Header--> */}
                                    <div className="d-flex flex-center mb-15">
                                        <a href="#">
                                            <img src={toAbsoluteUrl("/media/logos/logo-letter-9.png")} className="max-h-100px" alt="" />
                                        </a>
                                    </div>
                                    {/* <!--end::Login Header-->                              
                                    <!--begin::Login Sign up form--> */}
                                    <div className="login-signup" style={{display : "block"}}>
                                        <div className="mb-20">
                                            <h3>회원가입</h3>
                                            <p className="opacity-60">Enter your details to create your account</p>
                                        </div>
                                        {/* <form className="form text-center" 
                                        onSubmit={this.createCenter}    
                                        id="kt_login_signup_form"> */}
                                            <div className="form-group">
                                                <input className="form-control h-auto text-white placeholder-white opacity-70 bg-dark-o-70 rounded-pill border-0 py-4 px-8" 
                                                type="text" placeholder="이메일" id="email" autoComplete="off" 
                                                value={this.state.email || ''}
                                                onChange={this.onChangeValue} />
                                            </div>
                                            <div className="form-group">
                                                <input className="form-control h-auto text-white placeholder-white opacity-70 bg-dark-o-70 rounded-pill border-0 py-4 px-8" 
                                                type="password" placeholder="비밀번호" id="password"
                                                value={this.state.password || ''}
                                                onChange={this.onChangeValue} />
                                            </div>  

                                            <div className="separator separator-dashed my-8" />
                                            
                                            <div className="form-group">
                                                <input className="form-control h-auto text-white placeholder-white opacity-70 bg-dark-o-70 rounded-pill border-0 py-4 px-8" 
                                                type="text" placeholder="상호명" id="centerName" 
                                                value={this.state.centerName || ''}
                                                onChange={this.onChangeValue} />
                                            </div>
                                            <div className="form-group">
                                                <input className="form-control h-auto text-white placeholder-white opacity-70 bg-dark-o-70 rounded-pill border-0 py-4 px-8" 
                                                type="text" placeholder="관리자명" id="userName" 
                                                value={this.state.userName || ''}
                                                onChange={this.onChangeValue} />
                                            </div>
                                            <div className="form-group">
                                                <input className="form-control h-auto text-white placeholder-white opacity-70 bg-dark-o-70 rounded-pill border-0 py-4 px-8" 
                                                type="text" placeholder="연락처" id="tel" 
                                                value={this.state.tel || ''}
                                                onChange={this.onChangeValue} />
                                            </div>
                                                                             
                                            <div className="form-group text-left px-8">
                                                <div className="checkbox-inline">
                                                    <label className="checkbox checkbox-outline checkbox-white text-white m-0">
                                                        <input type="checkbox" name="agree" />
                                                        <span></span>
                                                        <a className="text-white font-weight-bold ml-1" style={{textDecoration : "underline"}}>이용 약관</a> &nbsp; 및
                                                        <a className="text-white font-weight-bold ml-1" style={{textDecoration : "underline"}}>개인정보 취급방침</a>
                                                        &nbsp; 동의
                                                    </label>
                                                </div>
                                                <div className="form-text text-muted text-center"></div>
                                            </div>
                                            <div className="form-group">
                                                <button id="kt_login_signup_submit" 
                                                    onClick={this.createCenter}
                                                    className="btn btn-pill btn-outline-white font-weight-bold opacity-90 px-15 py-3 m-2">가입</button>
                                                <button id="kt_login_signup_cancel" 
                                                    onClick={()=>this.setState({redirectPath : "/auth/login"})} 
                                                    className="btn btn-pill btn-outline-white font-weight-bold opacity-70 px-15 py-3 m-2">취소</button>
                                            </div>
                                        {/* </form> */}
                                    </div>
                                    {/* <!--end::Login Sign up form-->*/}
                                
                                </div>
                            </div>
                        {/*end::Content*/}
                    </div>
                    {/*end::Login*/}
                    </div>
            </>         
        );
    }


}


export default RegisterComponent;
