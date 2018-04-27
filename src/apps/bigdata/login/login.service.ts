/**
 * NKL
 * 大数据登录服务
 * 2018-06-18
 * 登录接口封装
 *
 */
import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { SuiHttpService } from '@op/smile/services/https/sui-http.service';
import { Md5 } from 'ts-md5/dist/md5';
import { LocalConfig } from '@op/smile/global/sui-local-config';
import { ModalService } from '@op/smile/components/modal/modal.service'
import { SuiResponse } from '@op/smile/services/https/sui-http-entity';
import { Observable } from 'rxjs/Observable' ;
// import   JSEncrypt from "../../../assets/js/jsencrypt.js"
declare var JSEncrypt: any;
 
@Injectable()
export class LoginService {
    //设备ID
    private DEVID = "sjddaldlljhojljlj1";
    //rsa 编码 key
    private  RSA_KEY = '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQClTSvO20HpROCnffbzqx5gOmAx6zBLe8s0vfjTnZF1UU0GUO1 + CRuFaLoBGY9jnPYBqRoNXZo3O37bfQOgjZ9AjPcn1fpljSJpE7J + LbaCtcC0GGPwX + Dr8HfD3AYHKz + KMzdNClr28zoaNzJr6kDQ7wGXgblOYljGfJLY / Glx8wIDAQAB-----END PUBLIC KEY-----';
    //appid
    private  APPID = 'dc821327a5ed15cb71475e6b0fdf4038';




    public encryptDatas;
    constructor(public httpUtils: SuiHttpService,
                public ModalService: ModalService) {}

    /**
     * 获取验证码方法
     */
    getVerCode(mobilePhone: string): any {
        var option = {
            url: 'common/sms/send/pc',
            rootPath: LocalConfig.getInstance().BUSINESS_ROOTPATH,
            isPublish: true,
            globalLoad: true,
            urlParam: {
                mobile: mobilePhone
            }
        }
        return this.getHttp(option)
    }
 

    //检查登录
    checkVerCode(param: any): any {
        var option = {
            url: 'common/sms/code/query/pc',
            rootPath: LocalConfig.getInstance().BUSINESS_ROOTPATH,
            
            isPublish: true,
            globalLoad: true,
            urlParam :{
                mobile : param.userMobile,
                smscode : param.validcode,
            }
        };
        return this.getHttp(option)
    }


    //初始化请求登录/eqinit/login
    initLogin(param){
        var jsencrypt  = new JSEncrypt();
        const key = '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQClTSvO20HpROCnffbzqx5gOmAx6zBLe8s0vfjTnZF1UU0GUO1 + CRuFaLoBGY9jnPYBqRoNXZo3O37bfQOgjZ9AjPcn1fpljSJpE7J + LbaCtcC0GGPwX + Dr8HfD3AYHKz + KMzdNClr28zoaNzJr6kDQ7wGXgblOYljGfJLY / Glx8wIDAQAB-----END PUBLIC KEY-----'
        jsencrypt.setPublicKey(key);  
        let encryptData = jsencrypt.encrypt(param.pswd);//加密后的字符串 
        this.encryptDatas = encodeURIComponent(jsencrypt.encrypt("sjddaldlljhojljlj1"));//加密后的字符串 
        var option = {
            url: 'person/login',
            rootPath: LocalConfig.getInstance().serverUrls.LOGIN_SERVER,//多服务器配置获取
            method: RequestMethod.Post,
            isPublish: true,
            globalLoad: true,
            bodyParam :{
                devid :      this.encryptDatas ,
                appid :      'dc821327a5ed15cb71475e6b0fdf4038',
                mobileno :    param.userMobile,
                password :    encodeURIComponent(encryptData) ,
                appType :     'svopermgr',
                SignType :    'MD5'
            },
            urlParam:{
                devid :  this.encryptDatas,
                appid : 'dc821327a5ed15cb71475e6b0fdf4038',
                mobileno :    param.userMobile,
                password :   encodeURIComponent(encryptData),
                appType :   'svopermgr',
                SignType : 'MD5'
          
            }
        };
        return this.getHttp(option);
    }

    //获取tonke
    getTolen(token){
        var option = {
            url: 'common/token/get/pc',
            rootPath: LocalConfig.getInstance().BUSINESS_ROOTPATH,
            method: RequestMethod.Post,
            isPublish: true,
            globalLoad: true,
            urlParam :{
                token : token,
                validtime:100000,
                devid: "sjddaldlljhojljlj1" ,
            }
        };
        return this.getHttp(option)
    }

   //登录服务基础请求
    getHttp(option: any): Observable<any> | any {
    //  return  new Observable(observer =>{
    //         this.httpUtils.request(option).subscribe(res =>{
    //             observer.next(111111);
    //         });
    //     });
        return this.httpUtils.request(option).map(res => {
                let { retCode, message } = res;
                if (retCode != 0) {
                    //失败统一处理
                    this.ModalService.error(message);
                    return ;
                };
                return res;
            });
    }

  


}
