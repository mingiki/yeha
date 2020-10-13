import React from 'react';
import { storiesOf } from '@storybook/react';

import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';

import '../../../../app/components/config/ConfigComponent.css';

import ConfigMainComponent from '../../../component/config/ConfigMainComponent';
import ConfigMainDocument from '../../../mdx/config/ConfigMainDocument.mdx';


export default {
  title: 'library|OpenVidu', // 스토리북에서 보여질 그룹과 경로를 명시
  decorators: [withKnobs],
  // component: ConfigMainComponent,
  parameters: {
    componentSubtitle: 'Eyeson-core openvidu custom 컴포넌트',
    options: { 
    }
  }
};

/**
 * 디바이스 환경설정 메인 화면입니다.
 */
export const ovMain = () => (
  <>
    <ConfigMainComponent />
  </>
);

ovMain.story = {
  name: '디바이스 메인 환경설정',
  parameters: {
    docs: {
      page: ConfigMainDocument
    }
  }
}

