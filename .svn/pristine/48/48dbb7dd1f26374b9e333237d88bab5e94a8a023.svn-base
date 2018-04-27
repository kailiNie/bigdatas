/**
 * 开发环境配置
 */
(function () {
    'use strict'


    SUI_LOCAL_CONFIG.RESOURCE_SERVER_ROOTPATH = 'http://192.168.10.11:3681/demos/';
    SUI_LOCAL_CONFIG.CONSOLE_LOG_LEVEL = "DEBUG";
    var RAP_URL = 'http://192.168.20.72:8010/rap.plugin.js?projectId=22';
    var JQUERY_URL = 'z-config/libs/jquery-2.2.1.js';
    var EVN_CSS_URL = 'z-config/dev-config.css';
    var DEV_CONFIG_URL = "z-config/dev-config.js";

    //配置信息
    var cfgEles = {
        ENV_MODE: { type: "select", width: "", label: "选择环境", items: ['-1:选择环境', 'dev:前端开发环境', 'ui:UI环境', 'union:联调环境'], value: "ui" },
        CONSOLE_LOG_LEVEL: { type: "select", width: "", label: "日志级别", items: ['-1:选择日志级别', 'DEBUG', 'LOG', 'INFO', 'WARN', 'ERROR'], value: "DEBUG" },
        BUSINESS_ROOTPATH: { type: "input", width: "500px", label: "网关地址" },
        DEVELOPER_ADDR: { type: "input", width: "500px", label: "后端服务器地址" },
        RESOURCE_SERVER_ROOTPATH: { type: "input", width: "500px", label: "静态资源地址" },
        SLIC_INTERFACE_SERVER_URL: { type: "input", width: "500px", label: "自定接口平台地址", value: SUI_LOCAL_CONFIG.RESOURCE_SERVER_ROOTPATH }
    }

    window.document.write('<script src=' + JQUERY_URL + '  ></script>');
    window.document.write('<script src=' + RAP_URL + '  ></script>');
    window.document.write('<script src=' + DEV_CONFIG_URL + '  ></script>');

    var cfgEle;
    for (var key in cfgEles) {
        cfgEle = cfgEles[key];
        if (localStorage.getItem(key)) {
            SUI_LOCAL_CONFIG[key] = localStorage.getItem(key);
        } else if (cfgEle.value) {
            SUI_LOCAL_CONFIG[key] = cfgEle.value;
        }

    }


    
})();

(function (arr) {
    arr.forEach(function (item) {
      if (item.hasOwnProperty('remove')) {
        return;
      }
      Object.defineProperty(item, 'remove', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: function remove() {
          if (this.parentNode !== null)
            this.parentNode.removeChild(this);
        }
      });
    });
  })([Element.prototype, CharacterData.prototype, DocumentType.prototype]);
