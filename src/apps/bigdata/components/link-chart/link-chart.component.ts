

/**
 * 折线图组件 组件传入宽高 X周数据Y周数据
 *  option any  传入的是一个对象 保持与echarts 对象一致 便于API调试
 */
import { Component, OnInit, Input, OnChanges, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { Observable, Subject } from 'rxjs';
/** 
 * 校验统计图
*/
@Component({
    selector: 'app-link-chart',
    templateUrl: './link-chart.component.html',
    styleUrls: ['./link-chart.component.css']
})
export class LinkChartComponent implements OnInit, OnChanges {

    @Input() option: any;
    @Input() optionData = new EventEmitter();
    updateOptions: any;
    public options;
    initOpts = {
        renderer: 'svg',
        width: 150, //默认150
        height: 150 //默认150
    };



    constructor() {

    }

    ngOnInit() {

        this.options = {
            color: ['#69E1EF'],
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '0',
                right: '20',
                bottom: '40',
                top: '30',
                containLabel: true,
                show: false,
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: [],

                axisLabel: {
                    interval: 3,
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        // 使用深浅的间隔色
                        color: ['#66CBFC'],
                        opacity: 0.1,
                    }
                },//网格线,
                axisLine: { //数值
                    show: true,
                    lineStyle: {
                        color: '#66CBFC'
                    }
                },
                axisTick: {
                    show: true,
                    inside: true
                }
            },
            yAxis: {
                type: 'value',
                data: [],
                splitLine: {
                    show: true,
                    lineStyle: {
                        // 使用深浅的间隔色
                        color: ['#66CBFC'],
                        opacity: 0.1,
                    }
                },//网格线,

                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#66CBFC'
                    }
                },
                //是否显示坐标轴刻度 inside 朝内
                axisTick: {
                    show: true,
                    inside: true
                }
            },
            series: [{
                data: [] ,
                type: 'line',
                areaStyle: {
                    opacity: '0.1'
                },
                axisLabel: {
                    interval: 3
                },
            }
            ]
        };


        const { width, height } = this.option;
        this.initOpts.width = width;
        this.initOpts.height = height;
        var time = new Time();
        this.options.xAxis.data = time.getTimes();
    }
    //改变
    ngOnChanges(changes: SimpleChanges) {
        if (changes['optionData'] && changes['optionData'].currentValue) {
            this.options.series[0].data = changes.optionData.currentValue;
            this.updateOptions = {
                series: [{
                  data:   this.options.series[0].data
                }]
              };
        }

        if(changes['option'] && changes['optionData'].currentValue){
            const { width, height } = this.option;
            this.initOpts.width = width;
            this.initOpts.height = height;
        }
    }
}

//时间类
export class Time {
    //获取一天小时数组
    getTimes() {
        const times = [];
        for (var i = 0; i <= 25; i++) {
            times.push(`${i}:00`);
        }
        return times;
    }
}

