import React, { Component } from 'react';
import { AccountCircle, Mic, MicOff, Videocam, VideocamOff, VolumeUp, VolumeOff, Close} from '@material-ui/icons';
import { Input , Row , Col, Card, Button, CardHeader, CardFooter, CardBody, CardTitle, CardText} from 'reactstrap';
import Select from 'react-select';

import OvDevicesService from '../../../app/service/OvDevicesService';
import UserModel from '../../../app/models/user-model';
import { OpenVidu } from 'openvidu-browser';
import UtilService from '../../../app/service/UtilService';

// import 'bootstrap/dist/css/bootstrap.css';
import '../../../app/components/config/ConfigComponent.css';
import '../../../app/components/main/MainComponent.css';
import '../../../app/components/room/VideoRoomComponent.css';

import '../templateStyle.scss';
import '../../../index.scss';

var localUser = new UserModel();

class ConfigTemplateComponent extends Component {
    constructor(props) {
        super(props);
        this.OvDevicesService = new OvDevicesService();
        this.util = new UtilService();
        this.state = {
            selectedOption: null,
            microphones: [],
            cameras : [],
            microphonesOptions: [],
            camerasOptions : [],
            microphonesSelected : null,
            camerasSelected : null,

            isVideoActive : true,
            isAudioActive : true,

            user : null,
            room : null,
            valid : false,

            isRedirect : false,
            session : null,
            localUser: null
        };
        this.videoRef = React.createRef();
    }

    componentDidMount = async () => {
        this.OV = new OpenVidu();
        let session = this.OV.initSession();

        //기본 디바이스 셋팅
        await this.OvDevicesService.initDevices();
        this.setDevicesInfo();
        
        //로컬 캠 연결
        this.connectWebCam();

        //브라우저 기기 권한 이벤트 일어날때 다시한번 확인
        localUser.getStreamManager().on('accessAllowed', async (event) => {
            await this.OvDevicesService.initDevices();
            this.setDevicesInfo();
        });

        this.setState({
            session : session
        });
    }

    //접속 디바이스 환경상태 확인
    setDevicesInfo() {
        let cameras = this.OvDevicesService.getCameras();
        let microphones = this.OvDevicesService.getMicrophones();

         //선택된 디바이스가 있을경우 세팅 없으면 첫번째 디바이스 세팅
        const storageVideo = localStorage.getItem("openviduCallVideoDevice");
        const stroageAudio = localStorage.getItem("openviduCallAudioDevice");
        const isVideo = false;
        const isAudio = false;

        //data convert
        let camerasOptions = cameras.map((camera)=>{
            if (storageVideo) {
                if (storageVideo.label == camera.label) {
                    isVideo = true;
                }
            }
            return {label : camera.label , value : camera.device };
        }) 
        
        let microphonesOptions = microphones.map((microphone)=>{
            if (stroageAudio) {
                if (stroageAudio.label == microphone.label) {
                    isAudio = true;
                }
            }
            return {label : microphone.label , value : microphone.device };
        }) 
        
        this.setState({
            cameras : cameras,
            microphones : microphones,
            camerasOptions : camerasOptions,
            microphonesOptions : microphonesOptions,
            camerasSelected : isVideo == false ? camerasOptions[1] : 
                                    (storageVideo ? JSON.parse(storageVideo) : camerasOptions[1]),
            microphonesSelected : isAudio == false ? microphonesOptions[1] :
                                    (stroageAudio ? JSON.parse(stroageAudio) : microphonesOptions[1]),
        })
    }

    //로컬 웹캠 접속
    connectWebCam (){

        console.log("webcam 접속");
        console.log(this.state.microphonesSelected);
        console.log(this.state.camerasSelected);

        let publisher = this.OV.initPublisher(undefined, {
            audioSource: this.state.microphonesSelected ? this.state.microphonesSelected.value : undefined,
            videoSource: this.state.camerasSelected ? this.state.camerasSelected.value : undefined,
            publishAudio: true,
            publishVideo: true,
            resolution: '640x480',
            frameRate: 30,
            insertMode: 'APPEND',
            mirror: true
        });

        localUser.setScreenShareActive(false);
        localUser.setStreamManager(publisher);
        localUser.getStreamManager().addVideoElement(this.videoRef.current);

        this.setState({
            localUser : localUser
        })
    }

