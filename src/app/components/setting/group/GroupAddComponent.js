import React, { Component } from 'react';
import {Redirect} from "react-router-dom";
import update from 'react-addons-update'
import { ToastContainer, toast } from 'react-toastify';
import DualListBox from 'react-dual-listbox';

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
import ApiService from '../../../service/ApiService';

class GroupAddComponent extends Component {
    constructor(props) {
        super(props);
        this.api = new ApiService();
        this.state = {           
            redirectPath : null,
            menus : [
                {menuId : "class" , menuName : "수업" , isOpen: false , sub : [
                  {menuId : "schedule" ,menuName : "스케줄", isOpen: false, },
                  {menuId : "timetable" ,menuName : "시간표", isOpen: false, },
                ]},
                {menuId : "user" , menuName : "회원" , isOpen: false , sub : [
                  {menuId : "list" ,menuName : "목록", isOpen: false, },
                  {menuId : "register" ,menuName : "등록", isOpen: false, },
                ]},
                {menuId : "calculation" ,menuName : "정산" ,  isOpen: false , sub : [
                  {menuId : "sale" ,menuName : "급여", isOpen: false, },
                  {menuId : "pay" ,menuName : "매출", isOpen: false, },
                  {menuId : "statistics" ,menuName : "통계", isOpen: false,},              
                ]},         
                {menuId : "notification" ,menuName : "공지사항" , isOpen: false, sub : null},
                {menuId : "setting" ,menuName : "환경설정" , isOpen: false, sub : [
                    {menuId : "config" ,menuName : "운영관리", isOpen: false },   
                    {menuId : "lesson" ,menuName : "수업관리", isOpen: false },
                    {menuId : "membership" ,menuName : "회원권관리", isOpen: false },
                    {menuId : "instructor" ,menuName : "직원관리", isOpen: false },
                    {menuId : "group" ,menuName : "그룹관리", isOpen: false },
                    {menuId : "history" ,menuName : "히스토리", isOpen: false },
                ]},
            ],
            invalid: {
                name : false
            },
            formValue: {
                name : ''
            }      
        };
    }

   

    componentDidMount () {
    }

    redirect = (path) => {
        this.setState({
            redirectPath : path
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
    
    settingGroupAdd = async () => {
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
          let addMenus = this.state.menus.map(menu => {
            if (menu.sub) {
                menu.sub.map(sub => {
                    let addChecked = document.getElementById(sub.menuId+"Add").checked;
                    let editChecked = document.getElementById(sub.menuId+"Edit").checked;
                    let deleteChecked = document.getElementById(sub.menuId+"Delete").checked;
          
                    sub.actionAuth = {
                      add : addChecked,
                      edit : editChecked,
                      delete : deleteChecked
                    };
                })
            } else {
                let addChecked = document.getElementById(menu.menuId+"Add").checked;
                let editChecked = document.getElementById(menu.menuId+"Edit").checked;
                let deleteChecked = document.getElementById(menu.menuId+"Delete").checked;
      
                menu.actionAuth = {
                  add : addChecked,
                  edit : editChecked,
                  delete : deleteChecked
                };
            }
    
            return menu;
          })
    
          let param = {
              name : name,
              menus : addMenus,
              loginUser : this.props.auth.loginUser
          }
          let result = await this.api.settingGroupAdd(param);

          if (result.resultCode == "200") {
            toast.info("그룹등록이 완료되었습니다.", {
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

          } else {
            toast.error("그룹등록이 실패하였습니다.", {
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
                    <CardHeader title="그룹 등록">
                        <CardHeaderToolbar>
                            <button
                                type="button"
                                onClick={()=> {this.setState({redirectPath : "/setting/group"})}}
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
                                onClick={this.settingGroupAdd}
                            >
                                <i className="fa fa-save"></i>
                                저장
                            </button>
                        </CardHeaderToolbar>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col lg={4}>
                                <label className="font-size-h6 font-weight-bolder text-dark">그룹명</label>
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
                                                                                                disabled={!menu.isOpen}
                                                                                                checked={sub.isOpen}
                                                                                                onChange={this.onChangeMenuSub} />
                                                                                        </th>
                                                                                        <td>                                                                                              
                                                                                            <>
                                                                                                <CustomInput inline type="checkbox" id={sub.menuId + "Add"} key={sub.menuId + "Add"} disabled={!sub.isOpen} label="등록" />
                                                                                                <CustomInput inline type="checkbox" id={sub.menuId + "Edit"} key={sub.menuId + "Edit"} disabled={!sub.isOpen} label="수정" />
                                                                                                <CustomInput inline type="checkbox" id={sub.menuId + "Delete"} key={sub.menuId + "Delete"} disabled={!sub.isOpen} label="삭제" />
                                                                                            </>
                                                                                        </td>
                                                                                    </tr>
                                                                                })
                                                                            }
                                                                    </tbody>
                                                                </Table>
                                                            </> : <>
                                                                <CustomInput inline type="checkbox" id={menu.menuId + "Add"} key={menu.menuId + "Add"} disabled={!menu.isOpen} label="등록" />
                                                                <CustomInput inline type="checkbox" id={menu.menuId + "Edit"} key={menu.menuId + "Edit"} disabled={!menu.isOpen} label="수정" />
                                                                <CustomInput inline type="checkbox" id={menu.menuId + "Delete"} key={menu.menuId + "Delete"} disabled={!menu.isOpen} label="삭제" />
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

export default GroupAddComponent;

