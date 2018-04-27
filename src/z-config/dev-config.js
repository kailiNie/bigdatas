/**
 * 导入开发js文件
 * @param {Array<string>} urls 
 */
function devImportJsFile(urls) {
    var jsPathStrs = "";
    urls.forEach(function (jsPath) {
        jsPathStrs += '<script src="z-config/' + jsPath + '"  ></script>';
    });
    window.document.write(jsPathStrs);
}

var DEV_CONFIG_URLS = {};
//添加url映射
function devIncludeUrls(urlMap) {

    if (!urlMap) {
        return;
    }
    for (var key in urlMap) {
        if (SUI_LOCAL_CONFIG.ENV_MODE == "ui") {
            //ui模式 全部显示静态数据
            urlMap[key].isUnion = false;
        } else if (SUI_LOCAL_CONFIG.ENV_MODE == "union") {
            //联调或者正式模式 全部链接业务服务器
            urlMap[key].isUnion = true;
        }
        DEV_CONFIG_URLS[key] = JSON.parse(JSON.stringify(urlMap[key]));
    }
    console.log("env_mode=【"+SUI_LOCAL_CONFIG.ENV_MODE+"】", " urlMap=", DEV_CONFIG_URLS);
}


devImportJsFile([
    'dev/dev-config-urls.js'
]);



// //开发配置文件
// var DEV_CONFIG = {
//     //自定接口服务器路径
//     SLIC_INTERFACE_SERVER_URL: "http://192.168.10.11:3690/"
// }

// /**
//  * DEBUG
//  * LOG
//  * INFO
//  * WARN
//  * ERROR
//  */
// SUI_LOCAL_CONFIG.CONSOLE_LOG_LEVEL = "DEBUG";