import React, { Suspense , Component} from "react";
import { Link, Redirect, Route, HashRouter, Switch ,withRouter, BrowserRouter} from "react-router-dom";

import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../helpers";

class SubHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount () {
    }

    render() {
        return (
            <>  
                {/* <!--begin::Subheader--> */}
                <div className="subheader py-2 py-lg-4 subheader-solid" id="kt_subheader">
                    <div className="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
                        {/* <!--begin::Info--> */}
                        <div className="d-flex align-items-center flex-wrap mr-2">
                        {/* <!--begin::Page Title--> */}
                        <h5 className="text-dark font-weight-bold mt-2 mb-2 mr-5">Dashboard</h5>
                        {/* <!--end::Page Title--> */}
                        </div>
                        {/* <!--end::Info--> */}
                        {/* <!--begin::Toolbar--> */}
                        <div className="d-flex align-items-center">                          
                        
                        </div>
                        {/* <!--end::Toolbar--> */}
                    </div>
                </div>
                {/* <!--end::Subheader--> */}
            </>         
        );
    }


}


export default SubHeader;
