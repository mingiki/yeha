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

class MembershipListComponent extends Component {
    constructor(props) {
        super(props);
        this.api = new ApiService();
        this.state = {
            redirectPath : null
        };
    }

    componentDidMount = async ()  => {
      this.initMembership();
    }

    initMembership = async () => {
      // let param = {
      //   centerId : this.props.auth.loginUser.centerId
      // }
      // let result = await this.api.settingMembershipList(param);

      // console.log(result);

      // if (result.resultCode == "200") {
      //   this.props.MembershipActions.SetMainData(result.resultData);
      // }
    }

    redirect = (path , data) => {
      this.props.MembershipActions.SetSelectData(data);
      this.setState({
        redirectPath : path
      })
    }

    render() {
        const entities = this.props.membership.mainData;
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
                      onClick={()=> this.redirect("/setting/Membership/add")}>
                        등록
                    </button>
                </div>

                <div className="row">
									<div className="col-xl-12">
										<div className="card card-custom gutter-b">
											<div className="card-body">
												<ul className="dashboard-tabs nav nav-pills nav-danger row row-paddingless m-0 p-0 flex-column flex-sm-row" role="tablist">
													<li className="nav-item d-flex col-sm flex-grow-1 flex-shrink-0 mr-3 mb-3 mb-lg-0">
														<a className="nav-link border py-10 d-flex flex-grow-1 rounded flex-column align-items-center" data-toggle="pill" href="#tab_forms_widget_1">
															<span className="nav-icon py-2 w-auto">
																<span className="svg-icon svg-icon-3x">
																	{/* <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
																		<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
																			<rect x="0" y="0" width="24" height="24"></rect>
																			<path d="M5,3 L6,3 C6.55228475,3 7,3.44771525 7,4 L7,20 C7,20.5522847 6.55228475,21 6,21 L5,21 C4.44771525,21 4,20.5522847 4,20 L4,4 C4,3.44771525 4.44771525,3 5,3 Z M10,3 L11,3 C11.5522847,3 12,3.44771525 12,4 L12,20 C12,20.5522847 11.5522847,21 11,21 L10,21 C9.44771525,21 9,20.5522847 9,20 L9,4 C9,3.44771525 9.44771525,3 10,3 Z" fill="#000000"></path>
																			<rect fill="#000000" opacity="0.3" transform="translate(17.825568, 11.945519) rotate(-19.000000) translate(-17.825568, -11.945519)" x="16.3255682" y="2.94551858" width="3" height="18" rx="1"></rect>
																		</g>
																	</svg> */}
																</span>
															</span>
															<span className="nav-text font-size-lg py-2 font-weight-bold text-center">SAAS Application</span>
														</a>
													</li>
												</ul>
                        
											</div>
										</div>
									</div>
								</div>
            </>         
        );
    }


}

export default MembershipListComponent;

