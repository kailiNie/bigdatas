//配置文件
var SUI_LOCAL_CONFIG = {
    /**
     * 超时时间 秒
     */
    TIMEOUT: null,
    //资源根目录
    /**
     * 如果项目部署不是根目录,有二级目录名,则需要填写
     * 例如 http://127.0.0.1/xxx/xxxx/ ;则 RESOURCE_ROOTPATH='xxx/xxxx/'
     */
    RESOURCE_ROOTPATH: "",
    //业务根路径
    BUSINESS_ROOTPATH: "http://192.168.20.76:7302/acctcenter-oper/",
    //http://192.168.20.63:9090/vem/ 
    /**
     * 资源服务器路径
     * 例如: 帮助文件、配置文件等
     */
    RESOURCE_SERVER_ROOTPATH: "",
    /**
     * 多用户标志 默认 true
     * true-支持
     * false-不支持
     */
    MULT_USER_FLAG: false,
    /**
     * 有静态菜单的应用列表
     *
     */
    HAS_STATICMENU_APPS: ['demos', 'tb-storage', 'tb-system'],
    /**
     * 控制台日志显示级别 正式环境为WARN ,
     * 开发环境为DEBUG(开发环境修改dev-config.js文件参数 SUI_LOCAL_CONFIG.CONSOLE_LOG_LEVEL )
     * DEBUG
     * LOG
     * INFO
     * WARN
     * ERROR
     */
    CONSOLE_LOG_LEVEL: "LOG"
        // LOGTRACE_FLAG: true
}



/**
 * 企业信息
 */
SUI_LOCAL_CONFIG.ENTERPRISE_INFO = {
    "productName": "大数据面板",
    "logo": "assets/imgs/login/logo.png",
    "loginBackgroundImg": "assets/imgs/login/login_bg.png",
    "loginBannerImg": "assets/imgs/login/login_banner.png",
    "enterpriseName": "云端信联科技有限公司",
    "hotline": "0775-88888888",
    "qq": "232857155"
};

/**
 * 基础应用配置信息 
 */
SUI_LOCAL_CONFIG.BASE_FRAMEWORK_CONFIG = {
    /**
     * 是否显示头信息
     */
    showHeader: true,
    "headerBgClass": "theme-dark",
    "defaultAppUrl": "demos"
}


/**
 * token 登录方式
 */
// SUI_LOCAL_CONFIG.USER_VALIDATOR_MODE  = "TOKEN" ;
// SUI_LOCAL_CONFIG.TOKEN = "token-liurong";