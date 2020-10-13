import React from 'react';
import PropTypes from 'prop-types';

import Select from 'react-select';

/**
 * 디바이스 환경설정에 넣은 셀렉트 컴포넌트입니다.
 * react-select
 * https://react-select.com/home
 * 
 * - `value` 선택 된 값을 넣어줍니다. 데이터 형식은 json 형식 => ex) {label : 값 , value : 값 } 
 * - `onChange` select가 변경되었을 때 일어나는 이벤트 함수입니다.
 * - `options` select options 에 대한 데이터를 넣어줍니다.
 */
const ConfigSelectComponent = ({ value, onChange, options }) => {
  return (
    <div>
      <div>
        <h3>디바이스 선택 select</h3>
        <Select 
            options={
              [
                {label : "1", value : "1"},
                {label : "2", value : "2"},
                {label : "3", value : "3"},
                {label : "4", value : "4"},
                {label : "5", value : "5"},
              ]
            }
        />
      </div>
    </div>
  );
};

ConfigSelectComponent.propTypes = {
    /** 셀렉트 옵션이 선택된 값 */
    value: PropTypes.object,
    /** 셀렉트 옵션이 선택되었을 때 일어나는 이벤트 함수 */
    onChange: PropTypes.func,
    /** 셀렉트 옵션에 대한 값*/
    options: PropTypes.object,
};

ConfigSelectComponent.defaultProps = {
    value: PropTypes.object,
    onChange: PropTypes.func,
    options: PropTypes.object
};

export default ConfigSelectComponent;