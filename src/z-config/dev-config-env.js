/**
 * 开发环境配置
 */
(function () {
    'use strict'

    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串 
    var isIE = window.ActiveXObject || "ActiveXObject" in window;
    if (isIE) {
        //ie不支持 箭头函数/模板变量等
        window.document.write('<script src="z-config/dev-config-env-ie.js"  ></script>');
        console.log("load ie config ");
        
    } else {
        window.document.write('<script src="z-config/dev-config-env1.js"  ></script>');
        console.log("load no ie config ");
    }

})();
