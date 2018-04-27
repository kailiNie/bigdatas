/**
 * 其它应用调用接口
 * http://xxx?accessToken=201801302101183a8e93c30c0282f9a8
 */
(function () {
    'use strict'
/* 
    //示例 获取应用参数,并加入到url的参数
    var myParam = {
        a:123,
        user: {
            "telePhone": "18823464285",
            "realName": "管理员",
            "loginname": "admin",
            "fileServerAddr": "http://192.168.20.176:80/",
            "qq": "1234567982",
            "email": "leg@163.com",
            "loginEid": 10000000,
            "userId": 1000001100,
            "fullname": "三只熊总部",
            "idToken": "没有,传随机数",
            "ename": "三只熊总部"
        }
    }
    var myUrlParam = otherAppInvokeInterfaceUtils.encrypParam(myParam);
    console.log("encrypParam-myUrlParam", myUrlParam); 
    // 加入浏览器的url参数param:  http://xxx?param = myUrlParam
    */

    //验证模式
    SUI_LOCAL_CONFIG.USER_VALIDATOR_MODE = "TOKEN";
    //获取菜单类型
    SUI_LOCAL_CONFIG.APP_MENU_TYPE = "PLATFORM_OPERATE"; 
    //不显示头信息
    SUI_LOCAL_CONFIG.BASE_FRAMEWORK_CONFIG.showHeader = false;
    //不支持多用户
    SUI_LOCAL_CONFIG.BASE_FRAMEWORK_CONFIG.MULT_USER_FLAG = false;
    /** 本地静态应用列表 */
    SUI_LOCAL_CONFIG.LOCAL_STATIC_APPS = {
        "result": [{
            "appid": "8",
            "appname": "acc-center",
            "apptitle": "账户中心",
            "description": "账户中心-描述",
            "target": "_self",
            "appurl": "acc-center"
        }]
    }
    if(SUI_LOCAL_CONFIG.USER_VALIDATOR_MODE  == "TOKEN") {
        //token 验证方式
        var token = otherAppInvokeInterfaceUtils.getUrlToken();
        console.log("the token", token);
        if(!token) {
            //token 不存在
            return ;
        }
        SUI_LOCAL_CONFIG.TOKEN = token;
    } else {
        //用户验证方式
        //解析路径参数
        var param = otherAppInvokeInterfaceUtils.getUrlParam();
        console.log("the param", param);
        //参数不存在
        if (!param) {
            return;
        }
        var user = param.user;
        console.log("the user", user);
        //用户不存在
        if (!user) {
            return;
        }
        SUI_LOCAL_CONFIG.OTHER_APP_INVOKE_USER = user;
    }
    

    

})();
//?param = {user: {}}