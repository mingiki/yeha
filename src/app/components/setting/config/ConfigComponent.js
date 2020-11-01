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

export const ConfigComponent = (props) => {
    const api = new ApiService();

    const { handleSubmit, register, errors , control } = useForm();

    const [redirectPath, setRedirectPath] = useState(null);
    const [config, setConfig] = useState({});

    useEffect(() => {
        const settingConfigSelect = async () => {
            const result = await api.settingConfigSelect({centerId : props.auth.loginUser.centerId});
            setConfig(result.resultData[0]);
        }

        settingConfigSelect();
    }, {});
        

    /**
     * 운영관리 저장
     * @param {*} values 
     */
    const onSubmit = async (values) => {
        console.log(values);
        let param = {
            ...values,
            id: config.id,
            updatedAt : moment(new Date()).format('YYYY-MM-DD hh:mm'),
            updatedId : props.auth.loginUser.id,
            updateder : props.auth.loginUser.userName
        }
        
        let result = await api.settingConfigEdit(param);

        if (result.resultCode == "200") {
            toast.info("운영이 저장 완료되었습니다.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })

            this.settingConfigSelect();

        } else {
            toast.error("운영이 저장 실패하였습니다.", {
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
                                운영 관리
                            </h3>
                        </div>
                        <div className="card-toolbar">
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
                            <label className="font-size-h6 font-weight-bolder text-dark">예약 가능 시간</label>
                                <span className="form-text text-muted">로그인 아이디로 사용됩니다.</span>
                                <div className="form-group row">
                                  <div className="col-xl-3 col-lg-3 col-md-8 col-sm-6">
                                    <input type="number" className="form-control form-control-lg form-control-solid" 
                                      name="reservPublicTime"
                                      ref={register({
                                          required: "Required",
                                      })}
                                      defaultValue={config.reservPublicTime}/>
                                  </div>
                                  <div className="col-xl-2 col-lg-2 col-md-4 col-sm-6">
                                    <select className="form-control form-control-lg form-control-solid" 
                                          name="reservPublicUnit"
                                          ref={register({
                                              required: "Required",
                                          })}>
                                          <option selected={config.reservPublicUnit == 'minute'} value='minute'>분</option>
                                          <option selected={config.reservPublicUnit == 'hour'} value='hour'>시간</option>
                                          <option selected={config.reservPublicUnit == 'day'} value='day'>일</option>
                                      </select>
                                  </div>
                                </div>

                                <label className="font-size-h6 font-weight-bolder text-dark">예약 수정 가능 시간</label>
                                <span className="form-text text-muted">로그인 아이디로 사용됩니다.</span>
                                <div className="form-group row">
                                  <div className="col-xl-3 col-lg-4">
                                    <input type="number" className="form-control form-control-lg form-control-solid" 
                                      name="reservModifyTime"
                                      ref={register({
                                          required: "Required",
                                      })}
                                      defaultValue={config.reservModifyTime}/>
                                  </div>
                                  <div className="col-xl-2 col-lg-4">
                                    <select className="form-control form-control-lg form-control-solid" 
                                          name="reservModifyUnit"
                                          ref={register({
                                              required: "Required",
                                          })}>
                                          <option selected={config.reservModifyUnit == 'minute'} value='minute'>분</option>
                                          <option selected={config.reservModifyUnit == 'hour'} value='hour'>시간</option>
                                          <option selected={config.reservModifyUnit == 'day'} value='day'>일</option>
                                      </select>
                                  </div>
                                </div>

                                <label className="font-size-h6 font-weight-bolder text-dark">예약 취소 가능 시간</label>
                                <span className="form-text text-muted">로그인 아이디로 사용됩니다.</span>
                                <div className="form-group row">
                                  <div className="col-xl-3 col-lg-4">
                                    <input type="number" className="form-control form-control-lg form-control-solid" 
                                      name="reservCancleTime"
                                      ref={register({
                                          required: "Required",
                                      })}
                                      defaultValue={config.reservCancleTime}/>
                                  </div>
                                  <div className="col-xl-2 col-lg-4">
                                      <select className="form-control form-control-lg form-control-solid" 
                                          name="reservCancleUnit"
                                          ref={register({
                                              required: "Required",
                                          })}>
                                          <option selected={config.reservCancleUnit == 'minute'} value='minute'>분</option>
                                          <option selected={config.reservCancleUnit == 'hour'} value='hour'>시간</option>
                                          <option selected={config.reservCancleUnit == 'day'} value='day'>일</option>
                                      </select>
                                  </div>
                                </div>
                            </Col>
                            <Col lg={6}>
                                <label className="font-size-h6 font-weight-bolder text-dark">출석 가능 시간</label>
                                <span className="form-text text-muted">로그인 아이디로 사용됩니다.</span>
                                <div className="form-group row">
                                  <div className="col-xl-3 col-lg-4">
                                    <input type="number" className="form-control form-control-lg form-control-solid" 
                                      name="attendancePublicTime"
                                      ref={register({
                                          required: "Required",
                                      })}
                                      defaultValue={config.attendancePublicTime}/>
                                  </div>
                                  <div className="col-xl-2 col-lg-4">
                                     <select className="form-control form-control-lg form-control-solid" 
                                          name="attendancePublicUnit"
                                          ref={register({
                                              required: "Required",
                                          })}>
                                          <option selected={config.attendancePublicUnit == 'minute'} value='minute'>분</option>
                                          <option selected={config.attendancePublicUnit == 'hour'} value='hour'>시간</option>
                                          <option selected={config.attendancePublicUnit == 'day'} value='day'>일</option>
                                      </select>
                                  </div>
                                </div>

                                <label className="font-size-h6 font-weight-bolder text-dark">지각 처리 시간</label>
                                <span className="form-text text-muted">로그인 아이디로 사용됩니다.</span>
                                <div className="form-group row">
                                  <div className="col-xl-3 col-lg-4">                                    
                                    <input type="number" className="form-control form-control-lg form-control-solid" 
                                      name="tardyAfterTime"
                                      ref={register({
                                          required: "Required",
                                      })}
                                      defaultValue={config.tardyAfterTime}/>
                                  </div>
                                  <div className="col-xl-2 col-lg-4">
                                    <select className="form-control form-control-lg form-control-solid" 
                                          name="tardyAfterUnit"
                                          ref={register({
                                              required: "Required",
                                          })}>
                                          <option selected={config.tardyAfterUnit == 'minute'} value='minute'>분</option>
                                          <option selected={config.tardyAfterUnit == 'hour'} value='hour'>시간</option>
                                          <option selected={config.tardyAfterUnit == 'day'} value='day'>일</option>
                                      </select>
                                  </div>
                                </div>

                                <label className="font-size-h6 font-weight-bolder text-dark">만기 알림 시간</label>
                                <span className="form-text text-muted">로그인 아이디로 사용됩니다.</span>
                                <div className="form-group row">
                                  <div className="col-xl-3 col-lg-4">
                                    <input type="number" className="form-control form-control-lg form-control-solid" 
                                      name="maturityTime"
                                      ref={register({
                                          required: "Required",
                                      })}
                                      defaultValue={config.maturityTime}/>
                                  </div>
                                  <div className="col-xl-2 col-lg-4">
                                    <select className="form-control form-control-lg form-control-solid" 
                                          name="maturityUnit"
                                          ref={register({
                                              required: "Required",
                                          })}>
                                          <option selected={config.maturityUnit == 'minute'} value='minute'>분</option>
                                          <option selected={config.maturityUnit == 'hour'} value='hour'>시간</option>
                                          <option selected={config.maturityUnit == 'day'} value='day'>일</option>
                                      </select>
                                  </div>
                                </div>
                            </Col>
                        </Row>
                        
                        <div className="separator separator-dashed my-8" />

                        <Row>
                            <Col lg={6}>
                                <label className="font-size-h6 font-weight-bolder text-dark">등록</label>
                                <div className="d-flex align-items-center">
                                    <div className="d-flex flex-column font-weight-bold">
                                        <span className="text-dark mb-1 font-size-lg">{config.createder}</span>
                                        <span className="text-muted">{config.createdAt}</span>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={6}>
                                <label className="font-size-h6 font-weight-bolder text-dark">수정</label>
                                <div className="d-flex align-items-center">
                                    <div className="d-flex flex-column font-weight-bold">
                                        <span className="text-dark mb-1 font-size-lg">{config.createder}</span>
                                        <span className="text-muted">{config.createdAt}</span>
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


export default ConfigComponent;