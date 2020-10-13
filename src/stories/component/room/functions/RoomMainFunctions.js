import React from 'react';

const functions = [
  { 
    name : "setDeviceConfig", 
    parameter : null, 
    return : "", 
    description : "디바이서 환경설정에서 선택한 캠과 마이크를 활성화 해줍니다.", 
  },
  { 
    name : "joinSession", 
    parameter : null,
    return : "", 
    description : "open vidu session 모델을 생성해줍니다. (생성과 동시에 데이터 채널 통신에대한 설정도 같이 해줍니다.)", 
  },
  { 
    name : "connectToSession", 
    parameter : null,
    return : "", 
    description : "설정한 세션으로 api와 통신하여 open vidu session을 생성합니다. (openvidu session과 통신하면서 핸들링 가능한 client param도 같이 설정해줍니다.)", 
  },
  { 
    name : "connect", 
    parameter :  [
      {name: "token", type: "object", description: "api 쪽에서 넘겨주는 openvidu token"},
    ],
    return : "", 
    description : "api 쪽에서 open vidu session이 생성완료되면 토큰이 넘어오며 토큰으로 openvidu 와 client에서 통신을 시작합니다.", 
  },
  { 
    name : "connectWebCam", 
    parameter :  null,
    return : "", 
    description : "디바이스 설정화면에서 선택한 디바이스정보로 publish 해줍니다.", 
  },
  { 
    name : "leaveSession", 
    parameter :  null,
    return : "", 
    description : "open vidu session 연결을 끊습니다.", 
  },
  { 
    name : "camStatusChanged", 
    parameter : null,
    return : "", 
    description : "접속자 캠 정보를 변경해줍니다.", 
  },
  { 
    name : "micStatusChanged", 
    parameter : null,
    return : "", 
    description : "접속자 마이크 정보를 변경해줍니다.", 
  },
  { 
    name : "deleteSubscriber", 
    parameter : null,
    return : "", 
    description : "subscriber 사용자를 state 데이터에서 삭제합니다. (데이터 채널 통신 중 subscriber가 접속이 끊겼을 경우)", 
  },
  { 
    name : "subscribeToStreamCreated", 
    parameter : null,
    return : "", 
    description : "subscriber 사용자를 생성해줍니다.", 
  },
  { 
    name : "subscribeToStreamDestroyed", 
    parameter : null,
    return : "", 
    description : "subscriber 연결스트림을 해제합니다.", 
  },

  { 
    name : "subscribeToUserChanged", 
    parameter : null,
    return : "", 
    description : "데이터 채널 통신 중 유저 변경이 이루어졌을 경우 state 데이터의 원격 접속자들을 변경합니다. (session 접속 / session 해제)", 
  },
  { 
    name : "updateLayout", 
    parameter : null,
    return : "", 
    description : "video layout을 사용자 접속자수에 맞게 동적으로 화면 조절을 해줍니다.", 
  },
  { 
    name : "sendSignalUserChanged", 
    parameter : null,
    return : "", 
    description : "유저 변경 데이터 채널 통신을 송신합니다.", 
  },
  { 
    name : "toggleFullscreen", 
    parameter : null,
    return : "", 
    description : "접속자의 화면을 최대화면으로 채워줍니다.", 
  },
  { 
    name : "screenShare", 
    parameter : null,
    return : "", 
    description : "스크린 공유 화면 기능을 활성화하며 어플리케이션 등 공유화면을 선택할수 있습니다.", 
  },

  { 
    name : "stopScreenShare", 
    parameter : null,
    return : "", 
    description : "스크린 공유를 종료합니다.", 
  },
  { 
    name : "toggleChat", 
    parameter : null,
    return : "", 
    description : "채팅 화면을 활성화합니다.", 
  },
  { 
    name : "checkNotification", 
    parameter : null,
    return : "", 
    description : "채팅 메세지를 전달받았는지 확인하여 툴바에 메세지 알림을 줍니다.", 
  },
  { 
    name : "checkSize", 
    parameter : null,
    return : "", 
    description : "접속자의 브라우져 사이즈를 확인합니다.", 
  },
  { 
    name : "openConfigModal", 
    parameter : null,
    return : "", 
    description : "디바이스 환경설정 모달팝업을 활성화합니다.", 
  },
  { 
    name : "closeConfigModal", 
    parameter : null,
    return : "", 
    description : "디바이스 환경설정 모달팝업을 비활성화합니다.", 
  },
  { 
    name : "openNoticeModal", 
    parameter : null,
    return : "", 
    description : "데이터 채널 통신 중 알림 전달 할때 알림모달팝업을 활성화합니다.", 
  },
  { 
    name : "closeNoticeModal", 
    parameter : null,
    return : "", 
    description : "데이터 채널 통신 중 알림 전달 할때 알림모달팝업을 비활성화합니다.", 
  },
  { 
    name : "subscribersConfigChange", 
    parameter : [
      {name: "subscriber", type: "object", description: "디바이스 환경설정 변경이 이루어지는 subscriber"},
      {name: "type", type: "string", description: "mic : 마이크 , cam : 웹캠"},
      {name: "active", type: "boolean", description: "활성화 유무"},
    ], 
    return : "", 
    description : "subscribers의 디바이스 환경설정 변경 데이터 채널 통신을 송부합니다.", 
  },
  { 
    name : "subscribersBan", 
    parameter : [
      {name: "subscriber", type: "object", description: "session에서 강퇴 될 subscriber"},
    ], 
    return : "", 
    description : "session에서 강퇴될 subscriber 데이터 채널 통신을 송부합니다.", 
  },
  { 
    name : "adminUserNoti", 
    parameter : [
      {name: "subscriber", type: "object", description: "알림을 보낼 subscriber"},
      {name: "type", type: "string", description: "알림의 형태"},
    ], 
    return : "", 
    description : "subscriber 알림 데이터 채널 통신을 송부합니다.", 
  },
  { 
    name : "message", 
    parameter : [
      {name: "message", type: "string", description: "채팅 메세지"},
    ], 
    return : "", 
    description : "subscriber 보낼 채팅 데이터 채널 통신을 송부합니다.", 
  },
  { 
    name : "openChat", 
    parameter : null, 
    return : "", 
    description : "채팅 화면 활성화 custom 함수", 
  }
]

