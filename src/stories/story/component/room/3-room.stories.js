import React from 'react';
import { storiesOf } from '@storybook/react';

import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';

import UserModel from '../../../../app/models/user-model';

import RoomMainComponent from '../../../component/room/RoomMainComponent';
import RoomMainDocument from '../../../mdx/room/RoomMainDocument.mdx';

import RoomToolbarComponent from '../../../component/room/RoomToolbarComponent';
import RoomToolbarDocument from '../../../mdx/room/RoomToolbarDocument.mdx';

import RoomChatComponent from '../../../component/room/RoomChatComponent';
import RoomChatDocument from '../../../mdx/room/RoomChatDocument.mdx';

import RoomConfigModalComponent from '../../../component/room/RoomConfigModalComponent';
// import RoomChatDocument from '../../../mdx/room/RoomChatDocument.mdx';


export default {
  title: 'component|Room', // 스토리북에서 보여질 그룹과 경로를 명시
  decorators: [withKnobs],
  // component: ConfigMainComponent,
  parameters: {
    componentSubtitle: '디바이스 설정화면에 나오는 버튼 컴포넌트',
    options: { 
    }
  }
};

/**
 * 화상 메인화면
 */
export const RoomMain = () => (
  <>
    <RoomMainComponent />
  </>
);

RoomMain.story = {
  name: 'Main',
  parameters: {
    docs: {
      page: RoomMainDocument
    }
  }
}


const mySessionId = "testId";
const roomName = "roomName";
const user = new UserModel();
const showNotification = (e) => {
    console.log(e);
};
const camStatusChanged  = (e) => {
    console.log(e);
};
const micStatusChanged  = (e) => {
    console.log(e);
};
const screenShare  = (e) => {
    console.log(e);
}; 
const stopScreenShare  = (e) => {
    console.log(e);
};
const toggleFullscreen  = (e) => {
    console.log(e);
};
const leaveSession  = (e) => {
    console.log(e);
};
const toggleChat  = (e) => {
    console.log(e);
};
const openConfigModal  = (e) => {
    console.log(e);
};
const openChat  = (e) => {
    console.log(e);
};

/**
 * 화상 툴바 화면
 */
export const RoomToolbar = () => (
  <>
    <RoomToolbarComponent 
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
  </>
);

RoomToolbar.story = {
  name: 'Top Toolbar',
  parameters: {
    docs: {
      page: RoomToolbarDocument
    }
  }
}

const chatDisplay = { display: 'block' };
const messageReceived = (e) => {
  console.log(e);
};
const close = (e) => {
  console.log(e);
};

/**
 * 화상 채팅 화면
 */
export const RoomChat = () => (
  <>
    <RoomChatComponent 
       user={user}
       roomName={roomName}
       chatDisplay={chatDisplay}
       close={close}
       messageReceived={messageReceived}
    />
  </>
);

RoomChat.story = {
  name: 'Chat',
  parameters: {
    docs: {
      page: RoomChatDocument
    }
  }
}

const subscribers = [
  {nickname : "테스트1 유저"},
  {nickname : "테스트2 유저"},
  {nickname : "테스트3 유저"},
]
const isOpen = true;
const subscribersConfigChange = (e) => {
  console.log(e);
}; 
const subscribersBan = (e) => {
  console.log(e);
}; 
const onRequestClose = (e) => {
  console.log(e);
}; 


/**
 * 화상 다른 디바이스 환경설정 모달팝업 화면
 */
export const RoomConfigModal = () => (
  <>
    <RoomConfigModalComponent 
       user={user}
       subscribers={subscribers}
       isOpen={isOpen} 
       subscribersConfigChange={subscribersConfigChange}
       subscribersBan={subscribersBan}
       onRequestClose={onRequestClose}
    />
  </>
);

RoomConfigModal.story = {
  name: 'Subscriber Confg Modal',
  parameters: {
    docs: {
      page: RoomChatDocument
    }
  }
}