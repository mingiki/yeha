import React from 'react';
import PropTypes from 'prop-types';

import ConfigTemplateComponent from '../../templateComponent/config/ConfigTemplateComponent';

/**
 * 디바이스 환경설정 화면입니다.
 *
 * - `roomId` 타 사이트에서 get 방식으로 전달받습니다.
 * - `userId` 타 사이트에서 local strogae에 저장후 호출합니다.
 * - `userToken` 타 사이트에서 local storge에 저장후 호출합니다.
 * - `setData` MainComponent에 데이터를 전달해줍니다. (차후 데이터가 많아질 시 redux를 이용합니다.)
 */
const ConfigMainComponent = ({ roomId, userId, userToken , setData }) => {
    return (
        <>
            <ConfigTemplateComponent/>
        </>
    );
};

ConfigMainComponent.propTypes = {
    /** 방 아이디 */
    roomId: PropTypes.string,
    /** 사용자 아이디 */
    userId: PropTypes.string,
    /** 사용자 토큰 */
    userToken: PropTypes.string,
    /** 메인 데이터 핸들링 함수 */
    setData: PropTypes.func,
    
};

ConfigMainComponent.defaultProps = {
    roomId: PropTypes.string,
    userId: PropTypes.string,
    userToken: PropTypes.string,
    setData: PropTypes.func,
};

export default ConfigMainComponent;