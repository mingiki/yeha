import React, { Component } from 'react';
import {Redirect} from "react-router-dom";
import update from 'react-addons-update'

import { toast } from 'react-toastify';
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

class InstructorEditComponent extends Component {
    constructor(props) {
        super(props);

        this.instructor = this.props.instructor.selectData;

        this.state = {         
            redirectPath : null,
            menus : this.instructor.menus,
            invalid: {
                name : false
            },
            formValue: {
                name : this.instructor.name
            }        
        };
    }

    componentDidMount () {

    }

    onChangeName = (e) =>{
        this.setState({
          formValue: update(
            this.state.formValue,
            {
              name: { $set: e.target.value },
            }
          ),
          invalid: update(
            this.state.invalid,
            {
              name: { $set: false },
            }
          )
        })
    }

    onChangeMenu = (event) => {
        let isChecked = event.target.checked;
        let menuId = event.target.id;
    
        let updateMenus = this.state.menus.map( menu =>{
          if (menu.menuId == menuId) {
            menu.isOpen = isChecked;
            if (menu.sub) {
                menu.sub.map(sub => {
                    sub.isOpen = isChecked;
                })
            }
          }

          return menu;
        });
    
        this.setState({
          menus : updateMenus
        })
    }

    onChangeMenuSub = (event) => {
        let isChecked = event.target.checked;
        let menuId = event.target.id;
    
        let updateMenus = this.state.menus.map( menu =>{
            if (menu.sub) {
                menu.sub.map(sub => {
                    if (sub.menuId == menuId) {
                        sub.isOpen = isChecked;
                    }
                })
            }
          return menu;
        });
    
        this.setState({
          menus : updateMenus
        })
    }

    onChangeMenuAction = (event) => {
        let isChecked = event.target.checked;
        let menuId = event.target.id;

        let updateMenus = this.state.menus.map( menu =>{
            if (menu.menuId + "Add" == menuId) {
                menu.actionAuth.add = isChecked;
            } else if (menu.menuId + "Edit" == menuId) {
                menu.actionAuth.edit = isChecked;
            } else if (menu.menuId + "Delete" == menuId) {
                menu.actionAuth.delete = isChecked;
            }
            return menu;
        });

        this.setState({
            menus : updateMenus
        })
    }

    onChangeMenuSubAction = (event) => {
        let isChecked = event.target.checked;
        let menuId = event.target.id;

        let updateMenus = this.state.menus.map( menu =>{
            if (menu.sub) {
                menu.sub.map(sub => {
                    if (sub.menuId + "Add" == menuId) {
                        sub.actionAuth.add = isChecked;
                    } else if (sub.menuId + "Edit" == menuId) {
                        sub.actionAuth.edit = isChecked;
                    } else if (sub.menuId + "Delete" == menuId) {
                        sub.actionAuth.delete = isChecked;
                    }
                })
            }
          return menu;
        });

        this.setState({
            menus : updateMenus
        })
    }

