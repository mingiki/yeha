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

export const LessonEditComponent = (props) => {
    
    const api = new ApiService();
    const Lesson = props.Lesson.selectData;
    const category = props.Lesson.selectCategoryData;

    const { handleSubmit, register, errors , control } = useForm();
    const [redirectPath, setRedirectPath] = useState(null);
        
    /**
     * 회원권 수정
     * @param {*} values 
     */
    const onSubmit = async (values) => {
        let param = {
            ...values,
            id: Lesson.id,
            updatedAt : moment(new Date()).format('YYYY-MM-DD hh:mm'),
            updatedId : props.auth.loginUser.id,
            updateder : props.auth.loginUser.userName
        }
        
        let result = await api.settingLessonEdit(param);

        if (result.resultCode == "200") {
            toast.info("회원권 수정이 완료되었습니다.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })

            setRedirectPath("setting/lesson");

        } else {
            toast.error("회원권 수정이 실패하였습니다.", {
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
                                {category.name} 회원권 등록
                            </h3>
                        </div>
                        <div className="card-toolbar">
                            <button
                                type="button"
                                onClick={()=> {setRedirectPath("/setting/lesson")}}
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
                        <div className="form-group row">
                            <div className="col-xl-3 col-lg-4 col-md-6">
                                <label className="font-size-h6 font-weight-bolder text-dark">회원권 명</label>
                                <input className="form-control form-control-lg form-control-solid" type="text" 
                                    name="name"
                                    ref={register({
                                        required: "Required",
                                    })}
                                    defaultValue={Lesson.name}
                                    placeholder="회원권명을 입력해주세요."/>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6">
                                <label className="font-size-h6 font-weight-bolder text-dark">가격</label>
                                <input className="form-control form-control-lg form-control-solid" type="number" 
                                    name="price"
                                    ref={register({
                                        required: "Required",
                                    })}
                                    defaultValue={Lesson.price}
                                    placeholder="가격을 입력해주세요."/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-xl-6 col-lg-4 col-md-6">
                                <label className="font-size-h6 font-weight-bolder text-dark">유효기간</label>
                                <div className="form-group row">
                                    <div className="col-xl-3 col-lg-3 col-md-8 col-sm-6">
                                        <input type="number" className="form-control form-control-lg form-control-solid" 
                                            name="validityDate"
                                            defaultValue={Lesson.validityDate}
                                            placeholder="유효기간을 입력해주세요."
                                            ref={register({
                                                required: "Required",
                                            })}
                                            />
                                    </div>
                                    <div className="col-xl-2 col-lg-2 col-md-4 col-sm-6">
                                        <select className="form-control form-control-lg form-control-solid" 
                                            name="validityDateUnit"
                                            defaultValue={Lesson.validityDateUnit}
                                            ref={register({
                                                required: "Required",
                                            })}>
                                            <option selected={Lesson.validityDateUnit == 'month'} value='month'>월</option>
                                            <option  selected={Lesson.validityDateUnit == 'year'} value='year'>년</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-xl-3 col-lg-4 col-md-6">
                                <label className="font-size-h6 font-weight-bolder text-dark">세션분류</label>
                                <select className="form-control form-control-lg form-control-solid" 
                                    name="type"
                                    defaultValue={Lesson.type}
                                    ref={register({
                                        required: "Required",
                                    })}>
                                    <option selected={Lesson.type == 'session'} value='session'>세션제</option>
                                    <option selected={Lesson.type == 'period'} value='period'>기간제</option>
                                </select>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6">
                                <label className="font-size-h6 font-weight-bolder text-dark">세션수</label>
                                <input className="form-control form-control-lg form-control-solid" type="number" 
                                    name="sessionCnt"
                                    defaultValue={Lesson.sessionCnt}
                                    ref={register({
                                        required: "Required",
                                    })}
                                    placeholder="세션수를 입력해주세요."/>
                            </div>
                        </div>        
                        <div className="form-group row">
                            <div className="col-xl-3 col-lg-4 col-md-6">
                                <label className="font-size-h6 font-weight-bolder text-dark">최대 예약 횟수</label>
                                <input className="form-control form-control-lg form-control-solid" type="number" 
                                    name="totalMaxCnt"
                                    defaultValue={Lesson.totalMaxCnt}
                                    ref={register({
                                        required: "Required",
                                    })}
                                    placeholder="최대 예약횟수를 입력해주세요."/>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6">
                                <label className="font-size-h6 font-weight-bolder text-dark">최대 일 예약 횟수</label>
                                <input className="form-control form-control-lg form-control-solid" type="number" 
                                    name="dayMaxCnt"
                                    defaultValue={Lesson.dayMaxCnt}
                                    ref={register({
                                        required: "Required",
                                    })}
                                    placeholder="최대 일 예약횟수를 입력해주세요."/>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6">
                                <label className="font-size-h6 font-weight-bolder text-dark">최대 주간 예약 횟수</label>
                                <input className="form-control form-control-lg form-control-solid" type="number" 
                                    name="weekMaxCnt"
                                    defaultValue={Lesson.weekMaxCnt}
                                    ref={register({
                                        required: "Required",
                                    })}
                                    placeholder="최대 주간 예약횟수를 입력해주세요."/>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6">
                                <label className="font-size-h6 font-weight-bolder text-dark">최대 월 예약 횟수</label>
                                <input className="form-control form-control-lg form-control-solid" type="number" 
                                    name="monthMaxCnt"
                                    defaultValue={Lesson.monthMaxCnt}
                                    ref={register({
                                        required: "Required",
                                    })}
                                    placeholder="최대 월 예약 횟수를 입력해주세요."/>
                            </div>        
                        </div>      
                    </div>
                        
                </div> 
            </form>

        </>
    );
};


export default LessonEditComponent;