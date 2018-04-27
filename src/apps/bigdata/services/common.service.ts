import { Injectable } from '@angular/core';
import {  DatePipe  } from '@angular/common'
import { SuiCookieService } from '@op/smile/services/storage/sui-cookie.service';
/**
 * 公共服务
 */
@Injectable()
export class CommonService {
  
 //标题
  public titleObj = {
      title: '智店宝数据罗盘'
  }

  visitPlate = {
    "row": 1,    //处于第几行
    "col":1,     //处于第几列
    "sizex": 1,  //x周长度 小图  x=1 y =1 就业务
    "sizey": 2,  // y周长度 大图 x=1 y =2
  }
 
  public listCard = [
    {
        "id": "1",
        'title': '总览',
        'isCheckBox': false,
        'conText': '列示当前的实时客户数、商圈数；今日交易单数、交易金额；今日拜访客户数、新增客户数、下单客户数',
        "equency": 60,
        "catlevel": "3",
        "dateselection": "1",
        "dateselectionArray": [],
        //板块位置一级初始化大小
        "plateSet" : {
            "row": 1,    //处于第几行
            "col":1,     //处于第几列
            "sizex": 1,  //x周长度 小图  x=1 y =1 就业务
            "sizey": 1,  // y周长度 大图 x=1 y =2
        }
    },
    {
        "id": "2",
        'title': '分时交易',
        'isCheckBox': false,
        'conText': '通过折线图，列示今日每个小时的销售数据，了解销售峰谷',
        "equency": 60,
        "catlevel": "1",
        "dateselection": "1",
        "dateselectionArray": [],
    
    },
    {
        "id": "3",
        'title': '交易统计',
        'isCheckBox': false,
        'conText': '按周期统计本期交易金额、交易单数、活跃客户数，并与上期做对比，周期可选周或月',
        "equency": 60,
        "catlevel": "3",
        "isDateselection": true,
        "dateselection": "2",
        "dateselectionArray": [
            { name: '周', value: '2' },
            { name: '月', value: '3' }
        ]
    },
    {
        "id": "4",
        'title': '批发商交易排行',
        'isCheckBox': false,
        'conText': '列示本周期内的批发商交易金额排行版，周期可选日、周、月，可以配置列示多少条',
        "equency": 60, "catlevel": "3", "dateselection": "2",
        "dateselectionArray": [
            { name: '日', value: '1' },
            { name: '周', value: '2' },
            { name: '月', value: '3' }
        ]
    },
    {
        "id": "5",
        'title': '全栈经理业绩排行',
        'isCheckBox': false,
        'conText': '列示本周期内的归属全栈经理的交易金额排行榜，周期可选日、周、月，可以配置列示多少条',
        "equency": 60,
        "catlevel": "3",
        "dateselection": "2",
        "dateselectionArray": [
            { name: '日', value: '1' },
            { name: '周', value: '2' },
            { name: '月', value: '3' }
        ]
    },
    {
        "id": "6",
        'title': '品类销售排行',
        'isCheckBox': false,
        'conText': '列示本周期内的品类商品交易金额排行榜，周期可选日、周、月，可以配置列示多少条',
        "equency": 60,
        "catlevel": "3",
        "dateselection": "2",
        "dateselectionArray": [
            { name: '周', value: '2' },
            { name: '月', value: '3' }
        ]
    },
    {
        "id": "7",
        'title': '商品销售排行',
        'isCheckBox': false,
        'conText': '列示本周期内的商品交易金额排行榜，周期可选日、周、月，可以配置列示多少条',
        "equency": 60,
        "catlevel": "3",
        "dateselection": "2",
        "dateselectionArray": [
            { name: '日', value: '1' },
            { name: '周', value: '2' },
            { name: '月', value: '3' }
        ]
    },
    {
        "id": "8",
        'title': '实时订单',
        'isCheckBox': false,
        'conText': '列示今日最新的订单信息，可以配置列示多少条',
        "equency": 60,
        "catlevel": "3",
        "dateselection": "2",
        "dateselectionArray": [
            { name: '周', value: '2' },
            { name: '月', value: '3' }
        ]
    },
    {
        "id": "9",
        'title': '实时拜访',
        'isCheckBox': false,
        'conText': '列示今日最新的拜访签到信息，可配置列示多少条',
        "equency": 60,
        "catlevel": "3",
        "dateselection": "2",
        "dateselectionArray": [
            { name: '周', value: '2' },
            { name: '月', value: '3' }
        ],
        "plateSet" : {
            "row": 1,    //处于第几行
            "col":1,     //处于第几列
            "sizex": 1,  //x周长度 小图  x=1 y =1 就业务
            "sizey": 1,  // y周长度 大图 x=1 y =2
        }
    },
    { 
        "id": "10",
        'title': '重点区域统计', 
        'isCheckBox': false, 
        'conText': '列示指定区域的各个下级区域，在周期内的交易数据，重点区域可以选择省、市两级，周期可选择周或月', 
        "equency": 60, 
        "catlevel": "3" ,
        "dateselection": "2",
        "dateselectionArray": [
            { name: '周', value: '2' },
            { name: '月', value: '3' }
        ]
    }
]
  

  constructor(
        private datePipe: DatePipe,
        private storage: SuiCookieService) { }


     //存储数据
     localStorageSave(key, value) {
        this.storage.putLocal(key, value);
    }

    //获取数据
    getLocalStorage(key) {
        return this.storage.getLocal(key) || {};
    }

 /**
  * 获取当前时间
  */
 public  getCurrentTimes  ()  {
    let weekArray = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
    let myDate = new Date(new Date);
    let week = weekArray[myDate.getDay()];
 
    let dateStr:string = this.datePipe.transform(new Date(),'yyyy-MM-dd hh:mm:ss');
    return `${dateStr} ${week}`;
  }

  //计算屏幕大小
  getWindHeight (){
    return {
        width : document.documentElement.clientWidth,
        height : document.documentElement.clientHeight
    } 
  }

}
