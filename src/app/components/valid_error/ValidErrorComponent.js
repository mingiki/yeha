import React, { Component } from 'react';
import { connect } from "react-redux";
import {FormattedMessage , useIntl} from "react-intl";

class ValidErrorComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        
        };

    }

    componentDidMount (){
        
    }

    _validRander () {
        let validResultCode = this.props.validResultCode;
        console.log(validResultCode);
        
        //존재하지 않는 방에 입장하는 경우
        if (validResultCode == "room.notExists") {

            return <> 
                <FormattedMessage id="room.notExists" />
            </>

        //방 입장 이후 방이 삭제된 경우
        } else if (validResultCode == "room.Deleted") {

            return <> 
                <FormattedMessage id="room.Deleted" />
            </>

        //존재하지 않는 유저 인 경우
        } else if (validResultCode == "user.notExists") {

            return <> 
                <FormattedMessage id="user.notExists" />
            </>

        //유효하지 않은 토큰
        } else if (validResultCode == "auth.invalid") {

            return <> 
                <FormattedMessage id="auth.invalid" />
            </>

        //만료된 토큰
        } else if (validResultCode == "auth.expired") {

            return <> 
                <FormattedMessage id="auth.expired" />
            </>

        //중복 로그인
        } else if (validResultCode == "auth.duplicated") {

            return <> 
                <FormattedMessage id="auth.duplicated" />
            </>

        }
    }

    render() {
        return (
            <>  
                {/* {this._validRander()}
                 */}
                <div id="notfound">
                    <div className="notfound">
                        <div className="notfound-title">
                            <img className="notfound-logo" 
                                src={process.env.REACT_APP_HOST+"/images/eyesON_logo.png"} />
                            <h1>잘못된 접근</h1>
                        </div>
                        <h2>잘못된 URL 입니다.</h2>
                        <p>eyeson-core에 접근 불가한 url입니다.</p>
                        <p>다시한번 확인 해주시기 바랍니다.</p>
                    </div>
                </div>
            </>         
        );
    }


}


export default ValidErrorComponent;
