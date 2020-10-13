import React, { Component } from 'react';
import ReactDOM from 'react-dom'

import { Input , Row , Col, Card, Button, CardHeader, CardFooter, CardBody, CardTitle, CardText} from 'reactstrap';

import { OpenVidu } from 'openvidu-browser';
import DialogExtensionComponent from '../../../app/components/room/dialog-extension/DialogExtension';
import DialogConfigComponent from '../../../app/components/room/dialog-config/DialogConfig';
import DialogNoticeComponent from '../../../app/components/room/dialog-notice/DialogNotice';
import ChatComponent from '../../../app/components/room/chat/ChatComponent';
import StreamComponent from '../../../app/components/room/stream/StreamComponent';
import VideoRoomLayoutComponent from '../../../app/components/room/layout/VideoRoomLayoutComponent';

import OpenviduService from '../../../app/service/OpenviduService';
import ApiService from '../../../app/service/ApiService';
import UserModel from '../../../app/models/user-model';
import ToolbarComponent from '../../../app/components/room/toolbar/ToolbarComponent';
import Drawer from '@material-ui/core/Drawer';

import '../../../app/components/config/ConfigComponent.css';
import '../../../app/components/main/MainComponent.css';
import '../../../app/components/room/VideoRoomComponent.css';

import '../templateStyle.scss';
import '../../../index.scss';

import styled from "styled-components";
import UtilService from '../../../app/service/UtilService';
const StyledPaper = styled.div`
   width : 400px;
   background-color: #6b6b6b;#messageInput
`;

var localUser = new UserModel();

class VideoRoomComponent extends Component {
    constructor(props) {
        super(props);      

        const valid = props.valid;
        const user = props.user;
        const room = props.room;
        const camerasSelected = props.camerasSelected;
        const microphonesSelected = props.microphonesSelected;

        this.hasBeenUpdated = false;
        this.layout = new OpenviduService();
        this.api = new ApiService();
        this.util = new UtilService();
        this.openViduLayoutOptions = {
            maxRatio: 3 / 2, // The narrowest ratio that will be used (default 2x3)
            minRatio: 13 / 20, // The widest ratio that will be used (default 16x9)
            fixedRatio: false, // If this is true then the aspect ratio of the video is maintained and minRatio and maxRatio are ignored (default false)
            bigClass: 'OV_big', // The class to add to elements that should be sized bigger
            bigPercentage: 0.8, // The maximum percentage of space the big ones should take up
            bigFixedRatio: false, // fixedRatio for the big ones
            bigMaxRatio: 3 / 2, // The narrowest ratio to use for the big elements (default 2x3)
            bigMinRatio: 13 / 20, // The widest ratio to use for the big elements (default 16x9)
            bigFirst: true, // Whether to place the big one in the top left (true) or bottom right
            animate: true, // Whether you want to animate the transitions
        };
        this.state = {
            valid : valid ? valid : false,
            roomName : room ? room.name : undefined,
            mySessionId: room ? room.id : undefined,
            maxUserCnt: room ? room.maxUserCnt : undefined,
            myUserName: user ? user.name : undefined,
            audioSource: microphonesSelected ? microphonesSelected.value : undefined,
            videoSource: camerasSelected ? camerasSelected.value : undefined,
            session: undefined,
            localUser: undefined,
            subscribers: [],
            chatDisplay: 'none',
            layoutClassName : 'bounds',
            isChatOpen : false,
            chatLgCol1: 12,
            chatLgCol2: 0,
            isConfigOpen : false,
            isNoticeOpen : false,


            user,
            room,
        };

        this.joinSession = this.joinSession.bind(this);
        this.leaveSession = this.leaveSession.bind(this);
        this.onbeforeunload = this.onbeforeunload.bind(this);
        this.updateLayout = this.updateLayout.bind(this);
        this.camStatusChanged = this.camStatusChanged.bind(this);
        this.micStatusChanged = this.micStatusChanged.bind(this);
        this.nicknameChanged = this.nicknameChanged.bind(this);
        this.toggleFullscreen = this.toggleFullscreen.bind(this);
        this.screenShare = this.screenShare.bind(this);
        this.stopScreenShare = this.stopScreenShare.bind(this);
        this.closeDialogExtension = this.closeDialogExtension.bind(this);
        this.toggleChat = this.toggleChat.bind(this);
        this.checkNotification = this.checkNotification.bind(this);
        this.checkSize = this.checkSize.bind(this);
    }

