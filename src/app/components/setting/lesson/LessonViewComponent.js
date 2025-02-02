
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
                                <label className="col-4 col-form-label">수업명:</label>
                                <div className="col-8">
                                    <span className="form-control-plaintext font-weight-bolder">{lesson.name}</span>
                                </div>
                            </div>
                            <div className="form-group row my-2">
                                <label className="col-4 col-form-label">수업시간:</label>
                                <div className="col-8">
                                    <span className="form-control-plaintext font-weight-bolder">{lesson.lessonTime}</span>
                                </div>
                            </div>
                            <div className="form-group row my-2">
                                <label className="col-4 col-form-label">담당강사:</label>
                                <div className="col-8">
                                    <span className="form-control-plaintext font-weight-bolder">{lesson.instruct.name}</span>
                                </div>
                            </div>
                            <div className="form-group row my-2">
                                <label className="col-4 col-form-label">수업정원:</label>
                                <div className="col-8">
                                    <span className="form-control-plaintext font-weight-bolder">{lesson.maxCnt}</span>
                                </div>
                            </div>
                            <div className="form-group row my-2">
                                <label className="col-4 col-form-label">분류:</label>
                                <div className="col-8">
                                    <span className="form-control-plaintext font-weight-bolder">{lesson.type}</span>
                                </div>
                            </div>
                            <div className="form-group row my-2">
                                <label className="col-4 col-form-label">차감횟수:</label>
                                <div className="col-8">
                                    <span className="form-control-plaintext font-weight-bolder">{lesson.deductionCnt}</span>
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
                                    <span className="d-block text-muted pt-2 font-size-sm">회원권에서 정해진 횟수값으로 예약의 수용치를 정합니다.</span>
                                </h3>
                            </div>
                        </div>
                        <div className="card-body py-4">
                            <div className="form-group row my-2">
                                <label className="col-4 col-form-label">스케줄 오픈시점:</label>
                                <div className="col-8">
                                    <span className="form-control-plaintext font-weight-bolder">{lesson.openTime} {lesson.openTimeUnit}</span>
                                </div>
                            </div>
                            <div className="form-group row my-2">
                                <label className="col-4 col-form-label">스케줄 색상:</label>
                                <div className="col-8">
                                    <span className="form-control-plaintext font-weight-bolder">{lesson.color}</span>
                                </div>
                            </div>
                            <div className="form-group row my-2">
                                <label className="col-4 col-form-label">잔여인원 노출:</label>
                                <div className="col-8">
                                    <span className="form-control-plaintext font-weight-bolder">{lesson.isShowUserCnt}</span>
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