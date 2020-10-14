import React, { Component } from 'react';
import { Redirect, Route, HashRouter, Switch ,withRouter, BrowserRouter} from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as AuthModules from "../../store/modules/auth";

import {toAbsoluteUrl} from "../../helpers";
import "../../assets/sass/pages/login/classic/login-3.scss";
import ApiService from '../../service/ApiService';

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        console.log(props);

        this.api = new ApiService();
        this.state = {
            redirectPath : null,

            email : null,
            password : null,
        };
    }

    componentDidMount () {
    
    }

    onChangeValue = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    login = async () => {
        let param  = {
            email : this.state.email,
            password : this.state.password
        }

        let result = await this.api.login(param);
        if (result.resultCode == "200") {
            console.log("정상로그인");
            console.log(result);

            this.props.AuthActions.SetToken(result);
            this.setState({
                redirectPath : "/"
            });

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
                                    <!--begin::Login Sign in form--> */}
                                    <div className="login-signin" style={{display : "block"}}>
                                        <div className="mb-20">
                                            <h3>로그인</h3>
                                            <p className="opacity-60 font-weight-bold">코로나 19 물리치고 화이팅 입니다!</p>
                                        </div>
                                        {/* <form className="form" id="kt_login_signin_form"> */}
                                            <div className="form-group">
                                                <input className="form-control h-auto text-white placeholder-white opacity-70 bg-dark-o-70 rounded-pill border-0 py-4 px-8 mb-5" 
                                                type="text" onChange={this.onChangeValue} value={this.state.email} placeholder="Email" id="email" />
                                            </div>
                                            <div className="form-group">
                                                <input className="form-control h-auto text-white placeholder-white opacity-70 bg-dark-o-70 rounded-pill border-0 py-4 px-8 mb-5" 
                                                type="password" onChange={this.onChangeValue} value={this.state.password} placeholder="Password" id="password" />
                                            </div>
                                            <div className="form-group d-flex flex-wrap justify-content-between align-items-center px-8">
                                                <div className="checkbox-inline">
                                                    <label className="checkbox checkbox-outline checkbox-white text-white m-0">
                                                    <input type="checkbox" name="remember" />
                                                    <span></span>아이디 기억</label>
                                                </div>
                                                <a onClick={()=>this.setState({redirectPath : "/auth/forgat"})} 
                                                 id="kt_login_forgot" className="text-white font-weight-bold">비밀번호를 잊어버리셨나요?</a>
                                            </div>
                                            <div className="form-group text-center mt-10">
                                                <button id="kt_login_signin_submit" 
                                                onClick={this.login}
                                                className="btn btn-pill btn-outline-white font-weight-bold opacity-90 px-15 py-3">로그인</button>
                                            </div>
                                        {/* </form> */}
                                        <div className="mt-10">
                                            <span className="opacity-70 mr-4">아직 계정이 없으시나요?</span>
                                            <a onClick={()=>this.setState({redirectPath : "/auth/register"})} 
                                                id="kt_login_signup" className="text-white font-weight-bold">회원가입</a>
                                        </div>
                                    </div>
                                    {/* <!--end::Login Sign in form-->*/}                                  
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


export default LoginComponent;

// export default connect((state) => ({
//     auth: state.auth,
// }),
// (dispatch) => ({
//     AuthActions: bindActionCreators(AuthModules.actions, dispatch),
// })
// )(LoginComponent);