    //로컬 마이크 변경
    onChangeMicrophone = async (selectedOption) => {
        let isAudioActive = true;
        
        //선택한 마이크 값이 없을경우 => 마이크 비활성화로 판단
        if (selectedOption.value == null) {
            localUser.getStreamManager().publishAudio(false);
            isAudioActive = false;
        } else {

            //선택한 마이크 값이 다를 경우 => 마이크 설정값 변경후 재 퍼블리싱
            if (this.state.microphonesSelected != selectedOption.value) {
                const mirror = this.OvDevicesService.cameraNeedsMirror(this.state.camerasSelected.value);
                await this.replaceTrack(null, selectedOption.value, mirror);
            }

            localUser.getStreamManager().publishAudio(true);
            isAudioActive = true;
        }

        localStorage.setItem('openviduCallAudioDevice' , JSON.stringify(selectedOption));

        this.setState({
            isAudioActive : isAudioActive,
            microphonesSelected : selectedOption,
            localUser : localUser                  
        })
    }

    onChangeCamera = async (selectedOption) => {
        let isVideoActive = true;

        //선택한 캠 값이 없을경우 => 캠 비활성화로 판단
        if (selectedOption.value == null) {
            localUser.getStreamManager().publishVideo(false);
            isVideoActive = false;
        } else {

            //선택한 캠 값이 다를 경우 => 캠 설정값 변경후 재 퍼블리싱
            if (this.state.camerasSelected != selectedOption.value) {
                const mirror = this.OvDevicesService.cameraNeedsMirror(selectedOption.value);
                await this.replaceTrack(selectedOption.value, null, mirror);
            }

            localUser.getStreamManager().publishVideo(true);
            isVideoActive = true;
        }

        localStorage.setItem('openviduCallVideoDevice' , JSON.stringify(selectedOption));

        this.setState({
            isVideoActive : isVideoActive,
            camerasSelected : selectedOption,
            localUser : localUser                  
        })
    }

    //변경후 웹에 다시 세팅
    replaceTrack(videoSource, audioSource, mirror){
		return new Promise((resolve, reject) => {

			if (!!videoSource) {
				console.log('Replacing video track ' + videoSource);
				this.videoSource = videoSource;
			}
			if (!!audioSource) {
				console.log('Replacing audio track ' + audioSource);
				this.audioSource = audioSource;
            }
            
            this.destryoWebcamUser();
            
			const properties = this.createProperties(
				this.videoSource,
				this.audioSource,
				this.hasWebcamVideoActive(),
				this.hasWebcamAudioActive(),
				true
			);

            const publisher = this.initCamPublisher(this.videoRef.current, properties);
            
			publisher.once('streamPlaying', () => {
                localUser.setStreamManager(publisher);
				resolve();
			});

			publisher.once('accessDenied', () => {
				reject();
            });

            localUser.getStreamManager().addVideoElement(this.videoRef.current);

		});
    }
    

    //웹캠 설정 그려주기
    initCamPublisher(targetElement, properties) {
		const publisher = this.initPublisher(targetElement, properties);
		localUser.setStreamManager(publisher);
		return publisher;
    }
    
    //데이터 넣어주기
    initPublisher(targetElement, properties){
		return this.OV.initPublisher(targetElement, properties);
	}

    //로컬 스트림 이탈
    destryoWebcamUser() {
		if (localUser?.getStreamManager()) {
			localUser.getStreamManager().off('streamAudioVolumeChange');
			localUser.getStreamManager().stream.disposeWebRtcPeer();
			localUser.getStreamManager().stream.disposeMediaStream();
		}
	}

	hasWebcamVideoActive() {
		return localUser.isVideoActive();
	}

