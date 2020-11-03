
import React, { useState } from "react";
import {Redirect} from "react-router-dom";

import Swal from 'sweetalert2'
import { toast } from 'react-toastify';
import { CustomInput, Row, Col } from "reactstrap"

import ApiService from "../../../service/ApiService";

export const MembershipViewComponent = (props) => {
    const api = new ApiService();
    const [redirectPath, setRedirectPath] = useState(null);
    const Membership = props.Membership.selectData;

    /**
     * 강사 삭제
     * @param {*} values 
     */
    const deleteMembership = async (id) => {
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
                let result = await api.settingMembershipDelete(param);
        
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
        
                    setRedirectPath("/setting/Membership")
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

            <div className="card card-custom">
                <div className="card-header">
                    <div className="card-title">
                        <span className="card-icon">
                            <i className="flaticon2-group text-primary"></i>
                        </span> 
                        <h3 className="card-label">
                            {Membership.name}
                        </h3>
                    </div>
                    <div className="card-toolbar">
                        <button
                            type="button"
                            onClick={()=> {setRedirectPath("/setting/Membership")}}
                            className="btn btn-light"
                        >
                            <i className="fa fa-arrow-left"></i>
                            목록
                        </button>
                        {`  `}
                        <button 
                            type="button"
                            className="btn btn-light ml-2"
                            onClick={()=> {setRedirectPath(`/setting/Membership/edit/${Membership.id}`)}}
                        >
                            <i className="fa fa-redo"></i>
                            수정
                        </button>
                        {`  `}
                        <button
                            type="button"
                            className="btn btn-primary ml-2"
                            onClick={()=> {deleteMembership(Membership.id)}}
                        >
                            <i className="fa fa-trash"></i>
                            삭제
                        </button>
                    </div>
                </div>
                <div className="card-body">
                    <Row>
                        <Col lg={4}>
                            <label className="font-size-h6 font-weight-bolder text-dark">상세정보</label>

                            <div className="d-flex justify-content-end">
                              <span className="label label-inline label-lg label-light-primary btn-sm font-weight-bold">
                                재직중
                              </span>
                            </div>

                            <div className="d-flex align-items-center mb-7" style={{placeContent:"center"}}>
                              <div className="flex-shrink-0 mr-4 mt-lg-0 mt-3">
                                <div className="symbol symbol-circle symbol-lg-75 d-none">
                                  <img src="/metronic/theme/html/demo1/dist/assets/media/users/300_10.jpg" alt="image" />
                                </div>
                                <div className="symbol symbol-75 symbol-circle symbol-primary">
                                  <span className="symbol-label font-size-h3 font-weight-boldest">
                                    {Membership.name}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div>
                                <div className="d-flex justify-content-between align-items-center my-2">
                                    <span className="text-dark-75 font-weight-bolder mr-2">입사일:</span>
                                    <span className="text-muted font-weight-bold">{Membership.enterDate}</span>
                                </div>  
                                <div className="d-flex justify-content-between align-items-center my-2">
                                    <span className="text-dark-75 font-weight-bolder mr-2">퇴사일:</span>
                                    <span className="text-muted font-weight-bold">{Membership.leaveDate}</span>
                                </div>    
                                <div className="d-flex justify-content-between align-items-center my-2">
                                    <span className="text-dark-75 font-weight-bolder mr-2">이메일:</span>
                                    <span className="text-muted font-weight-bold">{Membership.email}</span>
                                </div>
                                <div className="d-flex justify-content-between align-items-cente my-2">
                                    <span className="text-dark-75 font-weight-bolder mr-2">연락처:</span>
                                    <span className="text-muted font-weight-bold">{Membership.phone}</span>
                                </div>
                                <div className="d-flex justify-content-between align-items-center my-2">
                                    <span className="text-dark-75 font-weight-bolder mr-2">생일:</span>
                                    <span className="text-muted font-weight-bold">{Membership.birthDay}</span>
                                </div>
                                <div className="d-flex justify-content-between align-items-cente my-2r">
                                    <span className="text-dark-75 font-weight-bolder mr-2">주소:</span>
                                    <span className="text-muted font-weight-bold">{Membership.address}</span>
                                </div>
                            </div>
                        </Col>
                        <Col lg={8}>
                            <label className="font-size-h6 font-weight-bolder text-dark">그룹</label>
                            <div className="d-flex align-items-center">
                                <div className="d-flex flex-column font-weight-bold">
                                    <span className="text-dark mb-1 font-size-lg">{Membership.group.name}</span>
                                </div>
                            </div>

                            <label className="font-size-h6 font-weight-bolder text-dark">그룹 기능권한</label>
                            {Membership.group != null ? <>
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
                                            Membership.group.menus.map((menu)=>{
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

                    <div className="separator separator-dashed my-8" />

                    <Row>
                        <Col lg={6}>
                            <label className="font-size-h6 font-weight-bolder text-dark">등록</label>
                            <div className="d-flex align-items-center">
                                <div className="d-flex flex-column font-weight-bold">
                                    <span className="text-dark mb-1 font-size-lg">{Membership.createder}</span>
                                    <span className="text-muted">{Membership.createdAt}</span>
                                </div>
                            </div>
                        </Col>
                        <Col lg={6}>
                            <label className="font-size-h6 font-weight-bolder text-dark">수정</label>
                            <div className="d-flex align-items-center">
                                <div className="d-flex flex-column font-weight-bold">
                                <span className="text-dark mb-1 font-size-lg">{Membership.updateder}</span>
                                <span className="text-muted">{Membership.updatedAt}</span>
                                </div>
                            </div>
                        </Col>
                    </Row>

                </div>
            </div> 
        </>
    );
};


export default MembershipViewComponent;