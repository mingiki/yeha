import React, { Component } from 'react';
import {Redirect} from "react-router-dom";

import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar,
  } from "../../../partials/controls";

class GroupViewComponent extends Component {
    constructor(props) {
        super(props);
        console.log("디테일화면 들어옵니다. 뚜시똬시 ㅋ");
        this.state = {           
        };
    }

    componentDidMount () {
    }

    render() {  
        return (
            <>  
                <Card>
                    <CardHeader title="그룹 상세화면">
                        <CardHeaderToolbar>
                            <button
                                type="button"
                                // onClick={backToProductsList}
                                className="btn btn-light"
                            >
                                <i className="fa fa-arrow-left"></i>
                                취소
                            </button>
                        </CardHeaderToolbar>
                    </CardHeader>
                    <CardBody>

                    </CardBody>
                </Card>
                
            </>         
        );
    }


}

export default GroupViewComponent;

