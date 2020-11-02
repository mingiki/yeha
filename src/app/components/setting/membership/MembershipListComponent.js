import React, { Component } from 'react';
import {Redirect, Link} from "react-router-dom";
import SVG from "react-inlinesvg";

import Slider from "react-slick";
import Swal from 'sweetalert2'
import { toast } from 'react-toastify';

import {
  Row,
  Col
} from "reactstrap"

import {
    toAbsoluteUrl
} from "../../../helpers";

import MembershipCategoryAddModal from './modal/MembershipCategoryAddModal';
import MembershipCategoryEditModal from './modal/MembershipCategoryEditModal';



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
        this.settings = {
          className: "category-center",
          dots: true,
          infinite: false,
          draggable: false,
          speed: 500,
          slidesToShow: 5,
          slidesToScroll: 5,
          initialSlide: 0,
          responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 800,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
        };
        
        this.test = [1,2,3,4,5,6,7,8,9];
        this.state = {
            redirectPath : null,
            showAddCategory : false,
            showEditCategory : false,
        };
    }

    componentDidMount = async ()  => {
      this.initCategory();
    }

    initCategory = async () => {
      let param = {
        centerId : this.props.auth.loginUser.centerId
      }
      let result = await this.api.settingMembershipCategoryList(param);

      console.log(result);

      if (result.resultCode == "200") {
        this.props.MembershipActions.SetCategoryData(result.resultData);
      }
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

    modalOpenAddCategory = () => {
      this.setState({showAddCategory : true})
    }

    modalCloseAddCategory = () => {
      this.setState({showAddCategory : false})
    }

    modalOpenEditCategory = (category) => {
      this.props.MembershipActions.SetSelectCategoryData(category);
      this.setState({showEditCategory : true})
    }

    modalCloseEditCategory = () => {
      this.setState({showEditCategory : false})
    }

    deleteCategory = async (id) => {
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
              let result = await this.api.settingCategoryDelete(param);
      
              if (result.resultCode == "200") {
                  toast.info("카테고리가 삭제되었습니다.", {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                  })
                
                this.initCategory();
              }
          } 
        })
  }

    selectCategory  = (category) => {
      console.log("카테고리 선택");
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

                <MembershipCategoryAddModal 
                  auth={this.props.auth}
                  initCategory={this.initCategory}
                  show={this.state.showAddCategory}
                  onHide={this.modalCloseAddCategory}
                />

                <MembershipCategoryEditModal 
                  auth={this.props.auth}
                  membership={this.props.membership}
                  initCategory={this.initCategory}
                  show={this.state.showEditCategory}
                  onHide={this.modalCloseEditCategory}
                />


                <div className="row">
									<div className="col-xl-12">
                  <div className="card card-custom card-stretch gutter-b">
											<div className="card-header border-0 py-3">
												<h3 className="card-title align-items-start flex-column">
													<span className="card-label font-weight-bolder text-dark">카테고리</span>
													<span className="text-muted mt-3 font-weight-bold font-size-sm"></span>
												</h3>
												<div className="card-toolbar">
													<button onClick={()=>this.modalOpenAddCategory()} className="btn btn-primary font-weight-bolder font-size-sm">
                              등록
                          </button>
												</div>
											</div>
											<div className="card-body pt-10 pb-10" style={{backgroundColor: "#F3F6F9"}}>
                        <Slider {...this.settings}>       
                          {this.props.membership.categoryData ? this.props.membership.categoryData.map((category=>{
                            return <>
                              <div className="category-container">
                                <div className="category-container-title" onClick={()=> this.selectCategory(category)}>
                                    <div 
                                      className="text-dark-75 font-weight-bold font-size-lg">
                                      {category.name}
                                    </div>
                                    <div className="text-muted font-weight-bold font-size-sm">
                                      {category.createder} {category.createdAt}
                                    </div>
                                </div>
                                <div className="category-container-action" >
                                  <span className="btn btn-icon btn-light-success btn-sm mr-2" 
                                    onClick={()=>this.modalOpenEditCategory(category)}>
                                    <i className="flaticon-edit"></i>
                                  </span>
                                  <span className="btn btn-icon btn-light-success btn-sm mr-2"
                                    onClick={()=>this.deleteCategory(category.id)}>
                                    <i className="flaticon2-trash"></i>
                                  </span>
                                </div>
                              </div>
                            </>
                          }))
                          : <>
                            <span>카테고리가 없습니다.</span>
                          </>
                          }
                        </Slider>
                      </div>
                   </div>
                  </div>
                </div>

                <div className="row">
									<div className="col-xl-12">

                  <div className="card card-custom card-stretch gutter-b">
											<div className="card-header border-0 py-3">
												<h3 className="card-title align-items-start flex-column">
													<span className="card-label font-weight-bolder text-dark">수업1 회원권 목록</span>
													<span className="text-muted mt-3 font-weight-bold font-size-sm"></span>
												</h3>
												<div className="card-toolbar">
													<a href="#" className="btn btn-primary font-weight-bolder font-size-sm">
                              등록
                          </a>
												</div>
											</div>
											<div className="card-body pt-0 pb-3">
												<div className="table-responsive">
													<table className="table table-head-custom table-head-bg table-borderless table-vertical-center">
														<thead>
															<tr className="text-uppercase">
                                <th style={{minWidth: "50px"}}>분류</th>
                                <th style={{minWidth: "50px"}}>상태</th>
																<th style={{minWidth: "250px"}} className="pl-7">
																	<span className="text-dark-75">이름</span>
																</th>
																<th style={{minWidth: "50px"}}>가격</th>
																<th style={{minWidth: "100px"}}>유효 기간</th>
																<th style={{minWidth: "150px"}}>전체</th>
																<th style={{minWidth: "130px"}}>상태</th>
																<th style={{minWidth: "120px"}}>일일</th>
															</tr>
														</thead>
														<tbody>
                              {this.test.map(item=>{
                                return <>
                                  <tr>
                                    <td>
                                      <span className="text-dark-75 font-weight-bolder d-block font-size-lg">$23,800</span>
                                      <span className="text-muted font-weight-bold">Paid</span>
                                    </td>
                                    <td>
                                      <span className="label label-lg label-light-success label-inline">Success</span>
                                    </td>
                                    <td className="pl-0 py-8">
                                      <div className="d-flex align-items-center">
                                        <div>
                                          <a href="#" className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">Payroll Application</a>
                                          <span className="text-muted font-weight-bold d-block">PHP, Laravel, VueJS</span>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <span className="text-dark-75 font-weight-bolder d-block font-size-lg">$23,800</span>
                                      <span className="text-muted font-weight-bold">Paid</span>
                                    </td>
                                    <td>
                                      <span className="text-dark-75 font-weight-bolder d-block font-size-lg">$6,700</span>
                                      <span className="text-muted font-weight-bold">Paid</span>
                                    </td>
                                    <td>
                                      <span className="text-dark-75 font-weight-bolder d-block font-size-lg">Zoey McGee</span>
                                      <span className="text-muted font-weight-bold">Ruby Developer</span>
                                    </td>
                                    <td>
                                      <span className="label label-lg label-light-success label-inline">Success</span>
                                    </td>
                                    <td className="text-right pr-0">
                                      <a href="#" className="btn btn-icon btn-light btn-hover-primary btn-sm mr-3">
                                        <span className="svg-icon svg-icon-md svg-icon-primary">
                                          {/* <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                              <rect x="0" y="0" width="24" height="24"></rect>
                                              <path d="M8,4 L16,4 C17.1045695,4 18,4.8954305 18,6 L18,17.726765 C18,18.2790497 17.5522847,18.726765 17,18.726765 C16.7498083,18.726765 16.5087052,18.6329798 16.3242754,18.4639191 L12.6757246,15.1194142 C12.2934034,14.7689531 11.7065966,14.7689531 11.3242754,15.1194142 L7.67572463,18.4639191 C7.26860564,18.8371115 6.63603827,18.8096086 6.26284586,18.4024896 C6.09378519,18.2180598 6,17.9769566 6,17.726765 L6,6 C6,4.8954305 6.8954305,4 8,4 Z" fill="#000000"></path>
                                            </g>
                                          </svg> */}
                                        </span>
                                      </a>
                                      <a href="#" className="btn btn-icon btn-light btn-hover-primary btn-sm">
                                        <span className="svg-icon svg-icon-md svg-icon-primary">
                                          {/* <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                              <polygon points="0 0 24 0 24 24 0 24"></polygon>
                                              <rect fill="#000000" opacity="0.3" transform="translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000)" x="11" y="5" width="2" height="14" rx="1"></rect>
                                              <path d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997)"></path>
                                            </g>
                                          </svg> */}
                                        </span>
                                      </a>
                                    </td>
                                  </tr>
                                </>
                              })}
															
														</tbody>
													</table>
												</div>
											</div>
										</div>


									</div>
								</div>
            </>         
        );
    }


}

export default MembershipListComponent;