	hasWebcamAudioActive() {
		return localUser?.isAudioActive();
	}

	hasScreenAudioActive() {
		return localUser?.isAudioActive();
    }
    
    createProperties(videoSource, audioSource, publishVideo,publishAudio,mirror){
		return {
			videoSource,
			audioSource,
			publishVideo,
			publishAudio,
			mirror
		};
    }

    render() {       

        return (
            <>            
                 <div id="videoRoomNavBar">
                        <div id="roomConfig">
                            <div className="modal" style={{display: 'block'}} >
                                <div className="modal-dialog modal-xl">
                                    <div className="modal-content cardContainer">

                                        <div className="modal-header cardHeader">
                                            <div className="headerLogo">
                                                <img
                                                    id="header_img"
                                                    alt="OpenVidu Logo"
                                                    src={process.env.REACT_APP_HOST+"/images/eyesON_logo.png"}
                                                />
                                            </div>
                                            <h3 className="headerTitle">방명이 보입니다.</h3>
                                        </div>

                                        <div className="modal-body">

                                            <Row className="align-items-center">
                                                <Col lg={6} className="leftSection">
                                                    <div className="configVideoContainer">
                                                        <video
                                                            autoPlay={true}
                                                            id={'video-' + (localUser.getStreamManager() ? localUser.getStreamManager().stream.streamId : "")}
                                                            ref={this.videoRef}
                                                            muted={true}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col lg={6} className="rightSection">
                                                    <Row>
                                                        <Col lg={12}>
                                                            <div className="status-userName">
                                                                <Row>
                                                                    <Col lg={3} style={{alignSelf: "center"}}>
                                                                        <Button className="config-icon-button">
                                                                            <AccountCircle className="config-icon-button-icon" id="statususerName" />
                                                                        </Button>
                                                                    </Col>
                                                                    <Col lg={9}>
                                                                        <div className="config-input-label">
                                                                           닉네임
                                                                        </div>
                                                                        <span>{"유저명이 보입니다."}</span>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                            <div className="status-mic">
                                                                <Row>
                                                                    <Col lg={3} style={{alignSelf: "center"}}>
                                                                        <Button className="config-icon-button">
                                                                            {
                                                                                this.state.isAudioActive ? 
                                                                                <Mic className="config-icon-button-icon" id="statusMic" /> : 
                                                                                <MicOff className="config-icon-button-icon" id="statusMic" />
                                                                            }
                                                                        </Button>
                                                                    </Col>
                                                                    <Col lg={9}>
                                                                        <div className="config-input-label">
                                                                            마이크
                                                                        </div>
                                                                        <Select 
                                                                            value={this.state.microphonesSelected}
                                                                            onChange={this.onChangeMicrophone}
                                                                            options={
                                                                                this.state.microphonesOptions
                                                                            }
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                            <div className="status-cam">
                                                                <Row>
                                                                    <Col lg={3} style={{alignSelf: "center"}}>
                                                                        <Button className="config-icon-button">
                                                                            {
                                                                                this.state.isVideoActive ? 
                                                                                <Videocam className="config-icon-button-icon" id="statusCam" /> : 
                                                                                <VideocamOff className="config-icon-button-icon" id="statusCam" />
                                                                            }
                                                                        </Button>
                                                                    </Col>
                                                                    <Col lg={9}>
                                                                        <div className="config-input-label">
                                                                            비디오
                                                                        </div>
                                                                        <Select 
                                                                            value={this.state.camerasSelected}
                                                                            onChange={this.onChangeCamera}
                                                                            options={
                                                                                this.state.camerasOptions
                                                                            }
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </div>

                                        <div className="modal-footer" style={{justifyContent : "center"}}>
                                            <button id="joinButton" >
                                                방입장버튼
                                            </button>
                                        </div>

                                    </div>

                                    
                                </div>
                            </div>
                        </div>

                    </div>
             
              

            </>
        );
    }

}



export default ConfigTemplateComponent;