import React, { Component } from 'react';
import {Redirect, Link} from "react-router-dom";

import {
    Input,
    CustomInput,
    Table,
    Row,
    Col
} from "reactstrap"

import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar,
} from "../../../partials/controls";

class GroupViewComponent extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {           
            redirectPath : null
        };
    }

    componentDidMount () {
    }

    deleteGroup = async (uid) => {
        let param = {
          uid : uid
        }
        let result = await this.api.settingGroupDelete(param);
  
        if (result.resultCode == "200") {
        }
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
                <div class="card card-custom gutter-b">
                    <div class="card-header">
                        <div class="card-title">
                            <span class="card-icon">
                                <i class="flaticon2-group text-primary"></i>
                            </span> 
                            <h3 class="card-label">
                                {group.name}
                            </h3>
                        </div>
                        <div class="card-toolbar">
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
                                onClick={()=> {this.setState({redirectPath : "/setting/group/edit"})}}
                                className="btn btn-light ml-2">
                                <i className="fa fa-redo"></i>
                                수정
                            </button>
                            {`  `}
                            <button
                                type="submit"
                                className="btn btn-primary ml-2"
                                onClick={()=> {this.deleteGroup(group.uid)}}
                            >
                                <i className="fa fa-trash"></i>
                                삭제
                            </button>
                        </div>
                    </div>
                    <div className="card-body">
                        <Row>
                            <Col lg={12}>
                                <h6 class="card-title font-weight-bold text-dark">
                                    ● 그룹 기능권한
                                </h6>
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
                                                                                                    <CustomInput inline type="checkbox" id={sub.menuId + "Delete"} key={sub.menuId + "Delete"} readOnly={true} checked={sub.actionAuth.remove} label="삭제" />
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
                                                                <CustomInput inline type="checkbox" id={menu.menuId + "Delete"} key={menu.menuId + "Delete"} readOnly={true} checked={menu.actionAuth.remove} label="삭제" />
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

                        <div className="separator separator-solid" style={{margin: "20px 0px" , borderColor: "#EBEDF3"}} />

                        <Row>
                            <Col lg={6}>
                                <h6 class="card-title font-weight-bold text-dark">
                                ● 등록
                                </h6>
                                <div className="d-flex align-items-center">
                                    <div className="d-flex flex-column font-weight-bold">
                                    <span className="text-dark mb-1 font-size-lg">{group.createder}</span>
                                    <span className="text-muted">{group.createdAt}</span>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={6}>
                                <h6 class="card-title font-weight-bold text-dark">
                                ● 수정
                                </h6>
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

