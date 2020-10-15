import React, { Suspense , Component} from "react";
import { Link, Redirect, Route, HashRouter, Switch ,withRouter, BrowserRouter} from "react-router-dom";

import {LayoutInit} from "./LayoutInit";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../helpers";

import Routes from "../../router/Routes";
import ApiService from '../../service/ApiService';

import Aside from "../../pages/layout/Aside";
import Header from "../../pages/layout/Header";
import Footer from "../../pages/layout/Footer";
import HeaderMobile from "../../pages/layout/HeaderMobile";

import Main from "../../pages/Main";


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
            {/*begin::Header Mobile*/}
            <HeaderMobile />
            {/*end::Header Mobile*/}

              <div className="d-flex flex-column flex-root">
                {/*begin::Page*/}
                <div className="d-flex flex-row flex-column-fluid page">

                  {/*begin::Aside*/}
                  <Aside />
                  {/*end::Aside*/}

                  {/*begin::Wrapper*/}
                  <div className="d-flex flex-column flex-row-fluid wrapper" id="kt_wrapper">
                    {/*begin::Header*/}
                    <Header />
                    {/*end::Header*/}


                    {/*begin::Content*/}
                    <div className="content d-flex flex-column flex-column-fluid" id="kt_content">						
                      {/*begin::Entry*/}
                      <div className="d-flex flex-column-fluid">
                        {/*begin::Container*/}
                        <div className="container-fluid">

                          <Suspense>
                            <Switch>
                              {
                                <Redirect exact from="/" to="/main" />
                              }
                              <Route path={"/main"} render={() =><Main {...this.props}/>}  />

                              {/* <Route component={Error}/> */}
                              <Redirect from="*" to="/main" />
                            </Switch>
                          </Suspense>

                        </div>
                        {/*end::Container*/}
                      </div>
                      {/*end::Entry*/}
                    </div>
                    {/*end::Content*/}

                    {/*begin::Footer*/}
                    <Footer />
                    {/*end::Footer*/}

                  </div>
                  {/*end::Wrapper*/}
                </div>
                {/*end::Page*/}
              </div>
              {/*end::Main*/}
            
              {/*begin::Scrolltop*/}
              <div id="kt_scrolltop" className="scrolltop">
                <span className="svg-icon">
                  {/*begin::Svg Icon | path:assets/media/svg/icons/Navigation/Up-2.svg*/}
                  <SVG src={toAbsoluteUrl("/media/svg/icons/Navigation/Up-2.svg")} />
                  {/*end::Svg Icon*/}
                </span>
              </div>
              {/*end::Scrolltop*/}

            {/*  */}

              <LayoutInit />
            </>         
        );
    }


}


export default Layout;
