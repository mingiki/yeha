import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider , addLocaleData } from "react-intl";

import DialogConfig from '../../../app/components/room/dialog-config/DialogConfig';

import en from "../../../app/config/lang/en.json";
import ko from "../../../app/config/lang/ko.json";

//다국어 처리
const message = {'en' : en , 'ko' : ko}
const language = 'ko';

/**
 * 화상 디바이스 환경설정 모달 팝업 컴포넌트
 *
 * - `user` 접속자 정보
 * - `subscribers` open vidu session subscribers 데이터
 * - `isOpen` 화상 디바이스 환경설정 모달 팝업 오픈 유무
 * - `subscribersConfigChange` subscribers의 디바이스 환경설정 변경 데이터 채널 통신을 송부합니다.
 * - `subscribersBan` session에서 강퇴될 subscriber 데이터 채널 통신을 송부합니다.
 * - `onRequestClose` 화상 디바이스 환경설정 모달 팝업 닫기 함수입니다.
 */
const RoomConfigModalComponent = ({ user, subscribers, isOpen , subscribersConfigChange, subscribersBan, onRequestClose}) => {
    return (
        <>
            <IntlProvider locale={language} messages={message[language]}>                      
                <DialogConfig
                   user={user}
                   subscribers={subscribers}
                   isOpen={isOpen} 
                   subscribersConfigChange={subscribersConfigChange}
                   subscribersBan={subscribersBan}
                   onRequestClose={onRequestClose}
                />  
            </IntlProvider>
        </>
    );
};

RoomConfigModalComponent.propTypes = {
    /** api user  */
    user: PropTypes.object,
    /** open vidu session subscirbers 데이터 */
    subscribers: PropTypes.func,
    /** 팝업 오픈 유무*/
    isOpen: PropTypes.func,
    /** open vidu session subscirbers 디바이스 변경 함수 (데이터 채널 통신) */
    subscribersConfigChange: PropTypes.func,
    /** oepn vidu session subscirbers session 강퇴 함수 (데이터 채널 통신) */
    subscribersBan: PropTypes.func,
    /** 팝업 닫기 함수 */
    onRequestClose: PropTypes.func    
};

RoomConfigModalComponent.defaultProps = {
    user: PropTypes.object,
    subscribers: PropTypes.func,
    isOpen: PropTypes.func,
    subscribersConfigChange: PropTypes.func,
    subscribersBan: PropTypes.func,
    onRequestClose: PropTypes.func    
};

export default RoomConfigModalComponent;