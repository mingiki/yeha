import React, { Component } from 'react';
import {Redirect} from "react-router-dom";
import update from 'react-addons-update'
import { ToastContainer, toast } from 'react-toastify';
import DualListBox from 'react-dual-listbox';

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

import {
    DatePickerField
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
                phone : '',
                address: '',
                photo : ''
            }      
        };
    }

   

    componentDidMount () {
        this.util.setDatePicker("birthDay");
    }

    redirect = (path) => {
        this.setState({
            redirectPath : path
        })
    }

    onChangeMenu = (event) => {
        let isChecked = event.target.checked;
        let menuId = event.target.id;
    
        let updateMenus = this.state.menus.map( menu =>{
          if (menu.menuId == menuId) {
            menu.isOpen = isChecked;
            if (menu.sub) {
                menu.sub.map(sub => {
                    sub.isOpen = isChecked;
                })
            }
          }

          return menu;
        });
    
        this.setState({
          menus : updateMenus
        })
    }

    onChangeMenuSub = (event) => {
        let isChecked = event.target.checked;
        let menuId = event.target.id;
    
        let updateMenus = this.state.menus.map( menu =>{
            if (menu.sub) {
                menu.sub.map(sub => {
                    if (sub.menuId == menuId) {
                        sub.isOpen = isChecked;
                    }
                })
            }
          return menu;
        });
    
        this.setState({
          menus : updateMenus
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
                        <div class="card-title">
                            <span class="card-icon">
                                <i class="flaticon2-group text-primary"></i>
                            </span> 
                            <h3 class="card-label">
                                직원 등록
                            </h3>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-xl-2"></div>
                            <div className="col-xl-7 my-2">
                                <div className="form-group row">
                                    <label className="col-form-label col-3 text-lg-right text-left">사진</label>
                                    <div className="col-9">
                                        <div className="image-input image-input-outline" id="kt_user_edit_avatar" style={{backgroundImage: "url(assets/media/users/blank.png)"}}>
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
                                    <label className="col-form-label col-3 text-lg-right text-left">이름</label>
                                    <div className="col-9">
                                        <input className="form-control form-control-lg form-control-solid" type="text" value="Anna" placeholder="이름을 입력하세요."/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-form-label col-3 text-lg-right text-left">이메일</label>
                                    <div className="col-9">
                                        <div className="input-group input-group-lg input-group-solid">
                                            <input type="text" className="form-control form-control-lg form-control-solid" value="anna.krox@loop.com" placeholder="이메일을 입력하세요." />
                                        </div>
                                        <span className="form-text text-muted">로그인 아이디로 사용됩니다.</span>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-form-label col-3 text-lg-right text-left">비밀번호</label>
                                    <div className="col-9">
                                        <div className="input-group input-group-lg input-group-solid">
                                            <input type="text" className="form-control form-control-lg form-control-solid" value="yeha1234" disabled={true} />
                                        </div>
                                        <span className="form-text text-muted">첫 로그인 시 사용되는 초기 비밀번호입니다.</span>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-form-label col-3 text-lg-right text-left">연락처</label>
                                    <div className="col-9">
                                        <div className="input-group input-group-lg input-group-solid">
                                            <input type="text" className="form-control form-control-lg form-control-solid" value="010-2824-9089" placeholder="Phone" />
                                        </div>
                                        <span className="form-text text-muted">XXX-XXXX-XXXX 형식에 맞게 입력해주세요.</span>
                                    </div>
                                </div>                                
                                <div className="form-group row">
                                    <label className="col-form-label col-3 text-lg-right text-left">생일</label>
                                    <div className="col-9">
                                        <div className="input-group input-group-lg input-group-solid">
                                            <input type="text" className="form-control form-control-lg form-control-solid"  id="birthDay"/>


                                        </div>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-form-label col-3 text-lg-right text-left">주소</label>
                                    <div className="col-9">
                                        <div className="input-group input-group-lg input-group-solid">
                                            <input type="text" className="form-control form-control-lg form-control-solid" placeholder="Username" value="loop" />
                                        </div>
                                    </div>
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

