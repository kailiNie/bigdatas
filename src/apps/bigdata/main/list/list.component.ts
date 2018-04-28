import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { CommonService } from '../../services/common.service';
import "../../../../../node_modules/jquery/dist/jquery.js"
import "../../../../assets/js/jquery.gridster.js"
import { ListService } from './list.service';
declare var $: any
@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

    public tiem = this.commonService.getCurrentTimes();

    public titleObj = this.commonService.titleObj;

    public cardList = this.commonService.listCard;
 
     

    //实时拜访
    public visitPlate = this.commonService.visitPlate;
    public interValObj;
    public gridster;
    public saleOlderData;
    //重点区域
    public statisticResult;

    public overviewResult = new OverviewResult();
    public hourlytradeResult;
    public saleResult;
    //折线图数据
    public linkChartOption: any;
    public linkChartOptionData;
    //map数据
    public mapOption: any;
    public mapOptionData: any;
    public mapList;
    public visitRestlt;
    public goodsResult;
    public saleinfoResult;
    public categoryResult;


    public latticeWidth = this.calMoveWeight(4);
    public latticeHeight = this.calMoveHeight(4);

    constructor(public commonService: CommonService,
        public router: Router,
        public listService: ListService) {

    }
    engineStatus: boolean = false;
    subscription: any;
    ngOnInit() {
        //条形图宽度和高度 还需要得到格子大下
        this.linkChartOption =  this.getLinkWidthHeight();


        this.mapOption = {
            width: this.latticeWidth * 2,
            height: this.latticeHeight * 2 - 45 //减去P的高度
        };
        //倒计时 时钟
        this.downTime();

        this.setQuery();
        //观察这对象
        this.subscription = this.commonService.engineStatus.subscribe(status => {
            //更新图形
            this.linkChartOption =  this.getLinkWidthHeight();
            //更新查询条件
            this.listService.commonBodyParam = this.listService.getCommonRequest();
            this.setQuery(); 

        });
        //页面大小
        Observable.fromEvent(window, 'resize').subscribe(event => {
               console.log(this.gridster.serialize());//得到 所有的 widget  )              
        })
    }

    //今日总览
    overviewQuery() {
        const { equency } = this.listService.commonBodyParam[0];
        const time = equency * 1000;
        Observable.timer(0, time).subscribe(x => {
            //实时拜访记录
            this.listService.overviewQuery().subscribe((res) => {
                let { result } = res.data;
                this.overviewResult = result;
            })
        });
    }
    //分时交易
    hourlytradeQuery() {
        const { equency } = this.listService.commonBodyParam[1];
        const time = equency * 1000;
        Observable.timer(0, time).subscribe(x => {
            //分时交易
            this.listService.hourlytradeQuery().subscribe((res) => {
                this.linkChartOptionData = res;
            });
        });
    }
    //交易统计
    transactionSun() {
        const { equency } = this.listService.commonBodyParam[2];
        const time = equency * 1000;
        Observable.timer(0, time).subscribe(x => {
            //交易统计
            this.listService.transactionSun().subscribe((res) => {
                this.statisticResult = res
            });
        });
    }

    //批发商交易额排行
    saleQuery() {
        const { equency } = this.listService.commonBodyParam[3];
        const time = equency * 1000;
        Observable.timer(0, time).subscribe(x => {
            //实时拜访记录
            this.listService.saleQuery().subscribe((res) => {
                this.saleResult = res
            });
        });
    }
    //全栈经理业绩排行
    saleinfoQuery() {
        const { equency } = this.listService.commonBodyParam[4];
        const time = equency * 1000;
        Observable.timer(0, time).subscribe(x => {
            //全栈经理业绩排行
            this.listService.saleinfoQuery().subscribe((res) => {
                this.saleinfoResult = res;
            });
        });
    }
    //品类销售排行
    categoryQuery() {
        const { equency } = this.listService.commonBodyParam[5];
        const time = equency * 1000;
        Observable.timer(0, time).subscribe(x => {
            //品类销售排行
            this.listService.categoryQuery().subscribe((res) => {
                this.categoryResult = res
            })
        });
    }
    //商品销售排行
    goodsQuery() {
        const { equency } = this.listService.commonBodyParam[6];
        const time = equency * 1000;
        Observable.timer(0, time).subscribe(x => {
            //商品销售排行
            this.listService.goodsQuery().subscribe((res) => {
                this.goodsResult = res
            });
        });
    }
    //实时订单
    saleOlderQuery() {
        const { equency } = this.listService.commonBodyParam[7];
        const time = equency * 1000;
        Observable.timer(0, time).subscribe(x => {
            //实时拜访记录
            this.listService.saleOlderQuery().subscribe((res) => {
                let { result } = res.data;
                this.saleOlderData = result;
            })
        });
    }
    //实时拜访记录
    visitQuery() {
        //获取刷新时间
        const { equency } = this.listService.commonBodyParam[8];
        const time = equency * 1000;
        Observable.timer(0, time).subscribe(x => {
            //实时拜访记录
            this.listService.visitQuery().subscribe((res) => {
                this.visitRestlt = res.data.result;
            });
        });
    };
    //重点区域
    statisticQuery() {
        const { equency } = this.listService.commonBodyParam[9];
        const time = equency * 1000;
        Observable.timer(0, time).subscribe(x => {
            //重点区域
            this.listService.statisticQuery().subscribe((res) => {
                let { result } = res.data;
                this.mapOptionData = this.listService.formaDatamap(result);
                this.mapList = result;
            });
        });
    }

    //定时查询
    setQuery() {
        this.transactionSun();
        this.goodsQuery();
        this.saleinfoQuery();
        this.categoryQuery();
        this.statisticQuery();
        this.visitQuery();
        this.overviewQuery();
        this.saleOlderQuery();
        this.saleQuery();
        this.hourlytradeQuery();
    }

    //页面加载完初始化
    ngAfterViewInit() {
        this.gridster = $(".gridster > ul").gridster({
            widget_margins: [5, 5], //模块的间距 [上下,左右]  
            widget_base_dimensions: [this.latticeWidth, this.latticeHeight], //模块的宽高 [宽,高]  
            min_cols: 4,
            max_cols: 4,
            max_size_y: 3,
            disable: false,
            avoid_overlapped_widgets: true,
            resize:{enabled:true},
            draggable:{
                stop:(event,ui) =>{
                    //移动就存储现在移动板块的位置
                    this.commonService.updatedSerialize(this.gridster.serialize());
                }
                
            }
        }).data('gridster');
        
    }


    confirm() {
        this.router.navigate(['/edit']);
    }
    /**
     * 计算每一个移动块的搞
     * 传入具有几块
     */
    calMoveHeight(col): number {
        let { height } = this.commonService.getWindHeight(); //屏幕的高
        let colPro = 1 / col;//总高度100%计算出每一块的比例
        return (height - 90) * colPro - 15;
    }

    /**
   * 计算每一个移动块的宽
   * 传入具有几块
   */
    calMoveWeight(col): number {
        let { width } = this.commonService.getWindHeight(); //屏幕的宽
        let colPro = 1 / col;//总高度100%计算出每一块的比例
        return (width - 66) * colPro - 10;
    }

    //倒计时
    downTime() {
        Observable.interval(1000).subscribe(x => this.tiem = this.commonService.getCurrentTimes());
    }

    //设置板块位置
    setCardIndex() {
        //实时拜访
        const { plateSet } = Object.assign(this.cardList[8], this.commonService.getLocalStorage(9));
    }
    //设置图形高度和宽度
    getLinkWidthHeight (){
    const  num = this.commonService.listCard[1].plateSet.size_y; 
     return {
                width: this.latticeWidth,
                height: (this.latticeHeight*num) - 20 //减去?的高度
            };
    }

}
class OverviewResult {
    public areaname: string;
    public custqty: string;
    public mgqty: string;
    public orderqty: string;
    public visitqty: string;
    public addqty: string;
    public palceorderorgqty: string;
    public tradeamount: string;

    constructor() {
        this.areaname = '',
        this.custqty = '';
        this.orderqty = '';
        this.visitqty = '';
        this.addqty = '';
        this.palceorderorgqty = '';
        this.tradeamount = '';
    }
}

//创建一个数据原
