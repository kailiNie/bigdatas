import { Component, OnInit, ViewChild, Output, EventEmitter,Input } from '@angular/core';
 

@Component({
    selector: 'app-set-model',
    templateUrl: './set-model.component.html',
    styleUrls: ['./set-model.component.css'],
  
})
export class SetModelComponent implements OnInit {
    private inputsValue;
    
    public areaValue;
    @Output() closeModel: EventEmitter<Object> = new EventEmitter<Object>();
    @Output() saveModel: EventEmitter<Object> = new EventEmitter<Object>();
     
    @Input() nzVisible : boolean;

    @Input() modelinfo;

    modal;

    //周期数组
    public cycle = [{'name':'今日','value':'1'},{'name':'本周','value':'2'},{'name':'本月','value':'3'}];
    /**
     * 传递过来的参数
     */
    transmitParam: any;

   

    constructor() {
        
     }

    ngOnInit() {
       this.modal = Object.assign(this.modelinfo,this.modal);
    }
    /** 打开弹出框 */

    returnModel(){
         this.closeModel.emit()
    }

    //保存
    modelSave(){
        this.modal.areaid = this.modal.areaid.split('00')[0];
        this.saveModel.emit(this.modal);
    }

   
}

 
