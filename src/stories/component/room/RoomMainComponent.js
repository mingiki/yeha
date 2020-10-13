import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider , addLocaleData } from "react-intl";

import VideoRoomTemplateComponent from '../../templateComponent/room/VideoRoomTemplateComponent';

import en from "../../../app/config/lang/en.json";
import ko from "../../../app/config/lang/ko.json";

//다국어 처리
const message = {'en' : en , 'ko' : ko}
const language = 'ko';


/**
 * 화상 화면
 *
 * - `valid` 유효성 검사 상태를 전달 받습니다.
 * - `user` 접속한 사용자의 정보
 * - `room` 생성된 화상 방의 정보
 * - `camerasSelected` 디바이스 환경설정에서 선택한 웹캠 정보
 * - `microphonesSelected` 디바이스 환경 설정에서 선택한 마이크 정보
 * - `setData` MainComponent에 데이터를 전달해줍니다. (차후 데이터가 많아질 시 redux를 이용합니다.)
 * 
 */
const RoomMainComponent = ({ valid, user, room , camerasSelected , microphonesSelected , setData}) => {
    return (
        <>
            <IntlProvider locale={language} messages={message[language]}>                      
                <VideoRoomTemplateComponent/>  
            </IntlProvider>
        </>
    );
};

RoomMainComponent.propTypes = {
    /** 유효성검사 유무 */
    valid: PropTypes.bool,
    /** 생성된 사용자 정보 */
    user: PropTypes.object,
    /** 생성된 방정보 */
    room: PropTypes.object,
    /** 선택한 웹캠정보 */
    camerasSelected: PropTypes.object,
    /** 선택한 마이크 정보 */
    microphonesSelected: PropTypes.object,
    /** 메인 데이터 핸들링 함수 */
    setData: PropTypes.func
};

RoomMainComponent.defaultProps = {
    valid: PropTypes.bool,
    user: PropTypes.object,
    room: PropTypes.object,
    camerasSelected: PropTypes.object,
    microphonesSelected: PropTypes.object,
    setData: PropTypes.func,
};

export default RoomMainComponent;