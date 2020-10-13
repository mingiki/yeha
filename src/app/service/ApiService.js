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
            firebaseAuth
                .signInWithEmailAndPassword(param.email, param.password)
                .then(result => {
                    console.log(result);
                    firebaseAuth.onAuthStateChanged(user => {
                        if (user) {
                            //파이어베이스 계정 == 센터 대표
                            //센터 대표 = centerId => center.uid
                            //센터 직원 = centerId => member.centerId
                            firebase.firestore().collection('center').doc(user.uid).get().then((snapshot)=>{
                                let userData = snapshot.data();
                                let loginUser = {
                                    uid : userData.uid,
                                    auth : 'center',
                                    displayName : userData.displayName,
                                    email : userData.email,
                                    name : userData.name,
                                    centerId : userData.uid,
                                    centerName : userData.centerName,
                                    centerCode : userData.centerCode,
                                    createdAt : new Date(),
                                }
                            });
                        }
                    })
                })
                .catch(error => {
                    console.log(error)
                })
        })
    }

    /**
     * 센터 관리자 만들기
     * @param {*} param 
     */
    async createCenter(param){
        return new Promise((resolve, reject) => {
            const newUid = this.autoId();

            firebase.firestore().collection('center').doc(newUid)
            .set({
                uid : newUid,
                userName : param.userName,
                centerName : param.centerName,
                email : param.email,
                tel : param.tel,
                centerCode : '',
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


