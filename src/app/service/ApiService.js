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
        console.log("호출합니다.");
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
                        return resolve(this.getError(error))
                    })
                });
                
            }).catch(error => {
                return resolve(this.getError(error))
            });
        })
    }

    /**
     * 센터 관리자 만들기
     * @param {*} param 
     */
    async createCenter(param){
        console.log("호출합니다.");
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
                createdAt : moment(new Date()).format('YYYY-MM-DD hh:mm'),
            }).then(()=>{

                //로그인처리를 위한 토큰 생성
                firebase.firestore().collection('token').doc(newId)
                .set({
                    id : newId,
                    accessToken : this.autoId(),
                    createdAt : moment(new Date()).format('YYYY-MM-DD hh:mm'),
                }).then(()=>{
                    return resolve(this.getSuccess())
                }).catch(error => {
                    return resolve(this.getError(error))
                })

                //예약 운영정책 기본 데이터 생성
                const configNewId = this.autoId();
                firebase.firestore().collection('config').doc(configNewId)
                .set({
                    id : configNewId,
                    centerId : newId,
                    reservPublicTime : 1,
                    reservPublicUnit : 'hour',
                    reservModifyTime : 1,
                    reservModifyUnit : 'hour',
                    reservCancleTime : 1,
                    reservCancleUnit : 'day',
                    attendancePublicTime : 30,
                    attendancePublicUnit : 'minute',
                    tardyAfterTime : 30,
                    tardyAfterUnit : 'minute',
                    maturityTime : 3,
                    maturityUnit : 'day',
                    createder : param.userName,
                    createdId : newId,
                    createdAt : moment(new Date()).format('YYYY-MM-DD hh:mm'),
                }).then(()=>{
                    return resolve(this.getSuccess())
                }).catch(error => {
                    return resolve(this.getError(error))
                })

            }).catch(error => {
                return resolve(this.getError(error))
            })
        })
    }
  
    /**
     * 로그인 여부 체크
     */
    async checkToken(accessToken){
        console.log("호출합니다.");
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
        console.log("호출합니다.");
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
        console.log("호출합니다.");
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
        console.log("호출합니다.");
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
        console.log("호출합니다.");
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
        console.log("호출합니다.");
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
        console.log("호출합니다.");
        return new Promise((resolve, reject) => {
            const newId = this.autoId();
            firebase.firestore().collection('instructor').doc(newId).set({
                ...param,
                id : newId,
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
        console.log("호출합니다.");
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('instructor').doc(param.id).update({
                ...param
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
        console.log("호출합니다.");
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
        console.log("호출합니다.");
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
         console.log("호출합니다.");
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
     *                                     [ Setting - Config ]
     * ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     */ 

    /**
     *  운영 관리 수정
     */
    async settingConfigEdit(param){
        console.log("호출합니다.");
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('config').doc(param.id).update({
                ...param
            }).then(()=>{
                return resolve(this.getSuccess());
            }).catch((error)=>{
                return reject(this.getError(error));
            })
        });
    }

     
    /**
     *  운영 관리 조회
     */
    async settingConfigSelect(param){
        console.log("호출합니다.");
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('config').where('centerId', '==', param.centerId).get().then((querySnapshot)=>{
                let config = querySnapshot.docs.map(doc => doc.data());
                return resolve(this.getSuccess(config));
            }).catch((error)=>{
                return reject(this.getError(error));
            })
        });
    }

    /**
     * ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     *                                     [ Setting - Category ]
     * ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    */
   
    /**
     *  카테고리 추가
     */
    async settingCategoryAdd(param){
        console.log("호출합니다.");
        return new Promise((resolve, reject) => {
            const newId = this.autoId();
            firebase.firestore().collection('category').doc(newId).set({
                ...param,
                id: newId
            }).then(()=>{
                return resolve(this.getSuccess());
            }).catch((error)=>{
                return reject(this.getError(error));
            })
        });
    }

    /**
     *  카테고리 수정
     */
    async settingCategoryEdit(param){
        console.log("호출합니다.");
        return new Promise((resolve, reject) => {
            const newId = this.autoId();
            firebase.firestore().collection('category').doc(param.id).update({
                ...param
            }).then(()=>{

                //회원권 카테고리 일괄수정
                if (param.type == "membership") {
                    console.log(param);
                    firebase.firestore().collection('membership').where('category.id', '==', param.id).get().then((querySnapshot)=>{
                        let membershipList = querySnapshot.docs.map(doc => doc.data());

                        console.log(membershipList);

                        membershipList.map((membership)=>{
                            let subParam = {
                                id : membership.id,
                                category : {
                                    id : param.id,
                                    name : param.name
                                }
                            }
                            this.settingMembershipEdit(subParam);
                        })

                        return resolve(this.getSuccess());
                    }).catch((error)=>{
                        return reject(this.getError(error));
                    })
                
                //수업 카테고리 일괄 수정
                } else if (param.type == "lesson") {
                    firebase.firestore().collection('lesson').where('category.id', '==', param.id).get().then((querySnapshot)=>{
                        let lessonList = querySnapshot.docs.map(doc => doc.data());

                        lessonList.map((lesson)=>{
                            let subParam = {
                                id : lesson.id,
                                category : {
                                    id : param.id,
                                    name : param.name
                                }
                            }
                            this.settingLessonEdit(subParam);
                        })

                        return resolve(this.getSuccess());

                    }).catch((error)=>{
                        return reject(this.getError(error));
                    })
                }

                return resolve(this.getSuccess());
            }).catch((error)=>{
                return reject(this.getError(error));
            })
        });
    }

    /**
     * 카테고리 삭제
     * @param {*} param 
     */
    async settingCategoryDelete(param){
        console.log("호출합니다.");
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('category').doc(param.id).delete()
            .then(()=>{
                return resolve(this.getSuccess());
            }).catch((error)=>{
                return reject(this.getError(error));
            })
        });
    }

    /**
     *  카테고리 목록 (회원권)
     */
    async settingMembershipCategoryList(param){
        console.log("호출합니다.");
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('category').where('centerId', '==', param.centerId).where('type', '==','membership').get().then((querySnapshot)=>{
                let categoryList = querySnapshot.docs.map(doc => doc.data());
                return resolve(this.getSuccess(categoryList));
            }).catch((error)=>{
                return reject(this.getError(error));
            })
        });
    }

    /**
     *  카테고리 목록 (수업)
     */
    async settingLessonCategoryList(param){
        console.log("호출합니다.");
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('category').where('centerId', '==', param.centerId).where('type', '==','lesson').get().then((querySnapshot)=>{
                let categoryList = querySnapshot.docs.map(doc => doc.data());
                return resolve(this.getSuccess(categoryList));
            }).catch((error)=>{
                return reject(this.getError(error));
            })
        });
    }

    /**
     * ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     *                                     [ Setting - Membership ]
     * ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    */

    /**
     *  회원권 추가
     */
    async settingMembershipAdd(param){
        console.log("호출합니다.");
        return new Promise((resolve, reject) => {
            const newId = this.autoId();
            firebase.firestore().collection('membership').doc(newId).set({
                ...param,
                id : newId,
            }).then(()=>{
                return resolve(this.getSuccess());
            }).catch((error)=>{
                return reject(this.getError(error));
            })
        });
    }

    /**
     *  회원권 수정
     */
    async settingMembershipEdit(param){
        console.log("호출합니다.");
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('membership').doc(param.id).update({
                ...param
            }).then(()=>{
                return resolve(this.getSuccess());
            }).catch((error)=>{
                return reject(this.getError(error));
            })
        });
    }

    /**
     * 회원권 삭제
     * @param {*} param 
     */
    async settingMembershipDelete(param){
        console.log("호출합니다.");
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('membership').doc(param.id).delete()
            .then(()=>{
                return resolve(this.getSuccess());
            }).catch((error)=>{
                return reject(this.getError(error));
            })
        });
    }

    /**
     *  회원권 목록
     */
    async settingMembershipList(param){
        console.log("호출합니다.");
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('membership').where('centerId', '==', param.centerId).where('category.id', '==', param.category.id).get().then((querySnapshot)=>{
                let membershipList = querySnapshot.docs.map(doc => doc.data());
                return resolve(this.getSuccess(membershipList));
            }).catch((error)=>{
                return reject(this.getError(error));
            })
        });
    }


    /**
     * ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     *                                     [ Setting - Lesson ]
     * ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    */

    /**
     *  수업 추가
     */
    async settingLessonAdd(param){
        console.log("호출합니다.");
        return new Promise((resolve, reject) => {
            const newId = this.autoId();
            firebase.firestore().collection('lesson').doc(newId).set({
                ...param,
                id : newId,
            }).then(()=>{
                return resolve(this.getSuccess());
            }).catch((error)=>{
                return reject(this.getError(error));
            })
        });
    }

    /**
     *  수업 수정
     */
    async settingLessonEdit(param){
        console.log("호출합니다.");
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('lesson').doc(param.id).update({
                ...param
            }).then(()=>{
                return resolve(this.getSuccess());
            }).catch((error)=>{
                return reject(this.getError(error));
            })
        });
    }

    /**
     * 수업 삭제
     * @param {*} param 
     */
    async settingLessonDelete(param){
        console.log("호출합니다.");
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('lesson').doc(param.id).delete()
            .then(()=>{
                return resolve(this.getSuccess());
            }).catch((error)=>{
                return reject(this.getError(error));
            })
        });
    }

    /**
     *  수업 목록
     */
    async settingLessonList(param){
        console.log("호출합니다.");
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('lesson').where('centerId', '==', param.centerId).where('category.id', '==', param.category.id).get().then((querySnapshot)=>{
                let lessonList = querySnapshot.docs.map(doc => doc.data());
                return resolve(this.getSuccess(lessonList));
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


