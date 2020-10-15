import React, { Suspense , Component} from "react";
import { Link, Redirect, Route, HashRouter, Switch ,withRouter, BrowserRouter} from "react-router-dom";

import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../helpers";

class Aside extends Component {
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
                {/*begin::Aside*/}
                 <div className="aside aside-left aside-fixed d-flex flex-column flex-row-auto" id="kt_aside">
                    {/*begin::Brand*/}
                    <div
                        className={`brand flex-column-auto`}
                        id="kt_brand">
                      {/* begin::Logo */}
                      <Link to="" className="brand-logo">
                        <img alt="logo" src={toAbsoluteUrl("/media/logos/logo-light.png")} />
                      </Link>
                      {/* end::Logo */}

                      {/* begin::Toggle */}
                      <button className="brand-toggle btn btn-sm px-0" id="kt_aside_toggle">
                        <span className="svg-icon svg-icon-xl">
                            <SVG src={toAbsoluteUrl("/media/svg/icons/Navigation/Angle-double-left.svg")}/>
                        </span>
                      </button>
                      {/* end::Toolbar */}
                    </div>
                    {/*end::Brand*/}
                    {/*begin::Aside Menu*/}
                    <div className="aside-menu-wrapper flex-column-fluid" id="kt_aside_menu_wrapper">
                      {/*begin::Menu Container*/}
                      <div id="kt_aside_menu" className="aside-menu my-4" data-menu-vertical="1" data-menu-scroll="1" data-menu-dropdown-timeout="500">
                        {/*begin::Menu Nav*/}
                        <ul className="menu-nav">
                          <li className="menu-item menu-item-active" aria-haspopup="true">
                            <a href="index.html" className="menu-link">
                              <span className="svg-icon menu-icon">
                                {/*begin::Svg Icon | path:assets/media/svg/icons/Design/Layers.svg*/}
                                <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
                                {/*end::Svg Icon*/}
                              </span>
                              <span className="menu-text">Dashboard</span>
                            </a>
                          </li>
                          <li className="menu-section">
                            <h4 className="menu-text">Custom</h4>
                            <i className="menu-icon ki ki-bold-more-hor icon-md"></i>
                          </li>
                        </ul>
                      </div>
                      {/*end::Menu Container*/}
                    </div>
                    {/*end::Aside Menu*/}
                  </div>
                  {/*end::Aside*/}
            </>         
        );
    }


}


export default Aside;
