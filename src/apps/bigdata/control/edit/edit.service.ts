import { Injectable } from '@angular/core';
import { ClientSessionDataService, SuiUser, SuiSiteConfig } from '@op/smile/business-components/sui-frameworks/client-session-data.service';
import { SuiCookieService } from '@op/smile/services/storage/sui-cookie.service';
@Injectable()
export class EditService {

    constructor(private storage: SuiCookieService) {

    }

    //修改列表 刷星次数 isDateselection是否显示周期选择 dateselection 初始化周期
 
    //存储数据
    localStorageSave(key, value) {
        this.storage.putLocal(key, value);
    }

    //获取数据
    getLocalStorage(key) {
        return this.storage.getLocal(key) || {};
    }



}
