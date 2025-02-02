import React, { Component } from 'react';
import {Redirect, Link} from "react-router-dom";
import SVG from "react-inlinesvg";

import {
  Row,
  Col
} from "reactstrap"

import {
    toAbsoluteUrl
} from "../../../helpers";
import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar,
} from "../../../partials/controls";

import ApiService from "../../../service/ApiService";

class InstructorListComponent extends Component {
    constructor(props) {
        super(props);
        this.api = new ApiService();
        this.state = {
            redirectPath : null
        };
    }

    componentDidMount = async ()  => {
      this.initInstructor();
    }

    initInstructor = async () => {
      let param = {
        centerId : this.props.auth.loginUser.centerId
      }
      let result = await this.api.settingInstructorList(param);

      if (result.resultCode == "200") {
        this.props.InstructorActions.SetMainData(result.resultData);
      }
    }

    redirect = (path , data) => {
      this.props.InstructorActions.SetSelectData(data);
      this.setState({
        redirectPath : path
      })
    }

    render() {
        const entities = this.props.instructor.mainData;
        const numberOfRows = entities ? Math.ceil(entities.length / 4) : 0
        
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

                <div style={{marginBottom: "10px", width: "100%" ,height: "40px"}}>
                    <button
                      type="button"
                      className="btn btn-primary"
                      style={{float: "right"}}
                      onClick={()=> this.redirect("/setting/instructor/add")}>
                        <i className="flaticon-add"></i>
                        등록
                    </button>
                </div>

                {Array(numberOfRows).fill().map((_, rowIndex) => (
                  <Row key={rowIndex}>
                  {
                    entities.slice(rowIndex * 4, (rowIndex * 4) + 4).map((instructor,i) => (
                      <Col lg="3" md="4" sm="12" key={i}>

                        <div className="card card-custom gutter-b card-stretch card-list" onClick={()=>this.redirect(`/setting/instructor/view/${instructor.id}`, instructor)}>
                          <div className="card-body pt-4">

                            <div className="d-flex justify-content-end">
                              <span className="label label-inline label-lg label-light-primary btn-sm font-weight-bold">
                                {instructor.status}
                              </span>
                            </div>

                            <div className="d-flex align-items-center mb-7">
                              <div className="flex-shrink-0 mr-4 mt-lg-0 mt-3">
                                <div className="symbol symbol-circle symbol-lg-75 d-none">
                                  <img src="/metronic/theme/html/demo1/dist/assets/media/users/300_10.jpg" alt="image" />
                                </div>
                                <div className="symbol symbol-lg-75 symbol-circle symbol-primary">
                                  <span className="symbol-label font-size-h3 font-weight-boldest">
                                    {instructor.name}
                                  </span>
                                </div>
                              </div>
                              <div className="d-flex flex-column">
                                <span className="text-dark font-weight-bold font-size-h4 mb-0">{instructor.name}</span>
                                <span className="text-muted font-weight-bold">{instructor.group.name}</span>
                              </div>
                            </div>
                           
                            <div>
                              <div className="d-flex justify-content-between align-items-center">
                                <span className="text-dark-75 font-weight-bolder mr-2">이메일:</span>
                                <span className="text-muted font-weight-bold">{instructor.email}</span>
                              </div>
                              <div className="d-flex justify-content-between align-items-cente my-2">
                                <span className="text-dark-75 font-weight-bolder mr-2">연락처:</span>
                                <span className="text-muted font-weight-bold">{instructor.phone}</span>
                              </div>
                              <div className="d-flex justify-content-between align-items-center">
                                <span className="text-dark-75 font-weight-bolder mr-2">입사일:</span>
                                <span className="text-muted font-weight-bold">{instructor.enterDate}</span>
                              </div>
                            </div>
                          </div>
                        </div>


                      </Col>
                    ))}
                  </Row>
                ))} 


            </>         
        );
    }


}

export default InstructorListComponent;

