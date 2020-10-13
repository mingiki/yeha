import React from 'react';
import { storiesOf } from '@storybook/react';

import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';

import '../../../../app/components/config/ConfigComponent.css';

import ConfigMainComponent from '../../../component/config/ConfigMainComponent';
import ConfigMainDocument from '../../../mdx/config/ConfigMainDocument.mdx';

import ConfigButtonComponent from '../../../component/config/ConfigButtonComponent';
import ConfigButtonDocument from '../../../mdx/config/ConfigButtonDocument.mdx';

import ConfigSelectComponent from '../../../component/config/ConfigSelectComponent';
import ConfigSelectDocument from '../../../mdx/config/ConfigSelectDocument.mdx';

export default {
  title: 'component|Config', // 스토리북에서 보여질 그룹과 경로를 명시
  decorators: [withKnobs],
  // component: ConfigMainComponent,
  parameters: {
    componentSubtitle: '디바이스 설정화면에 나오는 버튼 컴포넌트',
    options: { 
    }
  }
};

/**
 * 디바이스 환경설정 메인 화면입니다.
 */
export const ConfigMain = () => (
  <>
    <ConfigMainComponent />
  </>
);

ConfigMain.story = {
  name: 'Main',
  parameters: {
    docs: {
      page: ConfigMainDocument
    }
  }
}

/**
 * 디바이스 환경설정 버튼 화면입니다.
 */
export const ConfigButton = () => (
  <>
    <ConfigButtonComponent />
  </>
);

ConfigButton.story = {
  name: 'Button',
  parameters: {
    docs: {
      page: ConfigButtonDocument
    }
  }
}

/**
 * 디바이스 환경설정 셀렉트 화면입니다.
 */
export const ConfigSelect = () => (
  <>
    <ConfigSelectComponent />
  </>
);

ConfigSelect.story = {
  name: 'Select',
  parameters: {
    docs: {
      page: ConfigSelectDocument
    }
  }
}