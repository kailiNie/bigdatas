import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common'
import { Observable, Observer } from "rxjs/Rx";
import { SuiCookieService } from '@op/smile/services/storage/sui-cookie.service';

/**
 * 公共服务
 */
@Injectable()
export class CommonService {
    //被观察这
    engineStatus: Observable<boolean>;
    private observer: Observer<boolean>;
    //标题
    public titleObj = {
        title: '智店宝数据罗盘'
    }

    visitPlate = {
        "row": 2,    //处于第几行
        "col": 1,     //处于第几列
        "sizex": 1,  //x周长度 小图  x=1 y =1 就业务
        "sizey": 2,  // y周长度 大图 x=1 y =2
    };
    //默认配置 
    public listCard = [
        {
            "id": "0",
            'title': '总览',
            'isCheckBox': false,
            'conText': '列示当前的实时客户数、商圈数；今日交易单数、交易金额；今日拜访客户数、新增客户数、下单客户数',
            "equency": 60,
            "catlevel": "2",
            "dateselection": "1",
            "dateselectionArray": [],
            "page": "1",
            //板块位置一级初始化大小
            "plateSet": {
                row: 1,
                col: 2,
                size_x: 2,
                size_y: 1
            }
        },
        {
            "id": "1",
            'title': '分时交易',
            'isCheckBox': false,
            'conText': '通过折线图，列示今日每个小时的销售数据，了解销售峰谷',
            "equency": 60,
            "catlevel": "2",
            "page": "1",
            "dateselection": "1",
            "dateselectionArray": [],
            "rule":[  //规则 图例大小 小图 y轴1 大图y轴2
                {name:'大图',value:'2'},
                {name:'小图',value:'1'},
            ],
            "plateSet": {
                row: 3,
                col: 1,
                size_x: 1,
                size_y: 1
            }

        },
        {
            "id": "2",
            'title': '交易统计',
            'isCheckBox': false,
            'conText': '按周期统计本期交易金额、交易单数、活跃客户数，并与上期做对比，周期可选周或月',
            "equency": 60,
            "catlevel": "2",
            "page": "1",
            "isDateselection": true,
            "dateselection": "2",
            "dateselectionArray": [
                { name: '周', value: '2' },
                { name: '月', value: '3' }
            ],
            "rule":[  //规则 图例大小 小图 y轴1 大图y轴2
                {name:'大图',value:'2'},
                {name:'小图',value:'1'},
            ],
            "plateSet": {
                row: 4,
                col: 4,
                size_x: 1,
                size_y: 1
            }
        },
        {
            "id": "3",
            'title': '批发商交易额排行',
            'isCheckBox': false,
            "page": "1",
            'conText': '列示本周期内的批发商交易金额排行版，周期可选日、周、月，可以配置列示多少条',
            "equency": 60, "catlevel": "2", "dateselection": "2",
            "dateselectionArray": [
                { name: '日', value: '1' },
                { name: '周', value: '2' },
                { name: '月', value: '3' }
            ],
            "rule":[  //规则 图例大小 小图 y轴1 大图y轴2
                {name:'大图',value:'2'},
                {name:'小图',value:'1'},
            ],
            "plateSet": {
                row: 2,
                col: 1,
                size_x: 1,
                size_y: 1
            }
        },
        {
            "id": "4",
            'title': '全栈经理业绩排行',
            'isCheckBox': false,
            'conText': '列示本周期内的归属全栈经理的交易金额排行榜，周期可选日、周、月，可以配置列示多少条',
            "equency": 60,
            "catlevel": "2",
            "page": "1",
            "dateselection": "2",
            "dateselectionArray": [
                { name: '日', value: '1' },
                { name: '周', value: '2' },
                { name: '月', value: '3' }
            ],
            "rule":[  //规则 图例大小 小图 y轴1 大图y轴2
                {name:'大图',value:'2'},
                {name:'小图',value:'1'},
            ],
            "plateSet": {
                row: 4,
                col: 3,
                size_x: 1,
                size_y: 1
            }
        },
        {
            "id": "5",
            'title': '品类销售排行',
            'isCheckBox': false,
            'conText': '列示本周期内的品类商品交易金额排行榜，周期可选日、周、月，可以配置列示多少条',
            "equency": 60,
            "catlevel": "2",
            "page": "2",
            "dateselection": "2",
            "dateselectionArray": [
                { name: '周', value: '2' },
                { name: '月', value: '3' }
            ],
            "rule":[  //规则 图例大小 小图 y轴1 大图y轴2
                {name:'大图',value:'2'},
                {name:'小图',value:'1'},
            ],
            "plateSet": {
                row: 2,
                col: 4,
                size_x: 1,
                size_y: 2
            }
        },
        {
            "id": "6",
            'title': '商品销售排行',
            'isCheckBox': false,
            'conText': '列示本周期内的商品交易金额排行榜，周期可选日、周、月，可以配置列示多少条',
            "equency": 60,
            "catlevel": "2",
            "page": "1",
            "dateselection": "2",
            "rule":[  //规则 图例大小 小图 y轴1 大图y轴2
                {name:'大图',value:'2'},
                {name:'小图',value:'1'},
            ],
            "dateselectionArray": [
                { name: '日', value: '1' },
                { name: '周', value: '2' },
                { name: '月', value: '3' }
            ],
            "plateSet": {
                row: 4,
                col: 2,
                size_x: 1,
                size_y: 1
            }
        },
        {
            "id": "7",
            'title': '实时订单',
            'isCheckBox': false,
            'conText': '列示今日最新的订单信息，可以配置列示多少条',
            "equency": 60,
            "catlevel": "2",
            "page": "1",
            "dateselection": "2",
            "dateselectionArray": [
                { name: '周', value: '2' },
                { name: '月', value: '3' }
            ],
            "rule":[  //规则 图例大小 小图 y轴1 大图y轴2
                {name:'大图',value:'2'},
                {name:'小图',value:'1'},
            ],
            "plateSet": {
                row: 1,
                col: 4,
                size_x: 1,
                size_y: 1
            }
        },
        {
            "id": "8",
            'title': '实时拜访',
            'isCheckBox': false,
            'conText': '列示今日最新的拜访签到信息，可配置列示多少条',
            "equency": 60,
            "page": "1",
            "catlevel": "2",//类别
            "dateselection": "2",
            "dateselectionArray": [
                { name: '周', value: '2' },
                { name: '月', value: '3' }
            ],
            "rule":[  //规则 图例大小 小图 y轴1 大图y轴2
                {name:'大图',value:'2'},
                {name:'小图',value:'1'},
            ],
            "plateSet": {
                row: 1,    //处于第几行
                col: 1,     //处于第几列
                size_x: 1,  //x周长度 小图  x=1 y =1 就业务
                size_y: 1,  // y周长度 大图 x=1 y =2
            }
        },
        {
            "id": "9",
            'title': '重点区域统计',
            'isCheckBox': false,
            'conText': '列示指定区域的各个下级区域，在周期内的交易数据，重点区域可以选择省、市两级，周期可选择周或月',
            "equency": 60,
            "catlevel": "2",
            "page": "2",  
            "dateselection": "2",
            "dateselectionArray": [
                { name: '周', value: '2' },
                { name: '月', value: '3' }
            ],
            "rule":[  //规则 图例大小 小图 y轴1 大图y轴2
                {name:'大图',value:'3'},
                {name:'小图',value:'2'},
            ],
            "plateSet": {
                row: 2,    //处于第几行
                col: 2,     //处于第几列
                size_x: 2,  //x周长度 小图  x=1 y =1 就业务
                size_y: 2,  // y周长度 大图 x=1 y =2
            }
        }
    ];


