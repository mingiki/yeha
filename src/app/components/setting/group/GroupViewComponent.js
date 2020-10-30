import React, { Component } from 'react';
import {Redirect, Link} from "react-router-dom";

import Swal from 'sweetalert2'
import { toast } from 'react-toastify';
import {
    CustomInput,
    Row,
    Col
} from "reactstrap"

import ApiService from '../../../service/ApiService';

class GroupViewComponent extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.id = props.match ? props.match.params.id : null;
        this.api = new ApiService();
        this.state = {       
            redirectPath : null
        };
    }

    componentDidMount () {
        // 자원 최소화
        // this.settinggroupSelect();
    }

    // settinggroupSelect = async () => {
    //     console.log(this.id);
        
    //     const param = {
    //         uid : this.id
    //     }
    //     let result = await this.api.settinggroupSelect(param);
    //     console.log(result);
    // }

    deleteGroup = async (id) => {
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
                let result = await this.api.settingGroupDelete(param);
        
                if (result.resultCode == "200") {
                    toast.info("그룹이 삭제되었습니다.", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
        
                    this.setState({
                        redirectPath : "setting/group"
                    })
                }
            } 
        })
    }

    render() {  
        const group = this.props.group.selectData;

        return (
            <>  
                {
                    this.state.redirectPath ? 
                    <>
                            <Redirect    
                                to={{
                                    pathname: this.state.redirectPath
                                }}
                            />
                    </> : <></>
                }
                <div className="card card-custom gutter-b">
                    <div className="card-header">
                        <div className="card-title">
                            <span className="card-icon">
                                <i className="flaticon2-group text-primary"></i>
                            </span> 
                            <h3 className="card-label">
                                {group.name}
                            </h3>
                        </div>
                        <div className="card-toolbar">
                            <button
                                type="button"
                                onClick={()=> {this.setState({redirectPath : "/setting/group"})}}
                                className="btn btn-light"
                            >
                                <i className="fa fa-arrow-left"></i>
                                목록
                            </button>
                            {`  `}
                            <button 
                                type="button"
                                className="btn btn-light ml-2"
                                onClick={()=> {this.setState({redirectPath : `/setting/group/edit/${group.id}`})}}
                            >
                                <i className="fa fa-redo"></i>
                                수정
                            </button>
                            {`  `}
                            <button
                                type="button"
                                className="btn btn-primary ml-2"
                                onClick={()=> {this.deleteGroup(group.id)}}
                            >
                                <i className="fa fa-trash"></i>
                                삭제
                            </button>
                        </div>
                    </div>
                    <div className="card-body">
                        <Row>
                            <Col lg={12}>
                                <label className="font-size-h6 font-weight-bolder text-dark">그룹 기능권한</label>
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
                                            group.menus.map((menu)=>{
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
                            </Col>
                        </Row>

                        <div className="separator separator-dashed my-8" />

                        <Row>
                            <Col lg={6}>
                                <label className="font-size-h6 font-weight-bolder text-dark">등록</label>
                                <div className="d-flex align-items-center">
                                    <div className="d-flex flex-column font-weight-bold">
                                    <span className="text-dark mb-1 font-size-lg">{group.createder}</span>
                                    <span className="text-muted">{group.createdAt}</span>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={6}>
                                <label className="font-size-h6 font-weight-bolder text-dark">수정</label>
                                <div className="d-flex align-items-center">
                                    <div className="d-flex flex-column font-weight-bold">
                                    <span className="text-dark mb-1 font-size-lg">{group.createder}</span>
                                    <span className="text-muted">{group.createdAt}</span>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
                
            </>         
        );
    }


}

export default GroupViewComponent;

