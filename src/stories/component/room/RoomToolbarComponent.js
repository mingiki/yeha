import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider , addLocaleData } from "react-intl";

import ToolbarComponent from '../../../app/components/room/toolbar/ToolbarComponent';

import en from "../../../app/config/lang/en.json";
import ko from "../../../app/config/lang/ko.json";

//다국어 처리
const message = {'en' : en , 'ko' : ko}
const language = 'ko';

/**
 * 화상 탑 툴바 컴포넌트
 *
 * - `mySessionId` open vidu 세션 아이디
 * - `roomName` 접속한 방 명
 * - `user` 접속자 정보
 * - `camStatusChanged` 접속자 캠 상태를 변경해줍니다.
 * - `micStatusChanged` 접속자 마이크 상태를 변경해줍니다.
 * - `screenShare` 스크린 쉐어 함수
 * - `stopScreenShare` 스크린 쉐어 종료 함수
 * - `toggleFullscreen` 접속자의 화면을 최대화면으로 채워줍니다. 
 * - `leaveSession` open vidu session 연결을 끊습니다.
 * - `toggleChat` 채팅 화면을 활성화합니다.
 * - `openConfigModal` 디바이스 환경설정 모달팝업을 활성화합니다.
 * - `openChat` 채팅 화면 활성화 custom 함수
 * 
 */
const RoomToolbarComponent = ({ mySessionId, roomName, user , showNotification , 
    camStatusChanged , micStatusChanged, screenShare, stopScreenShare, toggleFullscreen,
    leaveSession, toggleChat, openConfigModal, openChat}) => {
    return (
        <>
            <IntlProvider locale={language} messages={message[language]}>                      
                <ToolbarComponent
                    sessionId={mySessionId}
                    roomName={roomName}
                    user={user}
                    showNotification={showNotification}
                    camStatusChanged={camStatusChanged}
                    micStatusChanged={micStatusChanged}
                    screenShare={screenShare}
                    stopScreenShare={stopScreenShare}
                    toggleFullscreen={toggleFullscreen}
                    leaveSession={leaveSession}
                    toggleChat={toggleChat}
                    openConfigModal={openConfigModal}
                    openChat={openChat}
                />  
            </IntlProvider>
        </>
    );
};

RoomToolbarComponent.propTypes = {
    /** open vidu 세션아이디 */
    mySessionId: PropTypes.string,
    /** api room name */
    roomName: PropTypes.string,
    /** api user  */
    user: PropTypes.object,
    /** 알림 활성화 함수 */
    showNotification: PropTypes.func,
    /** 캠 활성화 함수 */
    camStatusChanged: PropTypes.func,
    /** 마이크 활성화 함수 */
    micStatusChanged: PropTypes.func,
    /** 스크린쉐어 연결 함수 */
    screenShare: PropTypes.func,
    /** 스크린쉐어 해제 함수 */
    stopScreenShare: PropTypes.func,
    /** 풀스크린 함수 */
    toggleFullscreen: PropTypes.func,
    /** 세션 종료 함수 */
    leaveSession: PropTypes.func,
    /** 채팅 활성화 함수 */
    toggleChat: PropTypes.func,
    /** 디바이스 설정 모달 오픈 함수 */
    openConfigModal: PropTypes.func,
    /** 채팅 레이아웃 오픈 함수  */
    openChat: PropTypes.func
};

RoomToolbarComponent.defaultProps = {
     mySessionId: PropTypes.string,
     roomName: PropTypes.string,
     user: PropTypes.object,
     showNotification: PropTypes.func,
     camStatusChanged: PropTypes.func,
     micStatusChanged: PropTypes.func,
     screenShare: PropTypes.func,
     stopScreenShare: PropTypes.func,
     toggleFullscreen: PropTypes.func,
     leaveSession: PropTypes.func,
     toggleChat: PropTypes.func,
     openConfigModal: PropTypes.func,
     openChat: PropTypes.func
};

export default RoomToolbarComponent;