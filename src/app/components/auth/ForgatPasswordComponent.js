import React, { Component } from 'react';
import {Redirect} from "react-router-dom";

import {toAbsoluteUrl} from "../../helpers";
import "../../assets/sass/pages/login/classic/login-3.scss";

class ForgatPasswordComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectPath : null,
        };
    }

    componentDidMount (){
    
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
                                    {/* <!--end::Login Header-->*/}
                                    {/*<!--begin::Login forgot password form--> */}
                                    <div className="login-forgot" style={{display : "block"}}>
                                        <div className="mb-20">
                                            <h3>Forgotten Password ?</h3>
                                            <p className="opacity-60">Enter your email to reset your password</p>
                                        </div>
                                        <form className="form" id="kt_login_forgot_form">
                                            <div className="form-group mb-10">
                                                <input className="form-control h-auto text-white placeholder-white opacity-70 bg-dark-o-70 rounded-pill border-0 py-4 px-8" type="text" placeholder="Email" name="email" autocomplete="off" />
                                            </div>
                                            <div className="form-group">
                                                <button id="kt_login_forgot_submit" className="btn btn-pill btn-outline-white font-weight-bold opacity-90 px-15 py-3 m-2">Request</button>
                                                <button id="kt_login_forgot_cancel" className="btn btn-pill btn-outline-white font-weight-bold opacity-70 px-15 py-3 m-2">Cancel</button>
                                            </div>
                                        </form>
                                    </div>
                                    {/* <!--end::Login forgot password form--> */}
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


export default ForgatPasswordComponent;
