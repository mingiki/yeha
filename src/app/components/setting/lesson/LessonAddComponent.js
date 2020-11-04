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

export const LessonAddComponent = (props) => {
    
    const api = new ApiService();
    const category = props.lesson.selectCategoryData;

    const { handleSubmit, register, errors , control } = useForm();

    const [redirectPath, setRedirectPath] = useState(null);
    const [groups, setGroups] = useState([]);
    const [selectGroup, setSelectGroups] = useState(null);

    // useEffect(() => {
    //     const settingGroupList = async () => {
    //         const result = await api.settingGroupList({centerId : props.auth.loginUser.centerId});
    //         setGroups(result.resultData);
    //     }

    //     settingGroupList();
    // }, []);
        
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
     * 회원권 저장
     * @param {*} values 
     */
    const onSubmit = async (values) => {
        let param = {
            ...values,
            status : "active",
            category : {
                name : category.name,
                id : category.id
            },
            centerId : props.auth.loginUser.centerId,
            createdAt : moment(new Date()).format('YYYY-MM-DD hh:mm'),
            createdId : props.auth.loginUser.id,
            createder : props.auth.loginUser.userName
        }
        
        let result = await api.settingLessonAdd(param);

        if (result.resultCode == "200") {
            toast.info("회원권 등록이 완료되었습니다.", {
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
            toast.error("회원권 등록이 실패하였습니다.", {
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
                                        {category.name} 수업 등록
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
                                            name="price"
                                            ref={register({
                                                required: "Required",
                                            })}
                                            placeholder="수업명을 입력해주세요."/>
                                    </div>
                                    <div className="col-6">
                                        <label className="font-size-h6 font-weight-bolder text-dark">수업시간</label>
                                        <input className="form-control form-control-lg form-control-solid" type="number" 
                                            name="price"
                                            ref={register({
                                                required: "Required",
                                            })}
                                            defaultValue={50}
                                            placeholder="수업시간을 입력해주세요."/>
                                    </div>
                                </div>
                                            
                                <div className="form-group row">     
                                    <div className="col-6">
                                        <label className="font-size-h6 font-weight-bolder text-dark">담당강사</label>
                                        <select className="form-control form-control-lg form-control-solid" 
                                            name="type"
                                            ref={register({
                                                required: "Required",
                                            })}>
                                            <option value='session'>세션제</option>
                                            <option value='period'>기간제</option>
                                        </select>
                                    </div>
                                    <div className="col-6">
                                        <label className="font-size-h6 font-weight-bolder text-dark">수업정원</label>
                                        <input className="form-control form-control-lg form-control-solid" type="number" 
                                            name="price"
                                            ref={register({
                                                required: "Required",
                                            })}
                                            defaultValue={1}
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
                                            <option value='session'>세션제</option>
                                            <option value='period'>기간제</option>
                                        </select>
                                    </div>  
                                    <div className="col-6">
                                        <label className="font-size-h6 font-weight-bolder text-dark">차감횟수</label>
                                        <input className="form-control form-control-lg form-control-solid" type="number" 
                                            name="price"
                                            ref={register({
                                                required: "Required",
                                            })}
                                            defaultValue={1}
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
                                        name="attendancePublicTime"
                                        defaultValue={1}
                                        ref={register({
                                            required: "Required",
                                        })}/>
                                    </div>
                                    <div className="col-xl-3 col-lg-4">
                                        <select className="form-control form-control-lg form-control-solid" 
                                            name="attendancePublicUnit"
                                            ref={register({
                                                required: "Required",
                                            })}>
                                            <option value='hour'>시간</option>
                                            <option value='day'>일</option>
                                            <option value='day'>주</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-6">
                                        <label className="font-size-h6 font-weight-bolder text-dark">스케줄 색상</label>
                                        <input className="form-control form-control-lg form-control-solid" 
                                            style={{width: "80px"}}
                                            type="color" 
                                            name="price"
                                            ref={register({
                                                required: "Required",
                                            })}
                                            placeholder="가격을 입력해주세요."/>
                                    </div>
                                    <div className="col-6">
                                        <label className="font-size-h6 font-weight-bolder text-dark">잔여인원 노출</label>
                                        <span class="switch switch-outline switch-icon switch-success">
                                            <label>
                                                <input 
                                                    type="checkbox" 
                                                    name="select"
                                                    ref={register({
                                                        required: "Required",
                                                    })}/>
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


export default LessonAddComponent;