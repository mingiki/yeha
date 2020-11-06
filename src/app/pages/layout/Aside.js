import React, { Suspense , Component} from "react";
import { Link, NavLink } from "react-router-dom";

import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../helpers";

class Aside extends Component {
    constructor(props) {
        super(props);
        this.state = {
          menus : [
            {title : "대쉬보드" , icon: <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} /> , 
            link : "/" , permissions: ["center", "instructor"], sub : null},
            {title : "수업" , icon: <SVG src={toAbsoluteUrl("/media/svg/icons/Code/Time-schedule.svg")} /> , 
            link : "/lesson" , permissions: ["center", "instructor"], sub : [
              {title : "스케줄", link : "/lesson/schedule" , permissions: ["center", "instructor"] },
              {title : "시간표", link : "/lesson/timetable" , permissions: ["center", "instructor"] },
            ]},
            {title : "회원" , icon: <SVG src={toAbsoluteUrl("/media/svg/icons/General/User.svg")} /> , 
            link : "/user" , permissions: ["center", "instructor"], sub : [
              {title : "현황", link : "/user" , permissions: ["center", "instructor"] },
              {title : "등록", link : "/user/add" , permissions: ["center", "instructor"] },
            ]},
            {title : "정산" , icon: <SVG src={toAbsoluteUrl("/media/svg/icons/Shopping/Dollar.svg")} /> ,
            link : "" , permissions: ["center", "instructor"], sub : [
              {title : "급여", link : "" , permissions: ["center", "instructor"] },
              {title : "매출", link : "" , permissions: ["center", "instructor"] },
              {title : "통계", link : "" , permissions: ["center", "instructor"] },              
            ]},         
            {title : "공지사항" , icon: <SVG src={toAbsoluteUrl("/media/svg/icons/General/Notifications1.svg")} /> , 
            link : "/notification" , permissions: ["center", "instructor"], sub : null},
            {title : "환경설정" , icon: <SVG src={toAbsoluteUrl("/media/svg/icons/General/Settings-2.svg")} /> , 
            link : "/setting" , permissions: ["center", "instructor"], sub : [
              {title : "운영관리", link : "/setting/config" , permissions: ["center", "instructor"] },  
              {title : "수업관리", link : "/setting/lesson" , permissions: ["center", "instructor"] },  
              {title : "회원권관리", link : "/setting/membership" , permissions: ["center", "instructor"] },  
              {title : "직원관리", link : "/setting/instructor" , permissions: ["center", "instructor"] },
              {title : "그룹관리", link : "/setting/group" , permissions: ["center", "instructor"] },
              {title : "히스토리", link : "/setting/history" , permissions: ["center", "instructor"] },
            ]},
          ]
        };
    }

    componentDidMount () {
    }

    _randerMainMenu = () =>{
      console.log(this.state.menus)
      return this.state.menus.map((item)=>{
        if (!item.sub) {
          return <>
             <li className="menu-item menu-item-active" aria-haspopup="true" key={item.title}>
                <NavLink className="menu-link" to={item.link} key={item.title}>
                  <span className="svg-icon menu-icon">
                    {item.icon}
                  </span>
                  <span className="menu-text">{item.title}</span>
                </NavLink>
              </li>
          </>
        } else {
          return <>
            <li className="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover" key={item.title}>
              <a href="javascript:;" className="menu-link menu-toggle">
                <span className="svg-icon menu-icon">
                  {item.icon}
                </span>
                <span className="menu-text">{item.title}</span>
                <i className="menu-arrow"/>
              </a>
              <div className="menu-submenu">
                <i className="menu-arrow"/>
                <ul className="menu-subnav">
                  <li className="menu-item menu-item-parent" aria-haspopup="true">
                    <span className="menu-link">
                      <span className="menu-text">{item.title}</span>
                    </span>
                  </li>
                  {
                    item.sub.map((subItem)=>{
                      return <>
                         <li
                            key={subItem.title}
                            className="menu-item"
                            aria-haspopup="true">
                          <NavLink className="menu-link" to={subItem.link} key={item.title}>
                            <i className="menu-bullet menu-bullet-dot">
                              <span/>
                            </i>
                            <span className="menu-text">{subItem.title}</span>
                          </NavLink>
                        </li>	
                      </>
                    })
                  }
                </ul>					
              </div>
            </li>
          </>
        }
      })
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

                          {this._randerMainMenu()}

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
