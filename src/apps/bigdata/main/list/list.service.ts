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
import { Observable } from 'rxjs/Observable' ;
 

@Injectable()
export class ListService {
    public commonurlParam =  {
        devid :'sjddaldlljhojljlj1',
        accessToken: this.commonService.getLocalStorage("token"),
        sessionId : this.commonService.getLocalStorage('负责人_session')
    };

    public commonBodyParam;

    constructor(public httpUtils: SuiHttpService,
                public ModalService: ModalService,
                public commonService : CommonService ) {
                    this.commonBodyParam = this.getCommonRequest();
                 }

    
    //获取实时拜访数据
    visitQuery() {

        var option = {
            url: 'saleman/visit/query',
            rootPath: LocalConfig.getInstance().BUSINESS_ROOTPATH,
            isPublish: true,
            globalLoad: true,
            urlParam:this.commonurlParam,
            bodyParam:  {
                param :{
                    areaid : 0,
                    dateselection:'1',
                    pagesize : 3,
                    catlevel : 3
                }
                
            }
        }
        return this.getHttp(option)
    }

    //重点区域
    statisticQuery() {
        var option = {
            url: 'keyarea/statistic/query',
            rootPath: LocalConfig.getInstance().BUSINESS_ROOTPATH,
            isPublish: true,
            globalLoad: true,
            bodyParam:  {
                param :{
                    areaid : '440000',
                    dateselection:'1',
                    pagesize : 3,
                    catlevel : 3
                }
                
            }
        }
        return this.getHttp(option)
    }
    //交易统计
    transactionSun(){
        var option = {
            url: 'trade/statistic/query',
            rootPath: LocalConfig.getInstance().BUSINESS_ROOTPATH,
            isPublish: true,
            globalLoad: true,
            bodyParam:  {
                param :{
                    areaid : 0,
                    dateselection:'1',
                    pagesize : 3,
                    catlevel : 3
                }
                
            }
        }
        return this.getHttp(option).map(res =>{
            const {result}  = res.data
            return this.formDataTransaction(result);
        });
    }

    formDataTransaction(array){
 
        var returnArr = [];
        array.forEach((value,index)=>{
             
         var max =Math.max(value.thisweek,value.lastweek);
            let obj = {"thisweekProValue":`${value.thisweek*100/max}%`,"lastweekProValue":`${value.lastweek*100/max}%`};
           obj = Object.assign(value,obj);
            returnArr.push(obj);
        })
        return returnArr;
    }

    //销售金额排行
    saleQuery() : Observable<any>{
        var option = {
            url: 'sale/amount/query',
            rootPath: LocalConfig.getInstance().BUSINESS_ROOTPATH,
            isPublish: true,
            globalLoad: true,
            urlParam:{
                devid:'sjddaldlljhojljlj1',
            },
            bodyParam:  {
                param :{
                    areaid : 0,
                    dateselection:'1',
                    pagesize : 3,
                    catlevel : 3
                }
                
            }
        }
        return this.getHttp(option).map((res,index)=>{
            const { result } = res.data;
            
            return  this.formaDataSale(result);;
        })
    }

    //实时订单
    saleOlderQuery(){
        var option = {
            url: 'sale/order/query',
            rootPath: LocalConfig.getInstance().BUSINESS_ROOTPATH,
            isPublish: true,
            globalLoad: true,
            urlParam:{
                devid:'sjddaldlljhojljlj1',
            },
            bodyParam:  {
                param :{
                    areaid : 0,
                    dateselection:'1',
                    pagesize : 3,
                    catlevel : 3
                }
                
            }
        }
        return this.getHttp(option)
    }


    //商品销售排行
    goodsQuery(){
        var option = {
            url: 'sale/goods/query',
            rootPath: LocalConfig.getInstance().BUSINESS_ROOTPATH,
            isPublish: true,
            globalLoad: true,
            bodyParam:  {
                param :{
                    areaid : 0,
                    dateselection:'1',
                    pagesize : 3,
                    catlevel : 3
                }
                
            }
        }
       
       return this.getHttp(option).map(res=>{
             const { result } = res.data;
            return   this.formaDatagoods(result);
        })
    }

