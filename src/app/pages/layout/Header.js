import React from "react";
import { Link } from "react-router-dom";
import objectPath from "object-path";

import UtilService from "../../service/UtilService";
class Header extends React.Component {

  constructor(props) {
    super(props);
    this.util = new UtilService();
    this.state = {

    }
  }

  componentDidMount(){
    
  }


  render() {
    return (
      <>
        <header className="top-header">
          <div className="container">
            <div id="logo">
              {/* <img src="/resources/images/logo/logo_onair01.png" alt="" /> */}
            </div>
            
            <nav className="gnb">
              <ul>
                <li>
                  
                </li>
              </ul>
            </nav>

            <div id="util">
              <ul>
                <li>
              <button className="btn btn-list">
                {/* <img src="${pageContext.request.contextPath}/resources/images/common/ico_list02.png" alt="더 보기 아이콘" /> */}
              </button>
              <div className="util-list">
                <ul>
                  <li>
                    <div className="select">
                      <select id="languageTarget">
                        <option value="KR" data-value="KR">한국어</option>
                        <option value="CN" data-value="CN">中文</option>
                        <option value="EN" data-value="EN">English</option>
                      </select>
                    </div>
                  </li>                
                  <li>
                    <a id="logout" href="#" className="btn btn-log">
                      <span data-detect="list.logout"></span>
                    </a>
                  </li>
                </ul>
              </div>
                </li>
              </ul>
            </div>
          </div>
        </header>
      </>
    );
  }
}
export default Header;
