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
    public interValObj;
    public setTitle: string;
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
        //存入数据查询数据 获取存入的seesion存入
        let info = Object.assign(item,this.editService.getLocalStorage(item.id));
        this.setModeluser = info;
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
        this.editService.localStorageSave(param.id,param);
        this.showSetModel = false;
    }

    //进入
    getAreaOpenChange(item){
        console.log(item)
    }
    

}
