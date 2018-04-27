import { Component, OnInit,OnDestroy, Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable,Subject } from 'rxjs';
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
export class ListComponent implements OnInit,OnDestroy {

    public tiem = this.commonService.getCurrentTimes();

    public titleObj = this.commonService.titleObj;
 
    public cardList = this.commonService.listCard;

    //实时拜访
    public visitPlate = this.commonService.visitPlate;
    public interValObj;
    public gridster;
    //重点区域
    public statisticResult;
    
    public overviewResult : OverviewResult = new OverviewResult();
    public hourlytradeResult;
    public saleResult;
    //折线图数据
    public linkChartOption: any;
    public linkChartOptionData;
    //map数据
    public mapOption: any;
    public mapOptionData : any;
    public visitRestlt;
    public goodsResult;
    public saleinfoResult;
    public categoryResult;
    
 

    public latticeWidth = this.calMoveWeight(4);
    public latticeHeight = this.calMoveHeight(4);

    constructor(public commonService: CommonService, 
                public router: Router,
                public listService : ListService) {
                    console.log('初始化')
                 }

    ngOnInit() {
        //条形图宽度和高度 还需要得到格子大下
        this.linkChartOption = {
            width: this.latticeWidth,
            height: this.latticeHeight * 2 - 20 //减去?的高度
        };
        this.mapOption = {
            width: this.latticeWidth * 2,
            height: this.latticeHeight * 2 - 45 //减去P的高度
        };
        //倒计时 时钟
       this.downTime();
     
       this.setQuery();
        //设置板块位置
       //  this.setCardIndex();
     

//     Observable.fromEvent(window, 'resize')
//   　　.debounceTime(100) // 以免频繁处理
//   　　.subscribe((event) => {
// 　　　　// 这里处理页面变化时的操作
//     　　console.log(this.gridster);
//   　　});
    }

    visitQuery(){
           //实时拜访记录
           this.listService.visitQuery().subscribe((res)=>{
            this.visitRestlt = res.data.result;
       });
    }
    //重点区域
    statisticQuery(){
        this.listService.statisticQuery().subscribe((res)=>{
            let {result } = res.data;
            this.mapOptionData =  this.listService.formaDatamap(result)
        });     
    }
    //交易统计
   transactionSun(){
    this.listService.transactionSun().subscribe((res)=>{
        console.log(res);
        this.statisticResult = res 
    });     
   }


    //批发商交易额排行
    saleQuery(){
         this.listService.saleQuery().subscribe((res)=>{
             this.saleResult = res
        });   
    }

     //商品销售排行
    goodsQuery(){
        this.listService.goodsQuery().subscribe((res)=>{
            this.goodsResult =  res
        });
    }
    //全栈经理业绩排行
    saleinfoQuery(){
          this.listService.saleinfoQuery().subscribe((res)=>{
            this.saleinfoResult =   res;
            
       });
    }
    //品类销售排行
    categoryQuery( ) {
        this.listService.categoryQuery().subscribe((res) =>{
            this.categoryResult = res
        })
    }

    //实时订单
    saleOlderQuery(){
        this.listService.saleOlderQuery().subscribe((res) =>{
            let {result} = res.data;
        }) 
    }

    //今日总览
    overviewQuery(){
        this.listService.overviewQuery().subscribe((res) =>{
            let {result} = res.data;
            this.overviewResult =   result;
        })
    }

    //分时交易
    hourlytradeQuery(){
        this.listService.hourlytradeQuery().subscribe((res) =>{
   
            this.linkChartOptionData = res;
           
              
        });
    }
 
    //定时查询
    setQuery(){
    
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
    //退出情况
    ngOnDestroy():void{
      
        clearInterval(this.interValObj);
    }

   

    
    //设置板块位置
    setCardIndex(){
        console.log('进入');
        //实时拜访
        const { plateSet } =  Object.assign(this.cardList[8],this.commonService.getLocalStorage(9));
       // this.visitPlate = plateSet;
    }

}
class OverviewResult{
     public areaname :string;
     public custqty: string;
     public mgqty: string;
     public orderqty: string;
     public visitqty: string;
     public addqty: string;
     public palceorderorgqty: string;
     public tradeamount: string;

     constructor(){
         this.areaname = '',
         this.custqty = '';
         this.orderqty ='';
         this.visitqty = '';
         this.addqty = '';
         this.palceorderorgqty ='';
         this.tradeamount = '';
     }
}   

//创建一个数据原
