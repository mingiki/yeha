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
    }

    componentDidMount = async ()  => {
      this.initGroup();
    }

    initGroup = async () => {
      let param = {
        centerId : this.props.auth.loginUser.centerId
      }
      let result = await this.api.settingGroupList(param);

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

                <div style={{marginBottom: "10px", width: "100%" ,height: "40px"}}>
                    <button
                      type="button"
                      className="btn btn-primary"
                      style={{float: "right"}}
                      onClick={()=> this.redirect("/setting/group/add")}>
                        등록
                    </button>
                </div>

                {Array(numberOfRows).fill().map((_, rowIndex) => (
                  <Row key={rowIndex}>
                  {
                    entities.slice(rowIndex * 4, (rowIndex * 4) + 4).map((group,i) => (
                      <Col lg="3" md="4" sm="12" key={i}>
                        <div className="card card-custom gutter-b card-list" onClick={()=>this.redirect(`/setting/group/view/${group.id}`, group)}>
                          <div className="card-header">
                            <div className="card-title">
                              <span className="card-icon">
                                <i className="flaticon2-group text-primary"></i>
                              </span> 
                              <h3 className="card-label">
                                {group.name}
                              </h3>
                            </div>
                          </div>
                          <div className="card-footer" style={{padding : "1rem 2.25rem"}}>
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


            </>         
        );
    }


}

export default GroupListComponent;

