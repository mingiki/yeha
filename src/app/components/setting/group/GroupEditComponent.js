import React, { Component } from 'react';
import {Redirect} from "react-router-dom";

import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar,
  } from "../../../partials/controls";

class GroupEditComponent extends Component {
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
                <Card>
                    <CardHeader title="그룹 수정">
                        <CardHeaderToolbar>
                            <button
                                type="button"
                                // onClick={backToProductsList}
                                className="btn btn-light"
                            >
                                <i className="fa fa-arrow-left"></i>
                                취소
                            </button>
                            {`  `}
                            <button className="btn btn-light ml-2">
                                <i className="fa fa-redo"></i>
                                초기화
                            </button>
                            {`  `}
                            <button
                                type="submit"
                                className="btn btn-primary ml-2"
                                // onClick={saveProductClick}
                            >
                                저장
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

export default GroupEditComponent;

