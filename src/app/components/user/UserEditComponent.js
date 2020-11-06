import React, { useState, useEffect } from "react";
import {Redirect} from "react-router-dom";
import { useForm , Controller } from "react-hook-form";

import TextField from '@material-ui/core/TextField';
import { toast } from 'react-toastify';
import { registerLocale } from "react-datepicker";
import { CustomInput, Row, Col } from "reactstrap"

import ko from 'date-fns/locale/ko';
import moment from 'moment';

import ApiService from "../../service/ApiService";

registerLocale('ko', ko);

export const UserEditComponent = (props) => {
    
    const api = new ApiService();
    const User = props.User.selectData;
    const category = props.User.selectCategoryData;

    const { handleSubmit, register, errors , control } = useForm();
    const [redirectPath, setRedirectPath] = useState(null);
    const [instructorList, setInstructorList] = useState([]);

    useEffect(() => {
        const settingInstructorList = async () => {
            const result = await api.settingInstructorList({centerId : props.auth.loginUser.centerId});
            setInstructorList(result.resultData);
        }

        settingInstructorList();
    }, []);

    /**
     * 회원권 수정
     * @param {*} values 
     */
    const onSubmit = async (values) => {
        let param = {
            ...values,
            id: User.id,
            updatedAt : moment(new Date()).format('YYYY-MM-DD hh:mm'),
            updatedId : props.auth.loginUser.id,
            updateder : props.auth.loginUser.userName
        }
        
        let result = await api.settingUserEdit(param);

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

            setRedirectPath("setting/User");

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

            <Row>
                <Col lg={12}>
                    <div className="card card-custom gutter-b">
                        <div className="card-header">
                            <div className="card-title">
                                <span className="card-icon">
                                    <i className="flaticon2-group text-primary"></i>
                                </span> 
                                <h3 className="card-label">
                                    {User.category.name} 수업 수정
                                </h3>
                            </div>
                            <div className="card-toolbar">
                                <button
                                    type="button"
                                    onClick={()=> {setRedirectPath(`/setting/User/view/${User.id}`)}}
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
                    </div> 
                </Col>
            </Row>

            <Row>
                <Col lg={6}>
                    <div className="card card-custom gutter-b">
                        <div className="card-header h-auto py-4">
                            <div className="card-title">
                                <h3 className="card-label">기본 정보 
                                    <span className="d-block text-muted pt-2 font-size-sm">
                                        예약에 필요한 수업 기본정보입니다.
                                    </span>
                                </h3>
                            </div>
                        </div>
                        <div className="card-body py-4">
                            <div className="form-group row">
                            
                                <div className="col-6">
                                    <label className="font-size-h6 font-weight-bolder text-dark">수업명</label>
                                    <input className="form-control form-control-lg form-control-solid" type="text" 
                                        name="name"
                                        ref={register({
                                            required: "Required",
                                        })}
                                        defaultValue={User.name}
                                        placeholder="수업명을 입력해주세요."/>
                                </div>
                                <div className="col-6">
                                    <label className="font-size-h6 font-weight-bolder text-dark">수업시간</label>
                                    <input className="form-control form-control-lg form-control-solid" type="number" 
                                        name="UserTime"
                                        ref={register({
                                            required: "Required",
                                        })}
                                        defaultValue={User.UserTime}
                                        placeholder="수업시간을 입력해주세요."/>
                                </div>
                            </div>
                                        
                            <div className="form-group row">     
                                <div className="col-6">
                                    <label className="font-size-h6 font-weight-bolder text-dark">담당강사</label>
                                    <select className="form-control form-control-lg form-control-solid" 
                                        name="instructor"
                                        ref={register({
                                            required: "Required",
                                        })}>
                                        {
                                            instructorList.map((instructor)=>{
                                                return  <option 
                                                    selected={User.instructor.id == instructor.id} 
                                                    value={instructor.id}>{instructor.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-6">
                                    <label className="font-size-h6 font-weight-bolder text-dark">수업정원</label>
                                    <input className="form-control form-control-lg form-control-solid" type="number" 
                                        name="maxCnt"
                                        ref={register({
                                            required: "Required",
                                        })}
                                        defaultValue={User.maxCnt}
                                        placeholder="수업정원을 입력해주세요."/>
                                </div>
                            </div>       


                            <div className="form-group row">
                                <div className="col-6">
                                    <label className="font-size-h6 font-weight-bolder text-dark">분류</label>
                                    <select className="form-control form-control-lg form-control-solid" 
                                        name="type"
                                        ref={register({
                                            required: "Required",
                                        })}>
                                        <option selected={User.type == 'session'}  value='session'>세션제</option>
                                        <option selected={User.type == 'period'}  value='period'>기간제</option>
                                    </select>
                                </div>  
                                <div className="col-6">
                                    <label className="font-size-h6 font-weight-bolder text-dark">차감횟수</label>
                                    <input className="form-control form-control-lg form-control-solid" type="number" 
                                        name="deductionCnt"
                                        ref={register({
                                            required: "Required",
                                        })}
                                        defaultValue={User.deductionCnt}
                                        placeholder="차감횟수를 입력해주세요."/>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col lg={6}>
                    <div className="card card-custom gutter-b">
                        <div className="card-header h-auto py-4">
                            <div className="card-title">
                                <h3 className="card-label">스케줄 정보
                                    <span className="d-block text-muted pt-2 font-size-sm">예약 스케줄에 관련된 정보입니다.</span>
                                </h3>
                            </div>
                        </div>
                        <div className="card-body py-4">
                            <label className="font-size-h6 font-weight-bolder text-dark">
                                스케줄 오픈시점
                                <span className="d-block text-muted pt-2 font-size-sm">수업을 등록하고 회원에게 수업이 보여지는 시점입니다.</span>
                            </label>
                        
                            <div className="form-group row">
                                <div className="col-xl-4 col-lg-4">
                                    <input type="number" className="form-control form-control-lg form-control-solid" 
                                    name="openTime"
                                    defaultValue={User.openTime}
                                    ref={register({
                                        required: "Required",
                                    })}/>
                                </div>
                                <div className="col-xl-3 col-lg-4">
                                    <select className="form-control form-control-lg form-control-solid" 
                                        name="openTimeUnit"
                                        ref={register({
                                            required: "Required",
                                        })}>
                                        <option selected={User.type == 'hour'} value='hour'>시간</option>
                                        <option selected={User.type == 'day'} value='day'>일</option>
                                        <option selected={User.type == 'week'} value='week'>주</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-6">
                                    <label className="font-size-h6 font-weight-bolder text-dark">스케줄 색상</label>
                                    <input className="form-control form-control-lg form-control-solid" 
                                        style={{width: "80px"}}
                                        type="color" 
                                        name="color"
                                        ref={register({
                                            required: "Required",
                                        })}
                                        defaultValue={User.color}
                                        placeholder="가격을 입력해주세요."/>
                                </div>
                                <div className="col-6">
                                    <label className="font-size-h6 font-weight-bolder text-dark">잔여인원 노출</label>
                                    <span class="switch switch-outline switch-icon switch-success">
                                        <label>
                                            <input 
                                                type="checkbox" 
                                                name="isShowUserCnt"
                                                defaultValue={User.isShowUserCnt}
                                                ref={register({})}/>
                                            <span></span>
                                        </label>
                                    </span>
                                </div>  
                            </div>

                        </div>
                    </div>

                </Col>
            </Row>

            </form>

        </>
    );
};


export default UserEditComponent;