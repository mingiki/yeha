import axios from 'axios';
import {randomBytes} from 'crypto';
import * as firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"

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
                        uid : userData.uid,
                        auth : 'center',
                        email : userData.email,
                        userName : userData.userName,
                        tel : userData.tel,
                        centerId : userData.uid,
                        centerName : userData.centerName,
                        centerCode : userData.centerCode,
                        createdAt : userData.createdAt,
                    }

                    firebase.firestore().collection('token').doc(userData.uid)
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
            const newUid = this.autoId();
            firebase.firestore().collection('center').doc(newUid)
            .set({
                uid : newUid,
                userName : param.userName,
                centerName : param.centerName,
                email : param.email,
                password : param.password,
                tel : param.tel,
                centerCode : '',
                createdAt : new Date(),
            }).then(()=>{

                //로그인처리를 위한 토큰 생성
                firebase.firestore().collection('token').doc(newUid)
                .set({
                    uid : newUid,
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


