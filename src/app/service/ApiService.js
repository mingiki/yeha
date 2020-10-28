import axios from 'axios';
import {randomBytes} from 'crypto';
import * as firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"

import moment from 'moment';

import { config } from "../config/firebaseConfig"

// Init firebase if not already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

/**
 * API SERVICE
 * 
 * writer : 김민기
 * version : 1.0
 * date : 2020-10-13
 * 
 * - API 서비스 유틸
 */

var firebaseAuth = firebase.auth()

class ApiService {

    /**
     * ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     *                                     [ Auth - Center ]
     * ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     */ 

    /**
     * 센터 관리자 로그인
     * @param {*} param 
     */
    async login(param){

        return new Promise((resolve, reject) => {
            firebase.firestore().collection('center').where('email', '==', param.email).where('password', '==', param.password).get().then((snapshot)=>{
                if (snapshot.empty) {
                    return resolve({
                        resultCode : '999',
                        resultMsg : "No matching documents.",
                    })
                }
                
                snapshot.forEach(doc => {
                    let userData = doc.data();
                    let updateAccessToken = this.autoId();

                    let loginUser = {
                        id : userData.id,
                        auth : 'center',
                        email : userData.email,
                        userName : userData.userName,
                        tel : userData.tel,
                        centerId : userData.id,
                        centerName : userData.centerName,
                        centerCode : userData.centerCode,
                        createdAt : userData.createdAt,
                    }

                    firebase.firestore().collection('token').doc(userData.id)
                    .update({
                        accessToken : updateAccessToken,
                        updateAt : new Date(),
                    }).then(()=>{
                        // sessionStorage.setItem("accessToken" , updateAccessToken);
                        return resolve({
                            resultCode : '200',
                            resultMsg : "Success",
                            resultData : {
                                loginUser : loginUser,
                                accessToken : updateAccessToken
                            }
                        })
                    }).catch(error => {
                        return resolve({
                            resultCode : '999',
                            resultMsg : error
                        })
                    })
                });
                
            }).catch(error => {
                return resolve({
                    resultCode : '999',
                    resultMsg : error
                })
            });
        })
    }

    /**
     * 센터 관리자 만들기
     * @param {*} param 
     */
    async createCenter(param){
        return new Promise((resolve, reject) => {
            
            //센터 생성
            const newId = this.autoId();
            firebase.firestore().collection('center').doc(newId)
            .set({
                id : newId,
                userName : param.userName,
                centerName : param.centerName,
                email : param.email,
                password : param.password,
                tel : param.tel,
                centerCode : '',
                createdAt : new Date(),
            }).then(()=>{

                //로그인처리를 위한 토큰 생성
                firebase.firestore().collection('token').doc(newId)
                .set({
                    id : newId,
                    accessToken : this.autoId(),
                    createdAt : new Date(),
                }).then(()=>{
                    return resolve({
                        resultCode : '200',
                        resultMsg : "Success"
                    })
                }).catch(error => {
                    return resolve({
                        resultCode : '999',
                        resultMsg : error
                    })
                })
            }).catch(error => {
                return resolve({
                    resultCode : '999',
                    resultMsg : error
                })
            })
        })
    }
  