    constructor(
        private datePipe: DatePipe,
        private storage: SuiCookieService) {
        //被观察这
        this.engineStatus = new Observable<boolean>(observer => this.observer = observer).share();
        //获取kocie
        let localListCard =  JSON.stringify(this.getLocalStorage('use'));
       
        //如何为空 存入默认listCalrd
        if(localListCard === '{}'){
            //把默认地址放入进去
            this.localStorageSave('use',this.listCard);
            this.updatedCommonList(); 
        }else{
            //更新服务 listCard
            this.updatedCommonList(); 
        }
    
    }

    //更新
    updatedCommonList(){
        this.listCard = this.getLocalStorage('use');
    }
    //修改
    editCommonList(id,param){
       let list =  this.getLocalStorage('use');//获取cookie数据
       list[id] = Object.assign(list[id],param);//更新更新选择项
       this.localStorageSave('use',list);//保存cookie
        this.updatedCommonList();//更新本地
     
    }


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
    public getCurrentTimes() {
        let weekArray = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
        let myDate = new Date(new Date);
        let week = weekArray[myDate.getDay()];
        let dateStr: string = this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss');
        return `${dateStr} ${week}`;
    }

    //计算屏幕大小
    getWindHeight() {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    }

    //观察者 所有组件共享
    changeEngineStatus(newstatus: boolean) {
        this.observer.next(newstatus);
    };
    //更新移动快位置 传入的是一个数组
    updatedSerialize(serialize) {
        this.listCard.forEach((item,index)=>{
            item.plateSet =  serialize[index];
        });
        //存入cookie
        this.localStorageSave('use',this.listCard);
    }
}
