import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { NgxEchartsService } from 'ngx-echarts';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-map-chart',
    templateUrl: './map-chart.component.html',
    styleUrls: ['./map-chart.component.css']
})
export class MapChartComponent implements OnInit, OnChanges {

    // show loading spinner:
    mapLoaded = false;
    // empty option before geoJSON loaded:
    options = {};
    //传入的值只要宽高 地图ID 获取json数据 以及地图数据
    @Input() option: any;
    @Input() optionData: any;
    @Input() mapList;

    initOpts = {
        width: 600,//默认宽度
        height: 352//默认高度
    };

    constructor(private http: HttpClient, private es: NgxEchartsService) {

        

     }
    ngOnInit() {
        const { width, height } = this.option;
        this.initOpts.width = width + 8;
        this.initOpts.height = height + 8;

        // this.options = {
        //     //显示侧边 数据、还原、下载工具
        //     toolbox: {
        //         show: false,
        //         orient: 'vertical',
        //         left: 'right',
        //         top: 'center',
        //         feature: {
        //             dataView: { readOnly: false },
        //             restore: {},
        //             saveAsImage: {}
        //         }
        //     },

        //     legend: {
        //         show: false,
        //         align: 'right',
        //         left: 'left',
        //     },
        //     //热敏图的值
        //     visualMap: {
        //         min: 1000,
        //         max: 50000,
        //         //text: ['0', '50000'],
        //         realtime: false,
        //         calculable: true, //是否允许拖动
        //         color: '#fff',
        //         inRange: {
        //             //color: ['#285c86', 'rgba(3,4,5,0.4)', '#5bb6e5'],
        //             color: ['#285c86', '#428bb7', '#5bb6e5', '#61c1f1'],
        //             //symbolSize: [10, 10]
        //         },
        //         itemWidth: 20,
        //     },
        //     //数据值
        //     series: [
        //         {
        //             name: '主数据',
        //             type: 'map',
        //             roam: false,//是否开启图形移动
        //             mapType: 'HK', // map type should be registered
        //             itemStyle: {
        //                 normal: { label: { show: true, position: 'right', color: '#fff' } },
        //                 // emphasis: { label: { show: false,position:'right',color:'#fff'} },
        //             },
        //             color: ['#fff'],
        //             aspectScale: 1,
        //             label: { show: false },
        //             //  layoutCenter: ['30%', '30%'],
        //             // 如果宽高比大于 1 则宽度为 100，如果小于 1 则高度为 100，保证了不超过 100x100 的区域
        //             //   layoutSize:100,

        //             data: [
        //                 { name: '罗湖区', value: 20057.34, },
        //                 { name: '宝安区', value: 15477.48 },
        //                 { name: '南山区', value: 31686.1 },
        //                 { name: '福田区', value: 6992.6 },
        //                 { name: '龙岗区', value: 6992.6 },
        //                 { name: '盐田区', value: 6992.6 }
        //             ],
        //         }
        //     ]
        // };


    }


    ngOnChanges() {
        // fetch map geo JSON data from server
        this.http.get('assets/data/geometryProvince/44.json')
            .subscribe(geoJson => {
                // hide loading:
                this.mapLoaded = true;
                // register map:
                this.es.registerMap('HK', geoJson);
                // update options:
                this.options = {
                    //显示侧边 数据、还原、下载工具
                    toolbox: {
                        show: false,
                        orient: 'vertical',
                        left: 'right',
                        top: 'center',
                        feature: {
                            dataView: { readOnly: false },
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    legend: {
                        show: false,
                        align: 'right',
                        left: 'left',
                    },
                    //热敏图的值
                    visualMap: {
                        min: 0,
                        max: 100,
                        //text: ['0', '50000'],
                        realtime: false,
                        calculable: true, //是否允许拖动
                        color: '#fff',
                        inRange: {
                            //color: ['#285c86', 'rgba(3,4,5,0.4)', '#5bb6e5'],
                            color: ['#285c86', '#428bb7', '#5bb6e5', '#61c1f1'],
                            //symbolSize: [10, 10]
                        },
                        itemWidth: 20,
                    },
                    //数据值
                    series: [
                        {
                            name: '主数据',
                            type: 'map',
                            roam: false,//是否开启图形移动
                            mapType: 'HK', // map type should be registered
                            itemStyle: {
                                normal: { label: { show: true, position: 'right', color: '#fff' } },
                                // emphasis: { label: { show: false,position:'right',color:'#fff'} },
                            },
                            color: ['#fff'],
                            aspectScale: 1,
                            label: { show: false },
                            //  layoutCenter: ['30%', '30%'],
                            // 如果宽高比大于 1 则宽度为 100，如果小于 1 则高度为 100，保证了不超过 100x100 的区域
                            //   layoutSize:100,

                            data: this.optionData
                        }
                    ]
                };
            });
    }
}
