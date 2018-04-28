import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonService } from '../../services/common.service'
import { EditService } from './edit.service';


@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {
    public tiem = this.commonService.getCurrentTimes();
    public titleObj = this.commonService.titleObj;
    public setTitle = this.commonService.titleObj.title;
    public interValObj;
    public listCard = this.commonService.listCard;
    public areaValue;
    public setModeluser;
    //模态框显示控制
    public showSetModel :boolean = false  
 
    constructor(public commonService: CommonService,
        public router: Router,
        public editService: EditService) {
    
         }

    ngOnInit() {
        this.downTime();
    }

    //保存标题
    save() {
        this.commonService.titleObj.title = this.setTitle;
        //发送时间
        this.commonService.changeEngineStatus(true);
    }

    goReturn() {
        this.router.navigateByUrl('main');
    }
    //倒计时
    downTime() {
        this.interValObj = setInterval(() => {
            this.tiem = this.commonService.getCurrentTimes();
        }, 990)
    }
    //设置
    set(item) {
        //取出服务数据 因为这里的listCard已经更新了浏览器数据
        this.setModeluser = this.commonService.listCard[item.id];
        this.showSetModel = true;
    }

    //退出情况
    ngOnDestroy() {
        clearInterval(this.interValObj);
    }

    //关闭 关闭弹框
    closeModel(event) {
        this.showSetModel = false;
    }
    //弹框的保存
    saveModel(param){
        //跟小大小
        const {page} = param;
        param.plateSet.size_y = page;
        this.commonService.editCommonList(param.id,param);
        this.showSetModel = false;
    }

    //进入
    getAreaOpenChange(item){
        console.log(item)
    }
    

}
