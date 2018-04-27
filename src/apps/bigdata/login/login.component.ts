/**
 * 登录模块
 */
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { SuiValidator, ValidatorRule } from '@op/smile/components/validator/sui-validator';
import { Md5 } from 'ts-md5/dist/md5';
import { LoginService } from './login.service';
import { LoginService as appLogin } from '@op/smile/apps/login/login.service';
import { ClientSessionDataService, SuiUser, SuiSiteConfig } from '@op/smile/business-components/sui-frameworks/client-session-data.service';


// import { SrvRecord } from 'dns';
// import { UserInfo } from '@op/smile/apps/login/login-mode.component';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})


// globalService
export class LoginComponent implements OnInit,OnDestroy {
    public sendCodeMsg = '获取验证码';
    public isDisabled = false;
    public intervalid;
    public UserInfo: any = {
        userMobile: '',
        validcode: '',
        pswd: '',
    };

    /** 加载层 */
    loadSpin: any = {
        message: '登 录'
    };

    mobileValidator: Array<ValidatorRule | string>;

    constructor(
        private loginServer: LoginService,
        private appLogin: appLogin,
        private commonService: CommonService,
        private clientSessionData: ClientSessionDataService,
        private router: Router
    ) { }

    ngOnInit() {
        setTimeout(() => {
            this.initValidator();
        }, 0);
    }

    //退出页面
    ngOnDestroy() {
        clearInterval(this.intervalid);
    }

    @Output() doLogin = new EventEmitter();
    @Output() doForgetPsd = new EventEmitter();
    @ViewChild("el_validator") el_validator: SuiValidator;
    rootValidators: ValidatorRule[];

    /**
     * 登录
     * 发送 登录信息
     */
    login() {
        this.loginServer.initLogin(this.UserInfo).subscribe((res)=>{
            console.log(res);
            // const { result } = res.data;
            //  this.loginServer.getTolen(result).subscribe(res=>{
            //     const { accessToken,sessionId,userInfo } = res.data.result;
            //     this.clientSessionData.cacheToken(accessToken, userInfo.realname);
            //     this.clientSessionData.cacheUserInfo(userInfo);
            //     this.commonService.localStorageSave(`${userInfo.realname}_session`,sessionId);
            //     //登录成功调整到main
            //     this.router.navigateByUrl('/main');
            //  });
        });
    }

    //获取验证码 获取成功
    getViewCode() {
        this.loginServer.getVerCode(this.UserInfo.userMobile).subscribe((res) => {
             this.countDown(3);
        })
    }

    private countDown(time: number) {
        this.isDisabled = true;
        this.intervalid = setInterval(() => {
            time--;
            this.sendCodeMsg = `${time}秒后重新获取`;
            if (time == 0) {
                this.isDisabled = false;
                this.sendCodeMsg = '重新获取';
                clearInterval(this.intervalid)
            }
        }, 1000)
    }

    /** 校验规则 */
    private initValidator(): void {
        this.mobileValidator = [
            'required'
        ]
    }
 
}
