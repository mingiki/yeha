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
} from "../../helpers";

import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar,
} from "../../partials/controls";

import ApiService from "../../service/ApiService";

class UserListComponent extends Component {
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
        
        this.state = {
            redirectPath : null            
        };
    }

    componentDidMount = async ()  => {
      console.log("테스트");
      
    }

   
    redirect = (path , data) => {
      this.props.UserActions.SetSelectData(data);
      this.setState({
        redirectPath : path
      })
    }

    render() {
        const userList = this.props.user.mainData;

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

                목록입니다.
            </>         
        );
    }


}

export default UserListComponent;