const RoomMainFunctions = () => {
  return (
    <>
    <table class="docblock-propstable css-1u9rxqo">
      <thead class="docblock-propstable-head">
        <tr>
          <th>Name</th>
          <th>Parameter</th>
          <th>Return</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody class="docblock-propstable-body">
        {
          functions.map((item)=>{
            return <>
                <tr>
                  <td>
                    <span class="status-table-span ">{item.name}</span>
                  </td>
                  <td>
                      {item.parameter ? 
                        <>
                          <table class="docblock-propstable css-1u9rxqo">
                              <thead class="docblock-propstable-head">
                                <tr>
                                  <th>Name</th>
                                  <th>Type</th>
                                  <th>Description</th>
                                </tr>
                              </thead>
                              <tbody class="docblock-propstable-body">
                                {item.parameter.map((param)=>{
                                  return <>
                                        <tr>
                                          <td>
                                            <span class="status-table-span ">{param.name}</span>
                                          </td>
                                          <td>
                                            <span class="status-table-span status-table-span-font">{param.type}</span>
                                          </td>
                                          <td>
                                            <span class="status-table-span status-table-span-font">{param.description}</span>
                                          </td>
                                        </tr>
                                      </>
                                  })
                                }
                              </tbody>
                          </table>
                        </>
                    
                      :
                      <>
                        <span class="status-table-span status-table-span-font">없음</span>
                      </>
                    }
                  </td>
                  <td>
                    <span class="status-table-span status-table-span-font">{item.return}</span>
                  </td>
                  <td>
                    <span class="status-table-span status-table-span-font">{item.description}</span>
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

export default RoomMainFunctions;