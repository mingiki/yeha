import React from 'react';

const states = [
  { name : "microphones", description : "접속한 사용자 디바이스 마이크 목록 입니다.", default : "[]"},
  { name : "cameras", description : "접속한 사용자 디바이스 카메라 목록 입니다.", default : "[]"},
  { name : "microphonesOptions", description : "접속 한 사용자 디바이스 마이크 목록을 react-select에 맞게 convert한 데이터입니다.", default : "[]"},
  { name : "camerasOptions", description : "접속 한 사용자 디바이스 카메라 목록을 react-select에 맞게 convert한 데이터입니다.", default : "null"},
  { name : "microphonesSelected", description : "microphonesOptions 중 사용자가 현재 선택한 값입니다.", default : "null"},
  { name : "camerasSelected", description : "camerasOptions 중 사용자가 현재 선택한 값입니다.", default : "null"},
  { name : "isVideoActive", description : "open vidu 카메라 기능 활성화 유무에 대한 값입니다.", default : "true"},
  { name : "isAudioActive", description : "open vidu 마이크 기능 활성화 유무에 대한 값입니다.", default : "true"},
  { name : "user", description : "타 사이트에서 eyeson-core에 생성한 유저 값입니다.", default : "null"},
  { name : "room", description : "타 사이트에서 eyeson-core에 생성한 방 값입니다.", default : "null"},
  { name : "valid", description : "토큰에 대한 유효성 값입니다.", default : "false"},
  { name : "isRedirect", description : "router redirect 유무에 대한 값입니다.", default : "false"},
  { name : "session", description : "open vidu에서 제공하는 session 객체에 대한값입니다.", default : "null"},
  { name : "localUser", description : "react openvidu user model 값 입니다. (openvidu 설정 관련된 값들이 들어가있습니다.)", default : "null"},
]

const RoomMainStates = () => {
  return (
    <>
    <table class="docblock-propstable css-1u9rxqo">
      <thead class="docblock-propstable-head">
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Default</th>
        </tr>
      </thead>
      <tbody class="docblock-propstable-body">
        {
          states.map((item)=>{
            return <>
                <tr>
                  <td>
                    <span class="status-table-span ">{item.name}</span>
                  </td>
                  <td>
                    <span class="status-table-span status-table-span-font">{item.description}</span>
                  </td>
                  <td>
                    <span class="status-table-span status-table-span-font">{item.default}</span>
                  </td>
                </tr>
            </>
          })
        }
      </tbody>
    </table>
  </>
  );
};

export default RoomMainStates;