import React, { Component } from 'react';
import {Redirect} from "react-router-dom";

import Routes from "../../router/Routes";
import ApiService from '../../service/ApiService';

class Layout extends Component {
    constructor(props) {
        super(props);
        this.api = new ApiService();
        this.state = {
        
        };
    }

    componentDidMount () {
    
    }

  

    render() {
        return (
            <>  
             
            </>         
        );
    }


}


export default Layout;
