import React, { useState, useEffect } from "react";
import {Redirect} from "react-router-dom";
import { useForm , Controller } from "react-hook-form";

import TextField from '@material-ui/core/TextField';
import { toast } from 'react-toastify';
import { registerLocale } from "react-datepicker";
import { CustomInput, Row, Col } from "reactstrap"

import ko from 'date-fns/locale/ko';
import moment from 'moment';

import ApiService from "../../../service/ApiService";

registerLocale('ko', ko);

export const ClassComponent = (props) => {
    const api = new ApiService();

    const { handleSubmit, register, errors , control } = useForm();

    const [redirectPath, setRedirectPath] = useState(null);
    const [groups, setGroups] = useState([]);
    const [selectGroup, setSelectGroups] = useState(null);

    useEffect(() => {
        // const settingGroupList = async () => {
        //     const result = await api.settingGroupList({centerId : props.auth.loginUser.centerId});

        //     let selectGroup = null;
        //     result.resultData.map((group)=>{
        //         if (group.id == Class.group.id) {
        //             selectGroup = group;
        //         }
        //     })

        //     setSelectGroups(selectGroup);
        //     setGroups(result.resultData);
        // }

        // settingGroupList();
    }, []);
        
    const onChangeGroup = (e) =>{
        const groupId = e.target.value;
        let selectGroup = null;

        groups.map((group) => {
            if (group.id == groupId) {
                selectGroup = group;
            }
        })

        setSelectGroups(selectGroup);
    }
    /**
     * 강사 저장
     * @param {*} values 
     */
    const onSubmit = async (values) => {
        let birthDay = moment(values.birthDay).format('YYYY-MM-DD');
        let enterDate = moment(values.enterDate).format('YYYY-MM-DD');
        values.birthDay = birthDay;
        values.enterDate = enterDate;
      
        let param = {
            ...values,
            status : "working",
            group : selectGroup,
            // id: Class.id,
            updatedAt : moment(new Date()).format('YYYY-MM-DD hh:mm'),
            updatedId : props.auth.loginUser.id,
            updateder : props.auth.loginUser.userName
        }
        
        let result = "";

        // let result = await api.settingClassEdit(param);

        if (result.resultCode == "200") {
            toast.info("직원수정이 완료되었습니다.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })

            // setRedirectPath(`/setting/Class/view/${Class.id}`);

        } else {
            toast.error("직원수정이 실패하였습니다.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }

    };

    return (
        <>
            {
                redirectPath ? 
                <>
                        <Redirect    
                            to={{
                                pathname: redirectPath
                            }}
                        />
                </> : <></>
            }

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card card-custom">
                    <div className="card-header">
                        <div className="card-title">
                            <span className="card-icon">
                                <i className="flaticon2-group text-primary"></i>
                            </span> 
                            <h3 className="card-label">
                                수업 규칙
                            </h3>
                        </div>
                        <div className="card-toolbar">
                            <button
                                type="button"
                                onClick={()=> {setRedirectPath("/setting/Class")}}
                                className="btn btn-light"
                            >
                                <i className="flaticon2-cross"></i>
                                취소
                            </button>
                            {`  `}
                            <button className="btn btn-light ml-2">
                                <i className="flaticon2-refresh-button"></i>
                                초기화
                            </button>
                            {`  `}
                            <button
                                type="submit"
                                className="btn btn-primary ml-2"
                            >
                                <i className="far fa-save"></i>
                                저장
                            </button>
                        </div>
                    </div>
                    <div className="card-body">
                        <Row>
                            <Col lg={6}>
                                <div className="form-group row">
                                    <div className="col-xl-4 col-lg-4 col-md-6">
                                        <label className="font-size-h6 font-weight-bolder text-dark">이메일</label>
                                        <div className="input-group input-group-lg input-group-solid">
                                            <input type="text" className="form-control form-control-lg form-control-solid" 
                                                name="email"
                                                ref={register({
                                                    required: "Required",
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: "이메일 형식이 아닙니다."
                                                    }
                                                })}
                                                placeholder="이메일을 입력해주세요." />
                                        </div>
                                        <span className="form-text text-muted">로그인 아이디로 사용됩니다.</span>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-6">
                                        <label className="font-size-h6 font-weight-bolder text-dark">비밀번호</label>
                                        <div className="input-group input-group-lg input-group-solid">
                                            <input type="text" className="form-control form-control-lg form-control-solid" 
                                                name="password"
                                                ref={register({
                                                    required: "Required",
                                                })}
                                                defaultValue="yeha1234" 
                                                readOnly={true} />
                                        </div>
                                        <span className="form-text text-muted">첫 로그인 시 사용되는 초기 비밀번호입니다.</span>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="form-group row">
                                  <div className="col-xl-5 col-lg-4">
                                    <label className="font-size-h6 font-weight-bolder text-dark">예약 가능 시간</label>
                                    <input type="text" className="form-control form-control-lg form-control-solid" 
                                      name="password"
                                      ref={register({
                                          required: "Required",
                                      })}
                                      defaultValue="yeha1234" 
                                      readOnly={true} />
                                  </div>
                                  <div className="col-xl-5 col-lg-4">
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <div className="col-xl-5 col-lg-4">
                                    <label className="font-size-h6 font-weight-bolder text-dark">예약 수정 가능 시간</label>
                                    <input type="text" className="form-control form-control-lg form-control-solid" 
                                      name="password"
                                      ref={register({
                                          required: "Required",
                                      })}
                                      defaultValue="yeha1234" 
                                      readOnly={true} />
                                  </div>
                                  <div className="col-xl-5 col-lg-4">
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <div className="col-xl-5 col-lg-4">
                                    <label className="font-size-h6 font-weight-bolder text-dark">예약 취소 가능 시간</label>
                                    <input type="text" className="form-control form-control-lg form-control-solid" 
                                      name="password"
                                      ref={register({
                                          required: "Required",
                                      })}
                                      defaultValue="yeha1234" 
                                      readOnly={true} />
                                  </div>
                                  <div className="col-xl-5 col-lg-4">
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <div className="col-xl-5 col-lg-4">
                                    <label className="font-size-h6 font-weight-bolder text-dark">출석 가능 시간</label>
                                    <input type="text" className="form-control form-control-lg form-control-solid" 
                                      name="password"
                                      ref={register({
                                          required: "Required",
                                      })}
                                      defaultValue="yeha1234" 
                                      readOnly={true} />
                                  </div>
                                  <div className="col-xl-5 col-lg-4">
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <div className="col-xl-5 col-lg-4">
                                    <label className="font-size-h6 font-weight-bolder text-dark">지각 처리 시간</label>
                                    <input type="text" className="form-control form-control-lg form-control-solid" 
                                      name="password"
                                      ref={register({
                                          required: "Required",
                                      })}
                                      defaultValue="yeha1234" 
                                      readOnly={true} />
                                  </div>
                                  <div className="col-xl-5 col-lg-4">
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <div className="col-xl-5 col-lg-4">
                                    <label className="font-size-h6 font-weight-bolder text-dark">만기 알림 시간</label>
                                    <input type="text" className="form-control form-control-lg form-control-solid" 
                                      name="password"
                                      ref={register({
                                          required: "Required",
                                      })}
                                      defaultValue="yeha1234" 
                                      readOnly={true} />
                                  </div>
                                  <div className="col-xl-5 col-lg-4">
                                  </div>
                                </div>
                            </Col>
                        </Row>
                        
                    </div>
                        
                </div> 
            </form>

        </>
    );
};


export default ClassComponent;