        //全账经理业绩排行
    saleinfoQuery(){
        var option = {
                url: 'saleman/saleinfo/query',
                rootPath: LocalConfig.getInstance().BUSINESS_ROOTPATH,
                isPublish: true,
                globalLoad: true,
                bodyParam:  {
                    param :{
                        areaid : 0,
                        dateselection:'1',
                        pagesize : 3,
                        catlevel : 3
                    }
                    
                }
        }
        return this.getHttp(option).map(res =>{
            const { result } = res.data;
           return this.formaDataSaleinfo(result);
        })
    }
    //品类销售排行 
    categoryQuery(){
        var option = {
            url: 'sale/category/query',
            rootPath: LocalConfig.getInstance().BUSINESS_ROOTPATH,
            isPublish: true,
            globalLoad: true,
            bodyParam:  {
                param :{
                    areaid : 0,
                    dateselection:'1',
                    pagesize : 6,
                    catlevel : 3
                }
                
            }
        }
         return this.getHttp(option).map((res)=>{
             const {result} = res.data;
            return this.formaDataCategory(result)
         })
    }

      //今日总览
    overviewQuery(){
        var option = {
            url: 'today/overview/query',
            rootPath: LocalConfig.getInstance().BUSINESS_ROOTPATH,
            isPublish: true,
            globalLoad: true,
            bodyParam:  {
                param :{
                    areaid : 0,
                    dateselection:'1',
                    pagesize : 3,
                    catlevel : 3
                }
                
            }
        }
         return this.getHttp(option)
    }

        //分时交易
    hourlytradeQuery(){
            var option = {
                url: 'hourly/trade/query',
                rootPath: LocalConfig.getInstance().BUSINESS_ROOTPATH,
                isPublish: true,
                globalLoad: true,
                bodyParam:  {
                    param :{
                        areaid : 0,
                        dateselection:'1',
                        pagesize : 3,
                        catlevel : 3
                    }
                    
                }
            }
             return this.getHttp(option).map(res=>{
                 const { result } = res.data
                return  this.formaDataHourlytrade(result)
             })
        }

 

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


    //格式化数据进入带边框组件数据 标题 副标题 
    formaDataSaleinfo(array){
        var max = array[0].totalamount;
        var returnArr = [];
        array.forEach((value,index)=>{
            let obj = {'title':value.areaname,"proValue":`${value.totalamount*100/max}%`,"barValue":value.totalamount};
            returnArr.push(obj);
        })
        return returnArr;
    }

    //格式化销售排行
    formaDataCategory(array){
        var max = array[0].totalamount;
        var returnArr = [];
        array.forEach((value,index)=>{
            let obj = {'title':value.catname,"proValue":`${value.totalamount*100/max}%`,"barValue":value.totalamount};
            returnArr.push(obj);
        })
        return returnArr;
    }

    //格式化批发商交易额排行
    formaDataSale(array){
        var max = array[0].totalamount;
        var returnArr = [];
        array.forEach((value,index)=>{
            let obj = {'title':value.vendername,"proValue":`${value.totalamount*100/max}%`,"barValue":value.totalamount};
            returnArr.push(obj);
        })
        return returnArr;
    }
    //商品销售排行
     
    formaDatagoods(array){
        var max = array[0].totalamount;
        var returnArr = [];
        array.forEach((value,index)=>{
            let obj = {'title':value.goodsname,"proValue":`${value.totalamount*100/max}%`,"barValue":value.totalamount};
            returnArr.push(obj);
        })
        return returnArr;
    }

 

    formaDatamap(array){
        var returnArr = [];
        array.forEach((value,index)=>{
            let obj = {'name':value.areaname,"value": Math.floor(Math.random()*10000+1)};
            returnArr.push(obj);
        })
        return returnArr;
    }

    formaDataHourlytrade(array){
        var returnArr = [];
        array.forEach((value,index)=>{
            returnArr.push(value.salemoney);
        })
        return returnArr;
    }
    // 获取请求参数、循环迭代默认数据 利用默认数据取出cookie数据进行合并获取
    getCommonRequest(){
        let defaultList= this.commonService.listCard;
        defaultList.forEach((value)=>{
            let cookieObj = this.commonService.getLocalStorage(value.id);
            value = Object.assign(value,cookieObj);
        });
        
        return defaultList;
    }
}



 