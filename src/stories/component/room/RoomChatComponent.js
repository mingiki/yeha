import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider , addLocaleData } from "react-intl";

import ChatComponent from '../../../app/components/room/chat/ChatComponent';
import UserModel from '../../../app/models/user-model';

import en from "../../../app/config/lang/en.json";
import ko from "../../../app/config/lang/ko.json";

//다국어 처리
const message = {'en' : en , 'ko' : ko}
const language = 'ko';

/**
 * 화상 채팅 컴포넌트
 *
 * - `user` 접속자 정보 입니다.
 * - `roomName` 접속한 방이름 입니다.
 * - `chatDisplay` 채팅 레이아웃 display style 값입니다.
 * - `close` 채팅 화면을 활성화/비활성화 합니다.
 * - `messageReceived` 채팅 메세지를 전달받았는지 확인하여 툴바에 메세지 알림을 줍니다.
 * 
 */
const RoomChatComponent = ({ user, roomName, chatDisplay , 
    close , messageReceived }) => {
    return (
        <>
            <IntlProvider locale={language} messages={message[language]}>                      
                <ChatComponent
                    user={user}
                    roomName={roomName}
                    chatDisplay={chatDisplay}
                    close={close}
                    messageReceived={messageReceived}
                />  
            </IntlProvider>
        </>
    );
};

RoomChatComponent.propTypes = {
    /** api user  */
    user: PropTypes.object,
    /** api room name */
    roomName: PropTypes.string,
    /** 채팅 레이아웃 display style 값 */
    chatDisplay: PropTypes.object,
    /** 채팅 레이아웃 활성화/비활성화 함수 */
    close: PropTypes.func,
    /** 채팅 메세지 전달 알림 함수 */
    messageReceived: PropTypes.func,
};

RoomChatComponent.defaultProps = {
    user: PropTypes.object,
    roomName: PropTypes.string,
    chatDisplay: PropTypes.object,
    close: PropTypes.func,
    messageReceived: PropTypes.func,
};

export default RoomChatComponent;