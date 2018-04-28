/**
 * niekl
 * list services
 * 发送http请求
 */

import { Injectable } from '@angular/core';
//请求
import { SuiHttpService } from '@op/smile/services/https/sui-http.service';
import { LocalConfig } from '@op/smile/global/sui-local-config';
import { RequestMethod } from '@angular/http';
import { ModalService } from '@op/smile/components/modal/modal.service'
import { forEach } from '@angular/router/src/utils/collection';
import { CommonService } from '../../services/common.service';
import { Observable } from "rxjs/Rx";


@Injectable()
export class ListService {
    //url查询条件
    public commonurlParam = {
        devid: 'sjddaldlljhojljlj1',
        accessToken: this.commonService.getLocalStorage("token"),
        sessionId: this.commonService.getLocalStorage('负责人_session')
    };
    public commonBodyParam;

    constructor(public httpUtils: SuiHttpService,
        public ModalService: ModalService,
        public commonService: CommonService) {
        //查询条件
        this.commonBodyParam = this.getCommonRequest();
    }
    //今日总览
    overviewQuery() {
        return this.query('today/overview/query', 0);
    };

    //分时交易
    hourlytradeQuery() {
        return this.query('hourly/trade/query', 1).map(res => {
            const { result } = res.data
            return this.formaDataHourlytrade(result)
        })
    };
    //交易统计
    transactionSun() {
        return this.query('trade/statistic/query', 2).map(res => {
            const { result } = res.data
            return this.formDataTransaction(result);
        });
    };
    //销售金额排行
    saleQuery(): Observable<any> {
        return this.query('sale/amount/query', 3).map((res, index) => {
            const { result } = res.data;
            return this.formaDataSale(result);;
        })
    };
    //全账经理业绩排行
    saleinfoQuery() {
        return this.query('saleman/saleinfo/query', 4).map(res => {
            const { result } = res.data;
            return this.formaDataSaleinfo(result);
        })
    }
    //品类销售排行 
    categoryQuery() {
        return this.query('sale/category/query', 5).map((res) => {
            const { result } = res.data;
            return this.formaDataCategory(result)
        })
    }
    //商品销售排行
    goodsQuery() {
        return this.query('sale/goods/query', 6).map(res => {
            const { result } = res.data;
            return this.formaDatagoods(result);
        })

    }
    //实时订单
    saleOlderQuery() {
        return this.query('/sale/order/query', 7)
    }

    //获取实时拜访数据
    visitQuery() {
        return this.query('saleman/visit/query', 8)
    }

    //重点区域
    statisticQuery() {
        return this.query('keyarea/statistic/query', 9);
    }

    formDataTransaction(array) {
        var returnArr = [];
        array.forEach((value, index) => {
            var max = Math.max(value.thisweek, value.lastweek);
            let thisweekProValue = value.thisweek * 100 / max | 3;
            let lastweekProValue = value.lastweek * 100 / max | 3;
            let obj = { "thisweekProValue": `${thisweekProValue}%`, "lastweekProValue": `${lastweekProValue}%` };
            obj = Object.assign(value, obj);
            returnArr.push(obj);
        })
        return returnArr;
    }










    //基础查询
    query(url, id) {
        const param = this.getBodyParam(id);
        var option = {
            url: url,
            rootPath: LocalConfig.getInstance().BUSINESS_ROOTPATH,
            isPublish: true,
            globalLoad: true,
            bodyParam: {
                param: param
            }
        }
        return this.getHttp(option)
    }




    getHttp(option: any): Observable<any> | any {
        return this.httpUtils.request(option).map(res => {
            let { retCode, message } = res;
            if (retCode != 0) {
                //失败统一处理
                this.ModalService.error(message);
                return;
            };
            return res;
        });
    }


    //格式化数据进入带边框组件数据 标题 副标题 
    formaDataSaleinfo(array) {
        var max = array[0].totalamount;
        var returnArr = [];
        array.forEach((value, index) => {
            let obj = { 'title': value.areaname, "proValue": `${value.totalamount * 100 / max}%`, "barValue": value.totalamount };
            returnArr.push(obj);
        })
        return returnArr;
    }

    //格式化销售排行
    formaDataCategory(array) {
        var max = array[0].totalamount;
        var returnArr = [];
        array.forEach((value, index) => {
            let obj = { 'title': value.catname, "proValue": `${value.totalamount * 100 / max}%`, "barValue": value.totalamount };
            returnArr.push(obj);
        })
        return returnArr;
    }

    //格式化批发商交易额排行
    formaDataSale(array) {
        var max = array[0].totalamount;
        var returnArr = [];
        array.forEach((value, index) => {
            let obj = { 'title': value.vendername, "proValue": `${value.totalamount * 100 / max}%`, "barValue": value.totalamount };
            returnArr.push(obj);
        })
        return returnArr;
    }
    //商品销售排行

    formaDatagoods(array) {
        var max = array[0].totalamount;
        var returnArr = [];
        array.forEach((value, index) => {
            let obj = { 'title': value.goodsname, "proValue": `${value.totalamount * 100 / max}%`, "barValue": value.totalamount };
            returnArr.push(obj);
        })
        return returnArr;
    }



    formaDatamap(array) {
        var returnArr = [];
        array.forEach((value, index) => {
            let obj = { 'name': value.areaname, "value": Math.floor(Math.random() * 10000 + 1) };
            returnArr.push(obj);
        })
        return returnArr;
    }

    formaDataHourlytrade(array) {
        var returnArr = [];
        array.forEach((value, index) => {
            returnArr.push(value.salemoney);
        })
        return returnArr;
    }
    // 获取请求参数、循环迭代默认数据 利用默认数据取出cookie数据进行合并获取
    getCommonRequest() {
        return this.commonService.listCard;
    }


    /**
     * 
     * @param id 获取对象数据 数据来源this.commonBodyParam 这个数据在页面初始化已经更新完毕
     * 已经修改页面点击保存也已经更新完毕
     * 、
     */
    getBodyParam(id) {
        const { areaid, dateselection, page, catlevel } = this.commonBodyParam[id];
        return {
            areaid: 0,
            dateselection,
            pagesize: page,
            catlevel,
        }
    }


}



