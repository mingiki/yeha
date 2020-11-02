import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useForm , Controller } from "react-hook-form";

import { toast } from 'react-toastify';
import { registerLocale } from "react-datepicker";

import moment from 'moment';
import ApiService from "../../../../service/ApiService";

export const MembershipCategoryAddModal = (props) => {

    const api = new ApiService();
    const { handleSubmit, register, errors , control } = useForm();

    /**
     * 강사 저장
     * @param {*} values 
     */
    const onSubmit = async (values) => {
      
        let param = {
            ...values,
            type : "membership",
            centerId : props.auth.loginUser.centerId,
            createdAt : moment(new Date()).format('YYYY-MM-DD hh:mm'),
            createdId : props.auth.loginUser.id,
            createder : props.auth.loginUser.userName
        }
        
        let result = await api.settingCategoryAdd(param);

        if (result.resultCode == "200") {
            toast.info("카테고리등록이 완료되었습니다.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })

            props.initCategory();
            props.onHide();

        } else {
            toast.error("카테고리등록이 실패하였습니다.", {
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
            <Modal
                {...props}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                        카테고리 등록
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group row">
                            <div className="col-12">
                                <label className="font-size-h6 font-weight-bolder text-dark">카테고리명</label>
                                <input className="form-control form-control-lg form-control-solid" type="text" 
                                    name="name"
                                    defaultValue={""}
                                    ref={register({
                                        required: "Required",
                                    })}
                                    placeholder="카테고리명을 입력해주세요."/>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            type="submit"
                            className="btn btn-primary ml-2"
                        >
                            <i className="far fa-save"></i>
                            저장
                        </button>
                    </Modal.Footer>
                </form>
            </Modal>
            
            
        </>
    );
};


export default MembershipCategoryAddModal;