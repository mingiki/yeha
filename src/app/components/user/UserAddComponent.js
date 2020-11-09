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

export const UserAddComponent = (props) => {
    
    const api = new ApiService();
    // const category = props.user.selectCategoryData;

    const { handleSubmit, register, errors , control } = useForm();

    const [redirectPath, setRedirectPath] = useState(null);
    const [membershipList, setMembershipList] = useState([]);
    const [selectMembership, setSelectMembership] = useState(null);

    useEffect(() => {
        const settingMembershipAllList = async () => {
            const result = await api.settingMembershipAllList({centerId : props.auth.loginUser.centerId});
            setMembershipList(result.resultData);
        }

        settingMembershipAllList();
    }, []);

    const onChangeMembership = (e) =>{
        const mbmershipId = e.target.value;
        let selectMembership = null;

        membershipList.map((membership) => {
            if (membership.id == mbmershipId) {
                selectMembership = membership;
            }
        })

        setSelectMembership(selectMembership);
    }

    /**
     * 수업 저장
     * @param {*} values 
     */
    const onSubmit = async (values) => {

        const selectInstructor = null;
        // instructorList.map ((instructor) => {
        //     if (instructor.id == values.instructor) {
        //         selectInstructor = instructor;
        //     }
        // }) 

        let param = {
            name : values.name,
            email : values.email,
            password : values.password,
            sex : values.sex,
            tel : values.tel,
            status : "ready",
            centerId : props.auth.loginUser.centerId,
            createdAt : moment(new Date()).format('YYYY-MM-DD hh:mm'),
            createdId : props.auth.loginUser.id,
            createder : props.auth.loginUser.userName
        }
        
        let result = await api.userAdd(param);

        if (values.membership) {

        }

        if (result.resultCode == "200") {
            toast.info("회원 등록이 완료되었습니다.", {
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
            toast.error("회원 등록이 실패하였습니다.", {
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
                                        회원 등록
                                    </h3>
                                </div>
                                <div className="card-toolbar">
                                    <button
                                        type="button"
                                        onClick={()=> {setRedirectPath("/setting/User")}}
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
                                        <label className="font-size-h6 font-weight-bolder text-dark">이름</label>
                                        <input className="form-control form-control-lg form-control-solid" type="text" 
                                            name="name"
                                            ref={register({
                                                required: "Required",
                                            })}
                                            placeholder="회원명 입력해주세요."/>
                                    </div>
                                    <div className="col-6">
                                        <label className="font-size-h6 font-weight-bolder text-dark">연락처</label>
                                        <input className="form-control form-control-lg form-control-solid" type="text" 
                                            name="tel"
                                            ref={register({
                                                required: "Required",
                                            })}
                                            defaultValue={50}
                                            placeholder="연락처를 입력해주세요."/>
                                    </div>
                                </div>
                                            
                                <div className="form-group row">     
                                    <div className="col-6">
                                        <label className="font-size-h6 font-weight-bolder text-dark">성별</label>
                                        <input className="form-control form-control-lg form-control-solid" type="number" 
                                            name="sex"
                                            ref={register({
                                                required: "Required",
                                            })}
                                            defaultValue={1}
                                            placeholder="수업정원을 입력해주세요."/>
                                    </div>
                                    <div className="col-6">
                                        <label className="font-size-h6 font-weight-bolder text-dark">생년월일</label>
                                        <div className="input-group input-group-lg input-group-solid">
                                            <Controller
                                                control={control}
                                                name="birthDay"
                                                defaultValue={new Date()}
                                                render={({ onChange, onBlur, value}) => (
                                                    <TextField
                                                        type="date"
                                                        defaultValue={moment(value).format('YYYY-MM-DD')}
                                                        InputProps={{ disableUnderline: true }}
                                                        className="form-control form-control-lg form-control-solid"
                                                    />
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <div className="col-6">
                                        <label className="font-size-h6 font-weight-bolder text-dark">이메일</label>
                                        <input className="form-control form-control-lg form-control-solid" type="text" 
                                            name="email"
                                            ref={register({
                                                required: "Required",
                                            })}
                                            placeholder="수업명을 입력해주세요."/>
                                    </div>
                                    <div className="col-6">
                                        <label className="font-size-h6 font-weight-bolder text-dark">비밀번호</label>
                                        <input className="form-control form-control-lg form-control-solid" type="password" 
                                            name="password"
                                            ref={register({
                                                required: "Required",
                                            })}
                                            defaultValue={50}
                                            placeholder="수업시간을 입력해주세요."/>
                                    </div>
                                </div>       


                            </div>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="card card-custom gutter-b">
                            <div className="card-header h-auto py-4">
                                <div className="card-title">
                                    <h3 className="card-label">회원권 정보
                                        <span className="d-block text-muted pt-2 font-size-sm">예약 스케줄에 관련된 정보입니다.</span>
                                    </h3>
                                </div>
                            </div>
                            <div className="card-body py-4">
                                <div className="form-group row">
                                    <div className="col-6">
                                        <label className="font-size-h6 font-weight-bolder text-dark">회원권</label>
                                        <select className="form-control form-control-lg form-control-solid" 
                                            name="membrship"
                                            onChange={onChangeMembership}    
                                            ref={register({
                                                required: "Required",
                                            })}>
                                                <option value=''>회원권을 선택해주세요.</option>
                                            {
                                                membershipList.map((membership)=>{
                                                    return  <option key={membership.id} value={membership.id}>{membership.name}</option>
                                                })
                                            }
                                        </select>    
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-6">
                                        <label className="font-size-h6 font-weight-bolder text-dark">시작일</label>
                                        <div className="input-group input-group-lg input-group-solid">
                                            <Controller
                                                control={control}
                                                name="enterDate"
                                                defaultValue={new Date()}
                                                render={({ onChange, onBlur, value}) => (
                                                    <TextField
                                                        type="date"
                                                        defaultValue={moment(value).format('YYYY-MM-DD')}
                                                        InputProps={{ disableUnderline: true }}
                                                        className="form-control form-control-lg form-control-solid"
                                                    />
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <label className="font-size-h6 font-weight-bolder text-dark">종료일</label>
                                    </div>
                                </div>

                                <div className="separator separator-solid" style={{margin: "20px 0px" , borderColor: "#EBEDF3"}} />

                                <div className="form-group row">
                                    <div className="col-6">
                                        <label className="font-size-h6 font-weight-bolder text-dark">회원권금액</label>
                                        <input className="form-control form-control-lg form-control-solid" 
                                            type="number" 
                                            name="price"
                                            readOnly={true}
                                            ref={register({
                                                required: "Required",
                                            })}
                                            defaultValue={selectMembership?.price}
                                            placeholder="회원권을 선택해주세요."/>
                                    </div>
                                    <div className="col-6">
                                        <label className="font-size-h6 font-weight-bolder text-dark">할인율</label>
                                        <input className="form-control form-control-lg form-control-solid" 
                                            type="number" 
                                            name="name"
                                            ref={register({
                                                required: "Required",
                                            })}
                                            placeholder="할인율을 입력해주세요."/>
                                    </div>
                                </div>     

                                <div className="form-group row">
                                    <div className="col-6">
                                        <label className="font-size-h6 font-weight-bolder text-dark">카드</label>
                                        <input className="form-control form-control-lg form-control-solid" 
                                            type="number" 
                                            name="name"
                                            ref={register({
                                                required: "Required",
                                            })}
                                            placeholder="카드결제금액을 입력해주세요."/>
                                    </div>
                                    <div className="col-6">
                                        <label className="font-size-h6 font-weight-bolder text-dark">현금</label>
                                        <input className="form-control form-control-lg form-control-solid" 
                                            type="number" 
                                            name="name"
                                            ref={register({
                                                required: "Required",
                                            })}
                                            placeholder="현금결제금액 입력해주세요."/>
                                    </div>
                                </div>     

                                <div className="form-group row">
                                    <div className="col-6">
                                        <label className="font-size-h6 font-weight-bolder text-dark">총 결제금액</label>
                                        <input className="form-control form-control-lg form-control-solid" 
                                            type="number" 
                                            name="name"
                                            ref={register({
                                                required: "Required",
                                            })}
                                            placeholder="총 결제금액을 입력해주세요."/>
                                    </div>
                                    <div className="col-6">
                                        <label className="font-size-h6 font-weight-bolder text-dark">결제일</label>
                                        <div className="input-group input-group-lg input-group-solid">
                                            <Controller
                                                control={control}
                                                name="enterDate"
                                                defaultValue={new Date()}
                                                render={({ onChange, onBlur, value}) => (
                                                    <TextField
                                                        type="date"
                                                        defaultValue={moment(value).format('YYYY-MM-DD')}
                                                        InputProps={{ disableUnderline: true }}
                                                        className="form-control form-control-lg form-control-solid"
                                                    />
                                                )}
                                            />
                                        </div>
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


export default UserAddComponent;