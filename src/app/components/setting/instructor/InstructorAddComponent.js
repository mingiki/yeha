import React, { Component } from 'react';
import {Redirect} from "react-router-dom";
import update from 'react-addons-update'
import { ToastContainer, toast } from 'react-toastify';

import DatePicker , { registerLocale, setDefaultLocale } from "react-datepicker";
import ko from 'date-fns/locale/ko';

import {
    Input,
    CustomInput,
    Table,
    Row,
    Col,
} from "reactstrap"

import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar,
} from "../../../partials/controls";

import ApiService from '../../../service/ApiService';
import UtilService from '../../../service/UtilService';

class InstructorAddComponent extends Component {
    constructor(props) {
        super(props);
        this.api = new ApiService();
        this.util = new UtilService();
        this.state = {           
            redirectPath : null,
            invalid: {
                name : false,
                email : false,
                phone : false,
            },
            formValue: {
                email : '',
                password : 'yeha1234',
                name : '',
                birthDay : new Date(),
                enterDate : new Date(),
                leaveDate : new Date(),
                phone : '',
                address: '',
                photo : ''
            }      
        };
    }

    componentDidMount () {
        registerLocale('ko', ko);
        // this.util.setDatePicker("birthDay");
    }

    redirect = (path) => {
        this.setState({
            redirectPath : path
        })
    }

    onChangeBirthDay = (value) => {
        this.setState({
            birthDay : value
        })
    }

    onChangeEnterDate = (value) => {
        this.setState({
            enterDate : value
        })
    }
    
    onChangeName = (e) =>{
        this.setState({
          formValue: update(
            this.state.formValue,
            {
              name: { $set: e.target.value },
            }
          ),
          invalid: update(
            this.state.invalid,
            {
              name: { $set: false },
            }
          )
        })
    }
    
    settinginstructorAdd = async () => {
        let name = this.state.formValue.name;
        if (name == null || name == '' || name == undefined) {
          this.setState({
            invalid: update(
              this.state.invalid,
              {
                name: { $set: true },
              }
            )
          })
          document.getElementById("name").focus();
        } else {
    
          let param = {
              name : name,
              loginUser : this.props.auth.loginUser
          }
          let result = await this.api.settinginstructorAdd(param);

          if (result.resultCode == "200") {
            toast.info("직원등록이 완료되었습니다.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })

            this.setState({
                redirectPath : "setting/instructor"
            })

          } else {
            toast.error("직원등록이 실패하였습니다.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
          }

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

                <div className="card card-custom">
                    <div className="card-header">
                        <div className="card-title">
                            <span className="card-icon">
                                <i className="flaticon2-group text-primary"></i>
                            </span> 
                            <h3 className="card-label">
                                직원 등록
                            </h3>
                        </div>
                        <div class="card-toolbar">
                            <button
                                type="button"
                                onClick={()=> {this.setState({redirectPath : "/setting/instructor"})}}
                                className="btn btn-light"
                            >
                                <i className="fa fa-arrow-left"></i>
                                취소
                            </button>
                            {`  `}
                            <button className="btn btn-light ml-2">
                                <i className="fa fa-redo"></i>
                                초기화
                            </button>
                            {`  `}
                            <button
                                type="submit"
                                className="btn btn-primary ml-2"
                                onClick={this.settingGroupAdd}
                            >
                                <i className="fa fa-save"></i>
                                저장
                            </button>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="form-group row">
                            <div className="col-xl-12">
                                <div className="image-input image-input-outline" id="kt_user_edit_avatar" style={{backgroundImage: "url(assets/media/users/blank.png)"}}>
                                    <label className="font-size-h6 font-weight-bolder text-dark">사진</label>
                                    <div className="image-input-wrapper" style={{backgroundImage : "none"}}></div>
                                    <label className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow" data-action="change" data-toggle="tooltip" title="" data-original-title="Change avatar">
                                        <i className="fa fa-pen icon-sm text-muted"></i>
                                        <input type="file" name="profile_avatar" accept=".png, .jpg, .jpeg" />
                                        <input type="hidden" name="profile_avatar_remove" value="0" />
                                    </label>
                                    <span className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow" data-action="cancel" data-toggle="tooltip" title="" data-original-title="Cancel avatar">
                                        <i className="ki ki-bold-close icon-xs text-muted"></i>
                                    </span>
                                    <span className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow" data-action="remove" data-toggle="tooltip" title="" data-original-title="Remove avatar">
                                        <i className="ki ki-bold-close icon-xs text-muted"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-xl-3 col-lg-4 col-md-6">
                                <label className="font-size-h6 font-weight-bolder text-dark">이메일</label>
                                <div className="input-group input-group-lg input-group-solid">
                                    <input type="text" className="form-control form-control-lg form-control-solid" value="anna.krox@loop.com" placeholder="이메일을 입력해주세요." />
                                </div>
                                <span className="form-text text-muted">로그인 아이디로 사용됩니다.</span>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6">
                                <label className="font-size-h6 font-weight-bolder text-dark">비밀번호</label>
                                <div className="input-group input-group-lg input-group-solid">
                                    <input type="text" className="form-control form-control-lg form-control-solid" value="yeha1234" disabled={true} />
                                </div>
                                <span className="form-text text-muted">첫 로그인 시 사용되는 초기 비밀번호입니다.</span>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-xl-3 col-lg-4 col-md-6">
                                <label className="font-size-h6 font-weight-bolder text-dark">이름</label>
                                <input className="form-control form-control-lg form-control-solid" type="text" value={this.state.formValue.name} placeholder="이름을 입력해주세요."/>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6">
                                <label className="font-size-h6 font-weight-bolder text-dark">연락처</label>
                                <div className="input-group input-group-lg input-group-solid">
                                    <input type="text" className="form-control form-control-lg form-control-solid" value={this.state.formValue.phone} placeholder="연락처를 입력해주세요." />
                                </div>
                                <span className="form-text text-muted">XXX-XXXX-XXXX 형식에 맞게 입력해주세요.</span>
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-xl-3 col-lg-4 col-md-6">
                                <label className="font-size-h6 font-weight-bolder text-dark">생일</label>
                                <div className="input-group input-group-lg input-group-solid">
                                    <DatePicker className="form-control form-control-lg form-control-solid" 
                                        locale="ko"
                                        popperModifiers={{ preventOverflow: { enabled: true, }, }}
                                        selected={this.state.formValue.birthDay}
                                        dateFormat="yyyy-MM-dd"
                                        onChange={this.onChangeBirthDay}/>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6">
                                <label className="font-size-h6 font-weight-bolder text-dark">입사일</label>
                                <div className="input-group input-group-lg input-group-solid">
                                    <DatePicker className="form-control form-control-lg form-control-solid"
                                        locale="ko"
                                        popperModifiers={{ preventOverflow: { enabled: true, }, }}
                                        selected={this.state.formValue.enterDate}
                                        dateFormat="yyyy-MM-dd"
                                        onChange={this.onChangeEnterDate}/>
                                </div>
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-xl-9 col-lg-12">
                                <label className="font-size-h6 font-weight-bolder text-dark">주소</label>
                                <div className="input-group input-group-lg input-group-solid">
                                    <input type="text" className="form-control form-control-lg form-control-solid" placeholder="주소를 입력해주세요." value={this.state.formValue.address} />
                                </div>
                            </div>
                        </div>
                    </div>
                        
                </div> 

            </>         
        );
    }


}

export default InstructorAddComponent;