    /**
     * 로그인 여부 체크
     */
    async checkToken(accessToken){
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('token').where("accessToken" , "==", accessToken || null).get().then((snapshot)=>{

                if (snapshot.empty) {
                    return resolve({
                        resultCode : '999',
                        resultMsg : "No matching documents.",
                    })
                }

                snapshot.forEach(doc => {
                    let toeken = doc.data();
                    return resolve({
                        resultCode : '200',
                        resultMsg : "Success",
                        resultData : toeken,
                    })
                });
                
            }).catch(error => {
                return resolve({
                    resultCode : '999',
                    resultMsg : error
                })
            })
        })
    }


    /**
     * ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     *                                     [ Setting - Group ]
     * ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     */ 
    
    /**
     *  그룹 추가
     */
    async settingGroupAdd(param){
        return new Promise((resolve, reject) => {
            const newId = this.autoId();
            firebase.firestore().collection('group').doc(newId).set({
                id : newId,
                centerId : param.loginUser.centerId,
                name : param.name,
                menus : param.menus,
                createdAt : moment(new Date()).format('YYYY-MM-DD hh:mm'),
                createder : param.loginUser.userName
            }).then(()=>{
                return resolve(this.getSuccess());
            }).catch((error)=>{
                return reject(this.getError(error));
            })
        });
    }

    /**
     *  그룹 수정
     */
    async settingGroupEdit(param){
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('group').doc(param.id).update({
                name : param.name,
                menus : param.menus,
                updatedAt : moment(new Date()).format('YYYY-MM-DD hh:mm'),
                updatedId : param.loginUser.id,
                updateder : param.loginUser.userName
            }).then(()=>{
                return resolve(this.getSuccess());
            }).catch((error)=>{
                return reject(this.getError(error));
            })
        });
    }
    
    /**
     * 그룹 삭제
     * @param {*} param 
     */
    async settingGroupDelete(param){
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('group').doc(param.id).delete()
            .then(()=>{
                return resolve(this.getSuccess());
            }).catch((error)=>{
                return reject(this.getError(error));
            })
        });
    }

    /**
     *  그룹 목록
     */
    async settingGroupList(param){
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('group').where('centerId', '==', param.centerId).get().then((querySnapshot)=>{
                let groupList = querySnapshot.docs.map(doc => doc.data());
                return resolve(this.getSuccess(groupList));
            }).catch((error)=>{
                return reject(this.getError(error));
            })
        });
    }

    /**
     *  그룹 조회
     */
    async settingGroupSelect(param){
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('group').doc(param.id).get().then((querySnapshot)=>{
                let group = querySnapshot.docs.map(doc => doc.data());
                return resolve(this.getSuccess(group));
            }).catch((error)=>{
                return reject(this.getError(error));
            })
        });
    }

    /**
     * ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     *                                     [ Setting - Instructor ]
     * ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     */ 

    /**
     *  직원 추가
     */
    async settingInstructorAdd(param){
        return new Promise((resolve, reject) => {
            const newId = this.autoId();
            firebase.firestore().collection('instructor').doc(newId).set({
                id : newId,
                centerId : param.loginUser.centerId,
                name : param.name,
                menus : param.menus,
                createdAt : moment(new Date()).format('YYYY-MM-DD hh:mm'),
                createder : param.loginUser.userName
            }).then(()=>{
                return resolve(this.getSuccess());
            }).catch((error)=>{
                return reject(this.getError(error));
            })
        });
    }

    /**
     *  직원 수정
     */
    async settingInstructorEdit(param){
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('instructor').doc(param.id).update({
                name : param.name,
                menus : param.menus,
                updatedAt : moment(new Date()).format('YYYY-MM-DD hh:mm'),
                updatedId : param.loginUser.id,
                updateder : param.loginUser.userName
            }).then(()=>{
                return resolve(this.getSuccess());
            }).catch((error)=>{
                return reject(this.getError(error));
            })
        });
    }

    /**
     * 직원 삭제
     * @param {*} param 
     */
    async settingInstructorDelete(param){
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('instructor').doc(param.id).delete()
            .then(()=>{
                return resolve(this.getSuccess());
            }).catch((error)=>{
                return reject(this.getError(error));
            })
        });
    }

    /**
     *  직원 목록
     */
    async settingInstructorList(param){
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('instructor').where('centerId', '==', param.centerId).get().then((querySnapshot)=>{
                let instructorList = querySnapshot.docs.map(doc => doc.data());
                return resolve(this.getSuccess(instructorList));
            }).catch((error)=>{
                return reject(this.getError(error));
            })
        });
    }

    /**
     *  직원 조회
     */
    async settingInstructorSelect(param){
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('instructor').doc(param.id).get().then((querySnapshot)=>{
                let instructor = querySnapshot.docs.map(doc => doc.data());
                return resolve(this.getSuccess(instructor));
            }).catch((error)=>{
                return reject(this.getError(error));
            })
        });
    }


    /**
     * ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     *                                     [ COMMON ]
     * ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     */ 

    getSuccess(data) {
        return {
            resultCode : '200',
            resultMsg : "Success",
            resultData : data,
        }
    }

    getError(error) {
        return {
            resultCode : '999',
            resultMsg : error
        }
    }


    autoId(){
        const chars =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let autoId = '';
        while (autoId.length < 10) {
          const bytes = randomBytes(40);
          bytes.forEach(b => {
            const maxValue = 62 * 4 - 1;
            if (autoId.length < 10 && b <= maxValue) {
              autoId += chars.charAt(b % 62);
            }
          });
        }
        return autoId + Math.random().toString(36).substring(2) + Date.now().toString(36);
    }
 }

export default ApiService;


