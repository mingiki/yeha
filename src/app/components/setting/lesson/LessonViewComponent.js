
import React, { useState } from "react";
import {Redirect} from "react-router-dom";

import Swal from 'sweetalert2'
import { toast } from 'react-toastify';
import { CustomInput, Row, Col } from "reactstrap"

import ApiService from "../../../service/ApiService";

export const LessonViewComponent = (props) => {
    const api = new ApiService();
    const [redirectPath, setRedirectPath] = useState(null);
    const lesson = props.lesson.selectData;

    /**
     * 강사 삭제
     * @param {*} values 
     */
    const deleteLesson = async (id) => {
        Swal.fire({
            title: '삭제하시겠습니까?',
            text: '삭제 시 원복할 수 없습니다.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '삭제',
            cancelButtonText: '취소'
          }).then(async (result) => {
            if (result.value) {
                let param = {
                    id : id
                }
                let result = await api.settingLessonDelete(param);
        
                if (result.resultCode == "200") {
                    toast.info("직원이 삭제되었습니다.", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
        
                    setRedirectPath("/setting/lesson")
                }
            } 
          })
    }

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

            <Row>
                <Col lg={12}>
                    <div className="card card-custom gutter-b">
                        <div className="card-header">
                            <div className="card-title">
                                <span className="card-icon">
                                    <i className="flaticon2-group text-primary"></i>
                                </span> 
                                <h3 className="card-label">
                                    {lesson.name}
                                    <span className="d-block text-muted pt-2 font-size-sm">
                                    등록 : {lesson.createder ? lesson.createder + ` (${lesson.createdAt})` : '없음'}
                                    </span>
                                    <span className="d-block text-muted pt-2 font-size-sm">
                                    수정 : {lesson.updateder ? lesson.updateder + ` (${lesson.updatedAt})` : '없음'} 
                                    </span>
                                </h3>
                            </div>
                            <div className="card-toolbar">
                                <button
                                    type="button"
                                    onClick={()=> {setRedirectPath("/setting/lesson")}}
                                    className="btn btn-light"
                                >
                                    <i className="fa fa-arrow-left"></i>
                                    목록
                                </button>
                                {`  `}
                                <button 
                                    type="button"
                                    className="btn btn-light ml-2"
                                    onClick={()=> {setRedirectPath(`/setting/lesson/edit/${lesson.id}`)}}
                                >
                                    <i className="fa fa-redo"></i>
                                    수정
                                </button>
                                {`  `}
                                <button
                                    type="button"
                                    className="btn btn-primary ml-2"
                                    onClick={()=> {deleteLesson(lesson.id)}}
                                >
                                    <i className="fa fa-trash"></i>
                                    삭제
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
                                    <span className="d-block text-muted pt-2 font-size-sm">회원권의 가격으로 결제금액이 정해집니다.</span>
                                </h3>
                            </div>
                        </div>
                        <div className="card-body py-4">
                            <div className="form-group row my-2">
                                <label className="col-4 col-form-label">카테고리:</label>
                                <div className="col-8">
                                    <span className="form-control-plaintext font-weight-bolder">{lesson.category.name}</span>
                                </div>
                            </div>
                            <div className="form-group row my-2">
                                <label className="col-4 col-form-label">분류:</label>
                                <div className="col-8">
                                    <span className="form-control-plaintext font-weight-bolder">{lesson.type}</span>
                                </div>
                            </div>
                            <div className="form-group row my-2">
                                <label className="col-4 col-form-label">세션수:</label>
                                <div className="col-8">
                                    <span className="form-control-plaintext font-weight-bolder">{lesson.sessionCnt}</span>
                                </div>
                            </div>
                            <div className="form-group row my-2">
                                <label className="col-4 col-form-label">유효기간:</label>
                                <div className="col-8">
                                    <span className="form-control-plaintext font-weight-bolder">{lesson.validityDate} {lesson.validityDateUnit}</span>
                                </div>
                            </div>
                            <div className="form-group row my-2">
                                <label className="col-4 col-form-label">가격:</label>
                                <div className="col-8">
                                    <span className="form-control-plaintext font-weight-bolder">{lesson.price}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col lg={6}>
                    <div className="card card-custom gutter-b">
                        <div className="card-header h-auto py-4">
                            <div className="card-title">
                                <h3 className="card-label">예약 횟수 관련
                                    <span className="d-block text-muted pt-2 font-size-sm">회원권에서 정해진 횟수값으로 예약의 수용치를 정합니다.</span>
                                </h3>
                            </div>
                        </div>
                        <div className="card-body py-4">
                            <div className="form-group row my-2">
                                <label className="col-4 col-form-label">최대 예약 횟수:</label>
                                <div className="col-8">
                                    <span className="form-control-plaintext font-weight-bolder">{lesson.totalMaxCnt}</span>
                                </div>
                            </div>
                            <div className="form-group row my-2">
                                <label className="col-4 col-form-label">최대 일 예약 횟수:</label>
                                <div className="col-8">
                                    <span className="form-control-plaintext font-weight-bolder">{lesson.dayMaxCnt}</span>
                                </div>
                            </div>
                            <div className="form-group row my-2">
                                <label className="col-4 col-form-label">최대 주간 예약 횟수:</label>
                                <div className="col-8">
                                    <span className="form-control-plaintext font-weight-bolder">{lesson.weekMaxCnt}</span>
                                </div>
                            </div>
                            <div className="form-group row my-2">
                                <label className="col-4 col-form-label">최대 월 예약 횟수:</label>
                                <div className="col-8">
                                    <span className="form-control-plaintext font-weight-bolder">{lesson.monthMaxCnt}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>

        </>
    );
};


export default LessonViewComponent;