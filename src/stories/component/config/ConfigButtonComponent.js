import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'reactstrap';
import { AccountCircle, Mic, MicOff, Videocam, VideocamOff, VolumeUp, VolumeOff, Close} from '@material-ui/icons';


/**
 * 디바이스 환경설정에 넣은 버튼 컴포넌트입니다.
 *
 * - `id` 값을 `joinButton`으로 값을 넣어주면 style 명시한 입장버튼의 스타일이 입혀집니다.
 * - `onClick` reactstrap기반의 버튼이므로 onclick 함수를 사용할수 있습니다.
 * - `className` element의 class 명을 넣어줍니다.
 */
const ConfigButtonComponent = ({ id, className, onClick }) => {
  return (
    <div>
      <div>
        <h3>입장 버튼</h3>
        <button id="joinButton" onClick={null} >
            입장 버튼
        </button>

        <h3>아이콘 버튼</h3>
        <Button className="config-icon-button">
            <AccountCircle className="config-icon-button-icon" id="statususerName" />
        </Button>
      </div>
    </div>
  );
};

ConfigButtonComponent.propTypes = {
    /** Element ID */
    id: PropTypes.string,
    /** Style class 명 */
    className: PropTypes.string,
    /** 버튼을 눌렀을 때 함수 */
    onClick: PropTypes.func,
};

ConfigButtonComponent.defaultProps = {
    id: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func
};

export default ConfigButtonComponent;