    componentDidMount = async () => {
        let beforeData = await this.api.setBeforeData();

        console.log(beforeData);

        this.setState({
            user : beforeData.user,
            room : beforeData.room,
            roomName : beforeData.room ? beforeData.room.name : undefined,
            mySessionId: beforeData.room ? beforeData.room.id : undefined,
            maxUserCnt: beforeData.room ? beforeData.room.maxUserCnt : undefined,
            myUserName: beforeData.user ? beforeData.user.name : undefined,
        })

        this.layout.initLayoutContainer(document.getElementById('layout'), this.openViduLayoutOptions);
        window.addEventListener('beforeunload', this.onbeforeunload);
        window.addEventListener('resize', this.updateLayout);
        window.addEventListener('resize', this.checkSize);

        //환경설정 세팅한 값 초기화
        this.setDeviceConfig();

        //세션 입장
        this.joinSession();
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.onbeforeunload);
        // window.removeEventListener('resize', this.updateLayout);
        window.removeEventListener('resize', this.checkSize);
        this.leaveSession();
    }

    onbeforeunload(event) {
        this.leaveSession();
    }

    setDeviceConfig() {
      let videoActive = true
      let audioActive = true

      localUser.setVideoActive(videoActive);
      localUser.setAudioActive(audioActive);
    }

    joinSession() {
        this.OV = new OpenVidu();

        this.setState(
            {
                session: this.OV.initSession(),
            },
            () => {
                //session event 설정
                this.subscribeToStreamCreated(); //스트림 생성

                //설정 변경 채널 통신
                this.state.session.on('signal:subscribersConfigChange', (event) => {
                    let param = JSON.parse(event.data);

                    if (param.type == 'mic') {
                        this.micStatusChanged();
                    } else if (param.type == 'cam') {
                        this.camStatusChanged();
                    }
                });

                //방이 삭제되었을 경우 전체 방 나가짐으로 변경
                this.state.session.on('signal:ROOM_DELETED', (event) => {

                    console.log("테스트 방나가기 이벤트들어옵니다.");
                    console.log(event);
                    
                    window.alert("방이 삭제되었습니다. 자동으로 방에서 나가게 됩니다.");

                    //통신 받은 사용자 추방
                    this.leaveSession();

                });

                //관리자가 회원 추방
                this.state.session.on('signal:subscribersBan', (event) => {
                    //통신 받은 사용자 추방
                    this.leaveSession();
                });

                //관리자 알람 시 회원이 확인 후 종료가능
                this.state.session.on('signal:adminUserNoti', (event) => {
                    let param = JSON.parse(event.data);

                    //관리자 알람 시 회원이 확인 후 종료가능
                    if (param.type == "exit") {
                        this.openNoticeModal();
                    //관리자 알람 시 메세지 전달
                    } else if (param.type == "notice") {
                        this.openNoticeModal();
                    //관리자 알람 시 시간 정지
                    } else if (param.type == "stopWatch") {

                    }
                });

                 //세션 연결
                this.connectToSession();
            },
        );
    }

    connectToSession() {
        console.log("connectToSession 세선 커넥션");
        console.log(this.state.mySessionId);

        let param = {
            session : this.state.mySessionId,
            role : "PUBLISHER",
            data : JSON.stringify({
                user : this.state.user ? this.state.user : null,
                room : this.state.room ? this.state.room : null,
            }),
            maxUserCnt : this.state.maxUserCnt,
            kurentoOptions : {
                allowedFilters : ["GStreamerFilter", "ZBarFilter"]
            }
        }

        // let param = {
        //     "session" : this.state.mySessionId,
        //     "role" : "PUBLISHER",
        //     "data" : "{\"userId\":\"KDH\",\"userMale\":\"Man\"}",
        //     "maxUserCnt" : this.state.maxUserCnt,
        //     "kurentoOptions" : {"allowedFilters": ["GStreamerFilter", "ZBarFilter"]}
        // }

        this.api.getSession(param).then((res) => {
            this.connect(res.result.token);
        })
    }

    connect(token) {

        this.state.session
            .connect(
                token,
                { clientData: this.state.myUserName },
            )
            .then(() => {
                this.connectWebCam();
            })
            .catch((error) => {
                // alert('There was an error connecting to the session:', error.message);
                console.log('There was an error connecting to the session:', error.message);
            });
    }

    connectWebCam() {
        let publisher = this.OV.initPublisher(undefined, {
            audioSource: this.state.audioSource,
            videoSource: this.state.videoSource,
            publishAudio: localUser.isAudioActive(),
            publishVideo: localUser.isVideoActive(),
            resolution: '1280x720', //해상도
            frameRate: 10,          //프레임 서버 수
            insertMode: 'APPEND',
        });

        console.log(localUser.isAudioActive());
        console.log(localUser.isVideoActive());
        console.log(publisher);
        
        if (this.state.session.capabilities.publish) {
            this.state.session.publish(publisher).then(() => {
                if (this.props.joinSession) {
                    this.props.joinSession();
                }
            });
        }
        localUser.setNickname(this.state.myUserName);
        localUser.setConnectionId(this.state.session.connection.connectionId);
        localUser.setScreenShareActive(false);
        localUser.setStreamManager(publisher);
        localUser.setPermissions(this.state.user ? this.state.user.permissions : null);

        console.log("로컬 유저 셋팅");
        console.log(localUser);

        this.subscribeToUserChanged();
        this.subscribeToStreamDestroyed();
        this.sendSignalUserChanged({ isScreenShareActive: localUser.isScreenShareActive() });

        this.setState({ localUser: localUser }, () => {
            this.state.localUser.getStreamManager().on('streamPlaying', (e) => {
                this.updateLayout();
                publisher.videos[0].video.className="";
                publisher.videos[0].video.parentElement.classList.remove('custom-class');
            });
        });
    }

    leaveSession() {
        const mySession = this.state.session;

        if (mySession) {
            mySession.disconnect();
        }

        // Empty all properties...
        this.OV = null;
        this.setState({
            session: undefined,
            subscribers: [],
            mySessionId: this.state.mySessionId,
            myUserName: this.state.myUserName,
            localUser: undefined,
        });

        if (this.props.leaveSession) {
            this.props.leaveSession();
        }
    }
    
    camStatusChanged() {
        localUser.setVideoActive(!localUser.isVideoActive());
        localUser.getStreamManager().publishVideo(localUser.isVideoActive());
        this.sendSignalUserChanged({ isVideoActive: localUser.isVideoActive() });
        this.setState({ localUser: localUser });
    }

    micStatusChanged() {
        localUser.setAudioActive(!localUser.isAudioActive());
        localUser.getStreamManager().publishAudio(localUser.isAudioActive());
        this.sendSignalUserChanged({ isAudioActive: localUser.isAudioActive() });
        this.setState({ localUser: localUser });
    }

    nicknameChanged(nickname) {
        let localUser = this.state.localUser;
        localUser.setNickname(nickname);
        this.setState({ localUser: localUser });
        this.sendSignalUserChanged({ nickname: this.state.localUser.getNickname() });
    }

    deleteSubscriber(stream) {
        const remoteUsers = this.state.subscribers;
        const userStream = remoteUsers.filter((user) => user.getStreamManager().stream === stream)[0];
        let index = remoteUsers.indexOf(userStream, 0);
        if (index > -1) {
            remoteUsers.splice(index, 1);
            this.setState({
                subscribers: remoteUsers,
            });
        }
    }

    //스트림 생성 이벤트 발생 시
    subscribeToStreamCreated() {
        this.state.session.on('streamCreated', (event) => {

            console.log("스트림 크리에이트 확인");
            console.log(event);

            let clientDataArray = event.stream.connection.data.split('%/%');
            let clientData = this.util.getOVClientData(clientDataArray);
          
            console.log(clientData);

            
            const subscriber = this.state.session.subscribe(event.stream, undefined);
            var subscribers = this.state.subscribers;
            subscriber.on('streamPlaying', (e) => {
                this.checkSomeoneShareScreen();
                subscriber.videos[0].video.parentElement.classList.remove('custom-class');
            });
            const newUser = new UserModel();
            newUser.setStreamManager(subscriber);
            newUser.setConnectionId(event.stream.connection.connectionId);
            newUser.setType('remote');
            newUser.setPermissions(clientData ? clientData.user.permissions : null);
            const nickname = event.stream.connection.data.split('%')[0];
            newUser.setNickname(JSON.parse(nickname).clientData);
            subscribers.push(newUser);

            this.setState(
                {
                    subscribers: subscribers,
                },
                () => {
                    console.log()
                    if (this.state.localUser) {
                        this.sendSignalUserChanged({
                            isAudioActive: this.state.localUser.isAudioActive(),
                            isVideoActive: this.state.localUser.isVideoActive(),
                            nickname: this.state.localUser.getNickname(),
                            isScreenShareActive: this.state.localUser.isScreenShareActive(),
                        });
                    }
                    this.updateLayout();
                },
            );
        });
    }

    subscribeToStreamDestroyed() {
        // On every Stream destroyed...
        this.state.session.on('streamDestroyed', (event) => {
            // Remove the stream from 'subscribers' array
            this.deleteSubscriber(event.stream);
            setTimeout(() => {
                this.checkSomeoneShareScreen();
            }, 20);
            event.preventDefault();
            this.updateLayout();
        });
    }

    subscribeToUserChanged() {
        this.state.session.on('signal:userChanged', (event) => {
            let remoteUsers = this.state.subscribers;
            remoteUsers.forEach((user) => {
                if (user.getConnectionId() === event.from.connectionId) {
                    const data = JSON.parse(event.data);
                    
                    console.log("==============================>")
                    console.log('EVENTO REMOTE: ', event.data);
                    console.log(user);

                    if (data.isAudioActive !== undefined) {
                        user.setAudioActive(data.isAudioActive);
                    }
                    if (data.isVideoActive !== undefined) {
                        user.setVideoActive(data.isVideoActive);
                    }
                    if (data.nickname !== undefined) {
                        user.setNickname(data.nickname);
                    }
                    if (data.isScreenShareActive !== undefined) {
                        user.setScreenShareActive(data.isScreenShareActive);
                    }
                }
            });
            this.setState(
                {
                    subscribers: remoteUsers,
                },
                () => this.checkSomeoneShareScreen(),
            );
        });
    }

    updateLayout() {
        setTimeout(() => {
            this.layout.updateLayout();
        }, 20);
    }

    sendSignalUserChanged(data) {
        const signalOptions = {
            data: JSON.stringify(data),
            type: 'userChanged',
        };
        this.state.session.signal(signalOptions);
    }

    toggleFullscreen() {
        const document = window.document;
        const fs = document.getElementById('container');
        if (
            !document.fullscreenElement &&
            !document.mozFullScreenElement &&
            !document.webkitFullscreenElement &&
            !document.msFullscreenElement
        ) {
            if (fs.requestFullscreen) {
                fs.requestFullscreen();
            } else if (fs.msRequestFullscreen) {
                fs.msRequestFullscreen();
            } else if (fs.mozRequestFullScreen) {
                fs.mozRequestFullScreen();
            } else if (fs.webkitRequestFullscreen) {
                fs.webkitRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    }

    screenShare() {
        const user = this.state.user;

        //권한 체크
        if (user) {
            if (user.permissions) {

                //권한이 없을경우
                if (user.permissions.screenShare == false) {
                    window.alert("스크린 공유 권한이 없습니다.");
                
                //권한이 있을경우
                } else {
                    const videoSource = navigator.userAgent.indexOf('Firefox') !== -1 ? 'window' : 'screen';

                    console.log(videoSource);
                    console.log(localUser.isAudioActive());
                    console.log(localUser.isVideoActive());
                    const publisher = this.OV.initPublisher(
                        undefined,
                        {
                            videoSource: videoSource,
                            audioSource: this.state.audioSource,
                            publishAudio: localUser.isAudioActive(),
                            publishVideo: localUser.isVideoActive(),
                            resolution: '1280x720', //해상도
                            mirror: false,
                        },
                        (error) => {
                            if (error && error.name === 'SCREEN_EXTENSION_NOT_INSTALLED') {
                                this.setState({ showExtensionDialog: true });
                            } else if (error && error.name === 'SCREEN_SHARING_NOT_SUPPORTED') {
                                alert('Your browser does not support screen sharing');
                            } else if (error && error.name === 'SCREEN_EXTENSION_DISABLED') {
                                alert('You need to enable screen sharing extension');
                            } else if (error && error.name === 'SCREEN_CAPTURE_DENIED') {
                                alert('You need to choose a window or application to share');
                            }
                        },
                    );

                    publisher.once('accessAllowed', () => {
                        this.state.session.unpublish(localUser.getStreamManager());
                        localUser.setStreamManager(publisher);
                        this.state.session.publish(localUser.getStreamManager()).then(() => {
                            localUser.setScreenShareActive(true);
                            this.setState({ localUser: localUser }, () => {
                                this.sendSignalUserChanged({ isScreenShareActive: localUser.isScreenShareActive() });
                                let videoId = 'video-'+localUser.getStreamManager().stream.streamId;
                                document.getElementById(videoId).className = "screen-fit";

                                console.log(videoId);
                                console.log(document.getElementById(videoId))
                            });
                        });
                    });

                    publisher.on('streamPlaying', () => {
                        this.updateLayout();
                        publisher.videos[0].video.parentElement.classList.remove('custom-class');
                    });
                }
            }
        }
    }

    closeDialogExtension() {
        this.setState({ showExtensionDialog: false });
    }

    stopScreenShare() {
        this.state.session.unpublish(localUser.getStreamManager());
        this.connectWebCam();
    }

    checkSomeoneShareScreen() {
        let isScreenShared;
        // return true if at least one passes the test
        isScreenShared = this.state.subscribers.some((user) => user.isScreenShareActive()) || localUser.isScreenShareActive();
        this.layout.setLayoutOptions(this.openViduLayoutOptions);
        this.updateLayout();
    }

    toggleChat(property) {
        let display = property;
        let messageReceived = null;
        let isChatOpen = false;
        let layoutClassName =  "bounds";

        if (display === undefined) {
            display = this.state.chatDisplay === 'none' ? 'block' : 'none';
        }

        if (display === 'block') {
            messageReceived = false;
            isChatOpen = true;
            layoutClassName = "bounds chat";
        } 

        this.setState({ 
            chatDisplay: display, 
            messageReceived: messageReceived,
            isChatOpen : isChatOpen,
            layoutClassName : layoutClassName
        }, ()=> {
            this.updateLayout();
        });

        // this.openChat();
    }

    checkNotification(event) {
        this.setState({
            messageReceived: this.state.chatDisplay === 'none',
        });
    }

    checkSize() {
        if (document.getElementById('layout').offsetWidth <= 700 && !this.hasBeenUpdated) {
            this.toggleChat('none');
            this.hasBeenUpdated = true;
        }
        if (document.getElementById('layout').offsetWidth > 700 && this.hasBeenUpdated) {
            this.hasBeenUpdated = false;
        }
    }

    openConfigModal = () => {
        this.setState({
            isConfigOpen : true,
        })
    }

    closeConfigModal = () => {
        this.setState({
            isConfigOpen : false,
        })
    }

    openNoticeModal = () => {
        this.setState({
            isNoticeOpen : true,
        })
    }

    closeNoticeModal = () => {
        this.setState({
            isNoticeOpen : false,
        })
    }

    /**
     * 방장 권한 디바이스 제어
     * @param {*} subscriber 
     * @param {*} type 
     * @param {*} active 
     */
    subscribersConfigChange = (subscriber , type , active) => {

        let param = { 
                type : type, 
                active : active
            }

        const signalOptions = {
            data: JSON.stringify(param),
            type: 'subscribersConfigChange',
            to : [subscriber.streamManager.stream.connection ]
        }; 

        this.state.session.signal(signalOptions);
    }

    /**
     * 방장 권한 추방하기
     * @param {*} subscriber 
     */
    subscribersBan = (subscriber) => {

        if(window.confirm(subscriber.nickname+ "님을 추방하시겠습니까?") == true){
            let param = { 
                active : false
            }
            const signalOptions = {
                data: JSON.stringify(param),
                type: 'subscribersBan',
                to : [subscriber.streamManager.stream.connection ]
            }; 

            this.state.session.signal(signalOptions);

            //알람후 채팅메세지 전달
            this.sendMessage(this.state.localUser.nickname + "방장님이 "+ subscriber.nickname+"님을 추방하였습니다.");

            //팝업을 닫아줍니다.
            this.closeConfigModal();
        }
    }

    /**
     * 다른 사용자에게 메세지 보내기
     * @param {*} subscriber 
     */
    adminUserNoti = (subscriber , type) => {

        let param = { 
                type : type
            }

        const signalOptions = {
            data: JSON.stringify(param),
            type: 'adminUserNoti',
            to : [subscriber.streamManager.stream.connection]
        }; 

        this.state.session.signal(signalOptions);

        //알람후 채팅메세지 전달
        this.sendMessage(this.state.localUser.nickname + "방장님이 "+ subscriber.nickname+"님에게 알람을 보냈습니다.");
    }

    /**
     * 채팅 메세지 보내기
     * @param {*} message
     */
    sendMessage = (message) =>{
        const data = { 
            message: message, 
            nickname: this.state.localUser.getNickname(), 
            streamId: this.state.localUser.getStreamManager().stream.streamId 
        };
        this.state.localUser.getStreamManager().stream.session.signal({
            data: JSON.stringify(data),
            type: 'chat',
        });
    }

    openChat = () => {
        let element = document.getElementById('sidebar')
        let className = ReactDOM.findDOMNode(element).className;
        if (className == "active") {
            ReactDOM.findDOMNode(element).className = "none"
        } else {
            ReactDOM.findDOMNode(element).className = "active"
        }
    }
    
    render() {
        const mySessionId = this.state.mySessionId;
        const localUser = this.state.localUser;
        var chatDisplay = { display: this.state.chatDisplay };
        console.log("chatdisplay==========>>>>>")
        console.log(chatDisplay);

        return (
            <div className="container" id="container" >
                <ToolbarComponent
                    sessionId={mySessionId}
                    roomName={this.state.roomName}
                    user={localUser}
                    showNotification={this.state.messageReceived}
                    camStatusChanged={this.camStatusChanged}
                    micStatusChanged={this.micStatusChanged}
                    screenShare={this.screenShare}
                    stopScreenShare={this.stopScreenShare}
                    toggleFullscreen={this.toggleFullscreen}
                    leaveSession={this.leaveSession}
                    toggleChat={this.toggleChat}
                    openConfigModal={this.openConfigModal}
                    openChat={this.openChat}
                />

                {/* 스크린 공유 다이얼로그 */}
                <DialogExtensionComponent 
                    showDialog={this.state.showExtensionDialog} 
                    cancelClicked={this.closeDialogExtension} />
                {/* 설정 다이얼로그 */}
                <DialogConfigComponent 
                    user={localUser}
                    subscribers={this.state.subscribers}
                    isOpen={this.state.isConfigOpen} 
                    subscribersConfigChange={this.subscribersConfigChange}
                    subscribersBan={this.subscribersBan}
                    onRequestClose={this.closeConfigModal} />
                {/* 알람 다이얼로그 */}
                <DialogNoticeComponent 
                    isOpen={this.state.isNoticeOpen} 
                    onRequestClose={this.closeNoticeModal} />

                <div id="layout" className={this.state.layoutClassName}>
                    {localUser !== undefined && localUser.getStreamManager() !== undefined && (
                        <VideoRoomLayoutComponent 
                            localUser={localUser}
                            subscribers={this.state.subscribers}
                            roomName={this.state.roomName}
                            maxUserCnt={this.state.maxUserCnt}
                            chatDisplay={chatDisplay}
                            toggleChat={this.toggleChat}
                            checkNotification={this.checkNotification}
                            adminUserNoti={this.adminUserNoti}                        
                        />          
                    )}
                </div>


                <Drawer
                    className="sidebar-drawer"
                    variant="persistent"
                    anchor="right"
                    open={this.state.isChatOpen}
                    PaperProps={{ component : StyledPaper }}
                >
                    {localUser !== undefined && localUser.getStreamManager() !== undefined && (
                        <div style={chatDisplay}>
                        <ChatComponent
                            user={localUser}
                            roomName={this.state.roomName}
                            chatDisplay={chatDisplay}
                            close={this.toggleChat}
                            messageReceived={this.checkNotification}
                        />
                        </div>
                    )}
                </Drawer>
         

                {/* <nav id="sidebar" style={chatDisplay}>
                    {localUser !== undefined && localUser.getStreamManager() !== undefined && (
                        <ChatComponent
                            user={localUser}
                            roomName={this.state.roomName}
                            chatDisplay={chatDisplay}
                            close={this.toggleChat}
                            messageReceived={this.checkNotification}
                        />
                    )}
                </nav> */}

            </div>
        );
    }
}

export default VideoRoomComponent
