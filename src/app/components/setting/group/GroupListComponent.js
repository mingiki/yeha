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

class GroupListComponent extends Component {
    constructor(props) {
        super(props);
        this.api = new ApiService();
        this.state = {
            redirectPath : null
        };

        console.log(this.state);
        console.log(this.props);
    }

    componentDidMount = async ()  => {
      this.initGroup();
    }

    initGroup = async () => {
      let result = await this.api.settingGroupList();

      if (result.resultCode == "200") {
        this.props.GroupActions.SetMainData(result.resultData);
      }
    }

    redirect = (path , data) => {
      this.props.GroupActions.SetSelectData(data);
      this.setState({
        redirectPath : path
      })
    }

    render() {
        const entities = this.props.group.mainData;
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

                <div>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={()=> this.redirect("/setting/group/add")}>
                        등록
                    </button>
                </div>

                {Array(numberOfRows).fill().map((_, rowIndex) => (
                  <Row key={rowIndex}>
                  {
                    entities.slice(rowIndex * 4, (rowIndex * 4) + 4).map((group,i) => (
                      <Col lg="3" md="4" sm="12" key={i}>
                        <div class="card card-custom gutter-b card-list" onClick={()=>this.redirect('/setting/group/view', group)}>
                          <div class="card-header">
                            <div class="card-title">
                              <span class="card-icon">
                                <i class="flaticon2-group text-primary"></i>
                              </span> 
                              <h3 class="card-label">
                                {group.name}
                              </h3>
                            </div>
                          </div>
                          <div class="card-footer" style={{padding : "1rem 2.25rem"}}>
                            <div className="d-flex align-items-center">
                              <div className="d-flex flex-column font-weight-bold">
                                <span className="text-dark mb-1 font-size-lg">{group.createder}</span>
                                <span className="text-muted">{group.createdAt}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                ))} 


                <div className="d-flex justify-content-between align-items-center flex-wrap">
									<div className="d-flex flex-wrap mr-3">
										<a href="#" className="btn btn-icon btn-sm btn-light-primary mr-2 my-1">
											<i className="ki ki-bold-double-arrow-back icon-xs"></i>
										</a>
										<a href="#" className="btn btn-icon btn-sm btn-light-primary mr-2 my-1">
											<i className="ki ki-bold-arrow-back icon-xs"></i>
										</a>

                    <a href="#" className="btn btn-icon btn-sm border-0 btn-hover-primary mr-2 my-1">23</a>
                    <a href="#" className="btn btn-icon btn-sm border-0 btn-hover-primary active mr-2 my-1">24</a>
                    <a href="#" className="btn btn-icon btn-sm border-0 btn-hover-primary mr-2 my-1">25</a>
                    <a href="#" className="btn btn-icon btn-sm border-0 btn-hover-primary mr-2 my-1">26</a>
                    <a href="#" className="btn btn-icon btn-sm border-0 btn-hover-primary mr-2 my-1">27</a>

                    <a href="#" className="btn btn-icon btn-sm btn-light-primary mr-2 my-1">
											<i className="ki ki-bold-arrow-next icon-xs"></i>
										</a>

										<a href="#" className="btn btn-icon btn-sm btn-light-primary mr-2 my-1">
											<i className="ki ki-bold-double-arrow-next icon-xs"></i>
										</a>
									</div>
									<div className="d-flex align-items-center">
										<select className="form-control form-control-sm text-primary font-weight-bold mr-4 border-0 bg-light-primary" style={{width : "75px"}}>
											<option value="10">10</option>
											<option value="20">20</option>
											<option value="30">30</option>
											<option value="50">50</option>
											<option value="100">100</option>
										</select>
										<span className="text-muted">Displaying 10 of 230 records</span>
									</div>
								</div>








                

            </>         
        );
    }


}

export default GroupListComponent;

