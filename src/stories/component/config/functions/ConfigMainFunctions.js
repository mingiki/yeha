import React from 'react';

const functions = [
  { 
    name : "validUserToken", 
    parameter : null, 
    return : "", 
    description : "토큰 유효성검사", 
  },
  { 
    name : "setDevicesInfo", 
    parameter : null,
    return : "", 
    description : "접속자의 로컬 디바이스 캠/마이크 설정 내용들입니다.", 
  },
  { 
    name : "connectWebCam", 
    parameter : null,
    return : "", 
    description : "접속자가 선택한 디바이스 캠을 접속하여 open vidu를 이용한 web rtc 통신을 합니다.", 
  },
  { 
    name : "onChangeMicrophone", 
    parameter :  [
      {name: "selectedOption", type: "object", description: "접속자 디바이스 마이크 중 선택한 캠"},
    ],
    return : "", 
    description : "디바이스 마이크 설정의 변경이 이루어졌을 경우 일어나는 이벤트 함수입니다.", 
  },
  { 
    name : "onChangeCamera", 
    parameter :  [
      {name: "selectedOption", type: "object", description: "접속자 디바이스 캠 중 선택한 캠"},
    ],
    return : "", 
    description : "디바이스 캠 설정의 변경이 이루어졌을 경우 일어나는 이벤트 함수입니다.", 
  },
  { 
    name : "replaceTrack", 
    parameter :  [
      {name: "videoSource", type: "object", description: "접속자 디바이스 캠"},
      {name: "audioSource", type: "object", description: "접속자 디바이스 마이크"},
      {name: "mirror", type: "boolean", description: "캠의 화면을 반대로 전환"},
    ],
    return : "", 
    description : "접속한 사용자의 디바이스 설정이 변경되었을때 화면을 재 수정해줍니다.", 
  },
  { 
    name : "initCamPublisher", 
    parameter : null,
    return : "", 
    description : "open vidu publish 캠 데이터를 localuser 모델에 넣어줍니다.", 
  },
  { 
    name : "initPublisher", 
    parameter : null,
    return : "", 
    description : "open vidu publish의 데이터를 localuser 모델에 넣어줍니다.", 
  },
  { 
    name : "destryoWebcamUser", 
    parameter : null,
    return : "", 
    description : "session에 접속된 유저의 모든 정보를 연결종료합니다.", 
  },
  { 
    name : "hasWebcamVideoActive", 
    parameter : null,
    return : "", 
    description : "publish 비디오 활성화", 
  },
  { 
    name : "hasWebcamAudioActive", 
    parameter : null,
    return : "", 
    description : "publish 마이크 활성화", 
  },
  { 
    name : "createProperties", 
    parameter : [
      {name: "videoSource", type: "object", description: "접속자 디바이스 캠"},
      {name: "audioSource", type: "object", description: "접속자 디바이스 마이크"},
      {name: "publishVideo", type: "boolean", description: "publish 캠 유무"},
      {name: "publishAudio", type: "boolean", description: "publis 마이크 유무"},
      {name: "mirror", type: "boolean", description: "캠의 화면을 반대로 전환"},
    ], 
    return : "", 
    description : "화면 publish 하는 설정들을 만들어줍니다.", 
  },
  { 
    name : "joinRoom", 
    parameter : null,
    return : "", 
    description : "openvidu 비디오 화면이 설정된 room으로 라우터를 리다이렉트합니다.", 
  },  
]

const ConfigMainFunctions = () => {
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

export default ConfigMainFunctions;