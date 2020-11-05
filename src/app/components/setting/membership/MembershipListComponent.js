import React, { Component } from 'react';
import {Redirect, Link} from "react-router-dom";
import SVG from "react-inlinesvg";

import Slider from "react-slick";
import Swal from 'sweetalert2'
import { toast } from 'react-toastify';
import Skeleton from '@material-ui/lab/Skeleton';

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
          membershipLoading: true,
          categoryLoading: true,
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

      if (result.resultCode == "200") {
        const categoryList = result.resultData;
        const selectCategory = this.props.membership.selectCategoryData;

        if (categoryList.length > 0) {
          this.props.MembershipActions.SetCategoryData(categoryList);
          this.props.MembershipActions.SetSelectCategoryData(selectCategory ? selectCategory : categoryList[0]);
          this.setState({categoryLoading: false});
          this.initMembership(selectCategory ? selectCategory : categoryList[0]);
        }
      }
    }


    initMembership = async (category) => {
      let param = {
        centerId : this.props.auth.loginUser.centerId,
        category : {
          id : category.id,
          name : category.name
        }
      }
      let result = await this.api.settingMembershipList(param);

      if (result.resultCode == "200") {
        this.props.MembershipActions.SetMainData(result.resultData.length > 0 ? result.resultData : null);
      } else {
        this.props.MembershipActions.SetMainData(null);
      }

      this.setState({membershipLoading : false});
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
      this.setState({membershipLoading: true});
      this.props.MembershipActions.SetSelectCategoryData(category);
      this.initMembership(category);
    }

    redirect = (path , data) => {
      this.props.MembershipActions.SetSelectData(data);
      this.setState({
        redirectPath : path
      })
    }

    render() {
        const membershipList = this.props.membership.mainData;
        const selectCategory = this.props.membership.selectCategoryData;

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
                              <div className={category.id == selectCategory?.id ? "category-container select" : "category-container"}>
                                <div className="category-container-title" onClick={()=> this.selectCategory(category)}>
                                    {
                                      this.state.categoryLoading ? <>
                                        <Skeleton />
                                      </>
                                      :
                                      <>
                                        <div 
                                          className="text-dark-75 font-weight-bold font-size-lg">
                                          {category.name}
                                        </div>
                                      </>
                                    }
                                </div>
                                <div className="category-container-action" >
                                    {
                                      this.state.categoryLoading ? <>
                                        <Skeleton />
                                      </>
                                      :
                                      <>
                                        <span className="btn btn-icon btn-light-success btn-sm mr-2" 
                                          onClick={()=>this.modalOpenEditCategory(category)}>
                                          <i className="flaticon-edit"></i>
                                        </span>
                                        <span className="btn btn-icon btn-light-success btn-sm mr-2"
                                          onClick={()=>this.deleteCategory(category.id)}>
                                          <i className="flaticon2-trash"></i>
                                        </span>
                                      </>
                                    }
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
													<span className="card-label font-weight-bolder text-dark">{selectCategory ? selectCategory.name : ''} 회원권 목록</span>
													<span className="text-muted mt-3 font-weight-bold font-size-sm"></span>
												</h3>
												<div className="card-toolbar">
													<button onClick={()=> { this.setState({redirectPath : "/setting/membership/add"}) } } className="btn btn-primary font-weight-bolder font-size-sm">
                              등록
                          </button>
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
                              {
                                this.state.membershipLoading ?
                                <>
                                  <tr>
                                    <td colSpan={8}>
                                      <div className="spinner spinner-primary mr-15"></div>
                                    </td>
                                  </tr>
                                </>
                                :
                                <>
                                  { membershipList ? membershipList.map( membership =>{
                                    return <>
                                      <tr onClick={()=> this.redirect(`/setting/membership/view/${membership.id}`, membership)}>
                                        <td>
                                          <span className="text-dark-75 font-weight-bolder d-block font-size-lg">{membership.type}</span>
                                          <span className="text-muted font-weight-bold">Paid</span>
                                        </td>
                                        <td>
                                          <span className="label label-lg label-light-success label-inline">{membership.status}</span>
                                        </td>
                                        <td className="pl-0 py-8">
                                          <div className="d-flex align-items-center">
                                            <div>
                                              <a href="#" className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">{membership.name}</a>
                                              <span className="text-muted font-weight-bold d-block">{membership.name}</span>
                                            </div>
                                          </div>
                                        </td>
                                        <td>
                                          <span className="text-dark-75 font-weight-bolder d-block font-size-lg">{membership.price}</span>
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
                                          {/* <button 
                                            onClick={()=> this.redirect(`/setting/membership/edit/${membership.id}`, membership)}
                                            className="btn btn-icon btn-light btn-hover-primary btn-sm mr-3">
                                            <span className="svg-icon svg-icon-md svg-icon-primary">
                                              <i className="flaticon-edit"></i>
                                            </span>
                                          </button>
                                          <button className="btn btn-icon btn-light btn-hover-primary btn-sm">
                                            <span className="svg-icon svg-icon-md svg-icon-primary">
                                              <i className="flaticon2-trash"></i>
                                            </span>
                                          </button> */}
                                        </td>
                                      </tr>
                                    </>
                                  })
                                  :
                                    <>
                                      <tr>
                                        <td>
                                          회원권이 없습니다.
                                        </td>
                                      </tr>
                                    </>
                                  }
                                </>
                              }
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