    settinginstructorEdit = async () => {
        let name = this.state.formValue.name;
        if (name == null || name == '' || name == undefined) {
          this.setState({
            invalid: update(
              this.state.invalid,
              {
                name: { $set: true },
              }
            )
          })
          document.getElementById("name").focus();
        } else {
    
          let param = {
              name : name,
              uid : this.instructor.id,
              menus : this.state.menus,
              loginUser : this.props.auth.loginUser
          }
          let result = await this.api.settinginstructorEdit(param);

          if (result.resultCode == "200") {
            toast.info("그룹수정이 완료되었습니다.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })

            //수정데이터 init
            this.props.instructorActions.SetSelectData(result.resultData);

            this.setState({
                redirectPath : "setting/instructor/view"
            })

          } else {
            toast.error("그룹수정이 실패하였습니다.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
          }

        }
    }

    render() {  
        
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
                <Card>
                    <CardHeader title="그룹 수정">
                        <CardHeaderToolbar>
                            <button
                                type="button"
                                onClick={()=> {this.setState({redirectPath : `/setting/instructor/view/${this.instructor.id}`})}}
                                className="btn btn-light"
                            >
                                <i className="fa fa-arrow-left"></i>
                                취소
                            </button>
                            {`  `}
                            <button className="btn btn-light ml-2">
                                <i className="fa fa-redo"></i>
                                초기화
                            </button>
                            {`  `}
                            <button
                                type="submit"
                                className="btn btn-primary ml-2"
                                onClick={this.settinginstructorAdd}
                            >
                                <i className="fa fa-save"></i>
                                저장
                            </button>
                        </CardHeaderToolbar>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col lg={4}>
                                <h6 class="card-title font-weight-bold text-dark">
                                    ● 그룹명
                                </h6>
                                <Input type="name" id="name" placeholder="그룹 명을 입력해주세요." 
                                    invalid={this.state.invalid.name} 
                                    onChange={this.onChangeName}
                                    maxLength="20"
                                    defaultValue={this.state.formValue.name} />
                            </Col>
                            <Col lg={4}>
                            </Col>
                            <Col lg={4}>
                            </Col>
                        </Row>

                        <div className="separator separator-solid" style={{margin: "20px 0px" , borderColor: "#EBEDF3"}} />

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
                                            this.state.menus.map((menu)=>{
                                                return <tr>
                                                    <th scope="row" style={{textAlign: "center" , verticalAlign: "middle"}}>
                                                        <CustomInput inline 
                                                        type="checkbox" 
                                                        id={menu.menuId} 
                                                        label={menu.menuName}
                                                        checked={menu.isOpen}
                                                        onChange={this.onChangeMenu} />
                                                    </th>
                                                    <td>
                                                        {
                                                            menu.sub ? <>
                                                                <Table 
                                                                    responsive >
                                                                    <colinstructor>
                                                                        <col width="30%" />
                                                                        <col width="70%" />
                                                                    </colinstructor>
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
                                                                                                disabled={!menu.isOpen}
                                                                                                checked={sub.isOpen}
                                                                                                onChange={this.onChangeMenuSub} />
                                                                                        </th>
                                                                                        <td>                                                                                              
                                                                                            <>
                                                                                                <CustomInput inline type="checkbox" id={sub.menuId + "Add"} key={sub.menuId + "Add"} onChange={this.onChangeMenuSubAction} disabled={!sub.isOpen} checked={sub.actionAuth.add} label="등록" />
                                                                                                <CustomInput inline type="checkbox" id={sub.menuId + "Edit"} key={sub.menuId + "Edit"} onChange={this.onChangeMenuSubAction} disabled={!sub.isOpen} checked={sub.actionAuth.edit} label="수정" />
                                                                                                <CustomInput inline type="checkbox" id={sub.menuId + "Delete"} key={sub.menuId + "Delete"} onChange={this.onChangeMenuSubAction} disabled={!sub.isOpen} checked={sub.actionAuth.delete} label="삭제" />
                                                                                            </>
                                                                                        </td>
                                                                                    </tr>
                                                                                })
                                                                            }
                                                                    </tbody>
                                                                </Table>
                                                            </> : <>
                                                                <CustomInput inline type="checkbox" id={menu.menuId + "Add"} key={menu.menuId + "Add"} onChange={this.onChangeMenuAction} disabled={!menu.isOpen} checked={menu.actionAuth.add} label="등록" />
                                                                <CustomInput inline type="checkbox" id={menu.menuId + "Edit"} key={menu.menuId + "Edit"} onChange={this.onChangeMenuAction} disabled={!menu.isOpen} checked={menu.actionAuth.edit} label="수정" />
                                                                <CustomInput inline type="checkbox" id={menu.menuId + "Delete"} key={menu.menuId + "Delete"} onChange={this.onChangeMenuAction} disabled={!menu.isOpen} checked={menu.actionAuth.delete} label="삭제" />
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

                        {/* <Row>
                            <Col lg={16}>
                                <select id="kt_dual_listbox_1" className="dual-listbox" multiple>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                    <option value="4">Four</option>
                                    <option value="5">Five</option>
                                    <option value="6">Six</option>
                                    <option value="7">Seven</option>
                                    <option value="8">Eight</option>
                                    <option value="9">Nine</option>
                                    <option value="10">Ten</option>
                                </select>

                            </Col>
                        </Row> */}
                        
                    </CardBody>
                </Card>
                
            </>         
        );
    }


}

export default InstructorEditComponent;

