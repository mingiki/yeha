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

        console.log(param);

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

                    return resolve({
                        resultCode : '200',
                        resultMsg : "Success",
                        result : loginUser
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


