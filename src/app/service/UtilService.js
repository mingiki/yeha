import React from 'react';
import axios from 'axios';

import {isMobile, browserName, browserVersion, osName} from "react-device-detect";

/**
 * UTIL SERVICE
 * 
 * writer : 대교 CNS 정보기술 연구소 김민기
 * version : 1.0
 * date : 2020-07-01
 * 
 * - 공통 서비스 유틸
 */
class UtilService {

    /**
     * PC 모바일 체크
     */ 
    getPlatform(){
        if(isMobile) return "Mobile";
        return "PC";
    }

    /**
     * 모바일 기종 체크
     */
    getMobileOS(){
        return osName;
    }

    /**
     * 브라우저 종류 체크
     */
    getBrowser(){
        return browserName ;
    }

   /**
     * 브라우저 종류 및 버전 체크
     */
    getBrowserVersion(){
        const browserFullInfo = browserName.concat(" ", browserVersion);
        return browserFullInfo;
    }
    /**
     * 국가정보 가져오기
     */
    getUserLocal() {
        var type=navigator.appName
        if (type=="Netscape")
        var lang = navigator.language
        else
        var lang = navigator.userLanguage
        var lang = lang.substr(0,2)
        return lang;
    }

    /**
     * 국가정보 우리거에 맞는 코드값으로 변경;
     * @param {*} lang 
     */
    getLocalCustom(lang){
        let result = "";
        if (lang == "th") {
            result="TH"
        } else if (lang == "ko") {
            result="KR"
        }

        return result;
    }


    /**
     * 평균값 구하기
     */
    average(array){ 
        return array.reduce((a,b) => { return a+b })/array.length 
    }

    /**
     * 숫자 정수 여부 체크 
     * @param {*} obj 
     */
    numCheck(obj){
        var num_check=/^[0-9]*$/;
           if(!num_check.test(obj)){
           return false;
        }
       return true;
    }

    isEmpty(val){
        if (val === "" || val === null || val === undefined
            || (val !== null && typeof val === "object" && !Object.keys(val).length)
        ){
            return true;
        } else {
            return false;
        }
    }

    byteCalculation(bytes) {
        var bytes = parseInt(bytes);
        var s = ['bytes', 'KB', 'MB'];
        var e = Math.floor(Math.log(bytes)/Math.log(1024));
 
        if(e == "-Infinity") return "0 "+s[0]; 
        else 
        return (bytes/Math.pow(1024, Math.floor(e))).toFixed(2)+" "+s[e];
    }

    /**
     * ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     *                                     [ 비지니스 Util]
     * ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     */ 


 }


export default UtilService;