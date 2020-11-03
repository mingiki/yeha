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

export const MembershipEditComponent = (props) => {
    const api = new ApiService();
    const Membership = props.Membership.selectData;

    const { handleSubmit, register, errors , control } = useForm();

    const [redirectPath, setRedirectPath] = useState(null);
    const [groups, setGroups] = useState([]);
    const [selectGroup, setSelectGroups] = useState(null);

    useEffect(() => {
        const settingGroupList = async () => {
            const result = await api.settingGroupList({centerId : props.auth.loginUser.centerId});

            let selectGroup = null;
            result.resultData.map((group)=>{
                if (group.id == Membership.group.id) {
                    selectGroup = group;
                }
            })

            setSelectGroups(selectGroup);
            setGroups(result.resultData);
        }

        settingGroupList();
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
            id: Membership.id,
            updatedAt : moment(new Date()).format('YYYY-MM-DD hh:mm'),
            updatedId : props.auth.loginUser.id,
            updateder : props.auth.loginUser.userName
        }
        
        let result = await api.settingMembershipEdit(param);

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

            setRedirectPath(`/setting/Membership/view/${Membership.id}`);

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
                                직원 등록
                            </h3>
                        </div>
                        <div className="card-toolbar">
                            <button
                                type="button"
                                onClick={()=> {setRedirectPath("/setting/Membership")}}
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
                                    <div className="col-xl-12">
                                        <div className="image-input image-input-outline" id="kt_user_edit_avatar" style={{backgroundImage: "url(assets/media/users/blank.png)"}}>
                                            <label className="font-size-h6 font-weight-bolder text-dark">사진</label>
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
                                    <div className="col-xl-4 col-lg-4 col-md-6">
                                        <label className="font-size-h6 font-weight-bolder text-dark">이메일</label>
                                        <div className="input-group input-group-lg input-group-solid">
                                            <input type="text" className="form-control form-control-lg form-control-solid" 
                                                name="email"
                                                defaultValue={Membership.email}
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
                                                defaultValue="yeha1234" readOnly={true} />
                                        </div>
                                        <span className="form-text text-muted">첫 로그인 시 사용되는 초기 비밀번호입니다.</span>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-xl-4 col-lg-4 col-md-6">
                                        <label className="font-size-h6 font-weight-bolder text-dark">이름</label>
                                        <input className="form-control form-control-lg form-control-solid" type="text" 
                                            name="name"
                                            defaultValue={Membership.name}
                                            ref={register({
                                                required: "Required",
                                            })}
                                            placeholder="이름을 입력해주세요."/>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-6">
                                        <label className="font-size-h6 font-weight-bolder text-dark">연락처</label>
                                        <div className="input-group input-group-lg input-group-solid">
                                            <input type="text" className="form-control form-control-lg form-control-solid" 
                                                name="phone"
                                                defaultValue={Membership.phone}
                                                ref={register({
                                                    required: "Required",
                                                })}
                                                placeholder="연락처를 입력해주세요." />
                                        </div>
                                        <span className="form-text text-muted">XXX-XXXX-XXXX 형식에 맞게 입력해주세요.</span>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <div className="col-xl-4 col-lg-4 col-md-6">
                                        <label className="font-size-h6 font-weight-bolder text-dark">생일</label>
                                        <div className="input-group input-group-lg input-group-solid">
                                            <Controller
                                                control={control}
                                                name="birthDay"
                                                defaultValue={Membership.birthDay}
                                                render={({ onChange, onBlur, value}) => (
                                                    <>
                                                    <TextField
                                                        type="date"
                                                        defaultValue={moment(value).format('YYYY-MM-DD')}
                                                        InputProps={{ disableUnderline: true }}
                                                        className="form-control form-control-lg form-control-solid"
                                                    />
                                                    </>
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-6">
                                        <label className="font-size-h6 font-weight-bolder text-dark">입사일</label>
                                        <div className="input-group input-group-lg input-group-solid">
                                            <Controller
                                                control={control}
                                                name="enterDate"
                                                defaultValue={Membership.enterDate}
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
                                    <div className="col-xl-12 col-lg-12">
                                        <label className="font-size-h6 font-weight-bolder text-dark">주소</label>
                                        <div className="input-group input-group-lg input-group-solid">
                                            <input type="text" className="form-control form-control-lg form-control-solid" 
                                                name="address"
                                                defaultValue={Membership.address}
                                                ref={register({
                                                    required: "Required",
                                                })}
                                                placeholder="주소를 입력해주세요." 
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="form-group row">
                                    <div className="col-xl-4 col-lg-4">
                                    <label className="font-size-h6 font-weight-bolder text-dark">그룹</label>
                                        <div className="input-group input-group-lg input-group-solid">
                                            <select className="form-control form-control-lg form-control-solid" 
                                                name="group"
                                                onChange={onChangeGroup}    
                                                ref={register({
                                                    required: "Required",
                                                })}
                                                placeholder="그룹을 선택해주세요." >
                                                <option value=''>그룹을 선택해주세요.</option>
                                                {
                                                    groups.map((group)=>{
                                                        return <>
                                                            <option value={group.id} selected={group.id == Membership.group.id}>{group.name}</option>
                                                        </>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <Row>
                                    <Col lg={12}>
                                        <label className="font-size-h6 font-weight-bolder text-dark">그룹 기능권한</label>
                                        {selectGroup != null ? <>
                                            <div className="table">
                                                <table className="custom-table table" style={{border: "1px solid #EBEDF3"}}>
                                                    <thead>
                                                        <tr style={{ backgroundColor : "#7E8299" , color : "#ffff" , textAlign : "center"}}>
                                                            <th>메뉴명</th>
                                                            <th>권한</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                        selectGroup.menus.map((menu)=>{
                                                            return <tr>
                                                                <th scope="row" style={{textAlign: "center" , verticalAlign: "middle"}}>
                                                                    <CustomInput inline 
                                                                    type="checkbox" 
                                                                    id={menu.menuId} 
                                                                    label={menu.menuName}
                                                                    readOnly={true}
                                                                    checked={menu.isOpen}/>
                                                                </th>
                                                                <td>
                                                                    {
                                                                        menu.sub ? <>
                                                                            <div className="table">
                                                                                <table className="custom-table table">
                                                                                    <colgroup>
                                                                                        <col width="30%" />
                                                                                        <col width="70%" />
                                                                                    </colgroup>
                                                                                    <thead>
                                                                                        <tr>
                                                                                            <th>메뉴명</th>
                                                                                            <th>권한</th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                            {
                                                                                                menu.sub.map((sub) => {
                                                                                                    return <tr>
                                                                                                        <th scope="row">
                                                                                                            <CustomInput inline 
                                                                                                                type="checkbox" 
                                                                                                                id={sub.menuId} 
                                                                                                                label={sub.menuName}
                                                                                                                readOnly={true}
                                                                                                                checked={sub.isOpen} />
                                                                                                        </th>
                                                                                                        <td>                                                                                              
                                                                                                            <>
                                                                                                                <CustomInput inline type="checkbox" id={sub.menuId + "Add"} key={sub.menuId + "Add"} readOnly={true} checked={sub.actionAuth.add} label="등록" />
                                                                                                                <CustomInput inline type="checkbox" id={sub.menuId + "Edit"} key={sub.menuId + "Edit"} readOnly={true} checked={sub.actionAuth.edit} label="수정" />
                                                                                                                <CustomInput inline type="checkbox" id={sub.menuId + "Delete"} key={sub.menuId + "Delete"} readOnly={true} checked={sub.actionAuth.delete} label="삭제" />
                                                                                                            </>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                })
                                                                                            }
                                                                                    </tbody>
                                                                                </table>                
                                                                            </div>
                                                                        </> : <>
                                                                            <CustomInput inline type="checkbox" id={menu.menuId + "Add"} key={menu.menuId + "Add"} readOnly={true} checked={menu.actionAuth.add} label="등록" />
                                                                            <CustomInput inline type="checkbox" id={menu.menuId + "Edit"} key={menu.menuId + "Edit"} readOnly={true} checked={menu.actionAuth.edit} label="수정" />
                                                                            <CustomInput inline type="checkbox" id={menu.menuId + "Delete"} key={menu.menuId + "Delete"} readOnly={true} checked={menu.actionAuth.delete} label="삭제" />
                                                                        </>
                                                                    }
                                                                </td>
                                                            </tr>
                                                        })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </> : <>
                                            <br/>
                                            <span>선택한 그룹이 없습니다.</span>
                                        </>}
                                        
                                    </Col>
                                </Row>                 

                            </Col>
                        </Row>
                        
                    </div>
                        
                </div> 
            </form>

        </>
    );
};


export default MembershipEditComponent;