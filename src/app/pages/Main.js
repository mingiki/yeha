import React from "react";
// import MainComponent from '../components/main/MainComponent';


export default function Main(props) {
  console.log(props);
  return (
    <>
      <div className="row">
        <div className="col-lg-6 col-xxl-4">
          <div className={`card card-custom`}>
            {/* Header */}
            <div className="card-header border-0 pt-5">
              <h3 className="card-title font-weight-bolder ">액션</h3>
              <div className="card-toolbar">
                {/* <Dropdown className="dropdown-inline" drop="down" alignRight>
                  <Dropdown.Toggle
                      as={DropdownCustomToggler}
                  id="dropdown-toggle-top">
                    <i className="ki ki-bold-more-hor" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                    <DropdownMenu4 />
                  </Dropdown.Menu>
                </Dropdown> */}
              </div>
            </div>
            {/* Body */}
            <div className="card-body d-flex flex-column">
              <div className="flex-grow-1">
                <div id="kt_mixed_widget_14_chart" style={{height: "200px"}}></div>
              </div>
              <div className="pt-5">
                <p className="text-center font-weight-normal font-size-lg pb-7">
                </p>
                <a href="#" className="btn btn-success btn-shadow-hover font-weight-bolder w-100 py-3">테스트</a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-xxl-4">
          <div className={`card card-custom`}>
            {/* Header */}
            <div className="card-header border-0 pt-5">
              <h3 className="card-title font-weight-bolder ">액션</h3>
              <div className="card-toolbar">
                {/* <Dropdown className="dropdown-inline" drop="down" alignRight>
                  <Dropdown.Toggle
                      as={DropdownCustomToggler}
                  id="dropdown-toggle-top">
                    <i className="ki ki-bold-more-hor" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                    <DropdownMenu4 />
                  </Dropdown.Menu>
                </Dropdown> */}
              </div>
            </div>
            {/* Body */}
            <div className="card-body d-flex flex-column">
              <div className="flex-grow-1">
                <div id="kt_mixed_widget_14_chart" style={{height: "200px"}}></div>
              </div>
              <div className="pt-5">
                <p className="text-center font-weight-normal font-size-lg pb-7">
                </p>
                <a href="#" className="btn btn-success btn-shadow-hover font-weight-bolder w-100 py-3">테스트</a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-xxl-4">
          <div className={`card card-custom`}>
            {/* Header */}
            <div className="card-header border-0 pt-5">
              <h3 className="card-title font-weight-bolder ">액션</h3>
              <div className="card-toolbar">
                {/* <Dropdown className="dropdown-inline" drop="down" alignRight>
                  <Dropdown.Toggle
                      as={DropdownCustomToggler}
                  id="dropdown-toggle-top">
                    <i className="ki ki-bold-more-hor" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                    <DropdownMenu4 />
                  </Dropdown.Menu>
                </Dropdown> */}
              </div>
            </div>
            {/* Body */}
            <div className="card-body d-flex flex-column">
              <div className="flex-grow-1">
                <div id="kt_mixed_widget_14_chart" style={{height: "200px"}}></div>
              </div>
              <div className="pt-5">
                <p className="text-center font-weight-normal font-size-lg pb-7">
                </p>
                <a href="#" className="btn btn-success btn-shadow-hover font-weight-bolder w-100 py-3">테스트</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
