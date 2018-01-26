<template>
    <div class="">
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="#">数据统计</BreadcrumbItem>
                <!-- <BreadcrumbItem href="#">应用中心</BreadcrumbItem>
                <BreadcrumbItem>某应用</BreadcrumbItem> -->
            </Breadcrumb>
        </div>
        <div class="layout-content">
            <div class="layout-content-main">
                <div class="queryTop">
                    <div class="fbox" ref="mmm">
                        <Input v-model="value1" style="width: 250px">
                        <Select v-model="select1" slot="prepend" style="width: 80px">
                            <Option value="name">课程名称</Option>
                            <Option value="type">课程类型</Option>
                            <!-- <Option value="status">状态</Option> -->
                        </Select>
                        </Input>
                    </div>
                    <!-- <div class="fbox">
                        <span>上线日期：</span>
                        <DatePicker type="daterange" v-model="upTimeDate" :options="options1" placement="bottom-end" placeholder="选择日期" style="width: 200px"></DatePicker>
                    </div> -->
                    <div class="fbox">
                        <Button type="primary" @click="queryLesson()">查询</Button>
                    </div>
                </div>

                <div class="chartBox">
                    <!-- <chart :options="polar"></chart> -->
                    <div id="myChart" :style="{width: '400px', height: '300px'}"></div>
                    <div id="myChart1" :style="{width: '90%', height: '500px'}"></div>
                    <div id="myChart2" :style="{width: '90%', height: '500px'}"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  data() {
    return {
        value1:'',
        select1: 'name'
    }
  },
  mounted(){
    console.log(this.$refs.mmm)
    this.drawLine();
    this.drawLine1();
    this.drawLine2();
  },
  methods: {
    queryLesson() {},
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
            title: { text: '在Vue中使用echarts' },
            tooltip: {},
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
    },
    drawLine1(){
        // 基于准备好的dom，初始化echarts实例
        let myChart1 = this.$echarts.init(document.getElementById('myChart1'))
        let option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                }
            },
            toolbox: {
                feature: {
                    dataView: {
                        show: true,
                        readOnly: false
                    },
                    magicType: {
                        show: true,
                        type: ['line', 'bar']
                    },
                    restore: {
                        show: true
                    },
                    saveAsImage: {
                        show: true
                    }
                }
            },
            legend: {
                data: ['蒸发量', '降水量', '平均温度']
            },
            xAxis: [{
                type: 'category',
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            }],
            yAxis: [{
                    type: 'value',
                    name: '水量',
                    min: 0,
                    max: 250,
                    interval: 50,
                    axisLabel: {
                        formatter: '{value} ml'
                    }
                },
                {
                    type: 'value',
                    name: '温度',
                    min: 0,
                    max: 25,
                    interval: 5,
                    axisLabel: {
                        formatter: '{value} °C'
                    }
                }
            ],
            series: [{
                    name: '蒸发量',
                    type: 'bar',
                    data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
                },
                {
                    name: '降水量',
                    type: 'bar',
                    data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                },
                {
                    name: '平均温度',
                    type: 'line',
                    yAxisIndex: 1,
                    data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
                }
            ]
        };
        // 绘制图表
        myChart1.setOption(option);
    },
    drawLine2(){
        // 基于准备好的dom，初始化echarts实例
        let myChart2 = this.$echarts.init(document.getElementById('myChart2'))
        var base = +new Date(2017, 10, 1);
        var today = new Date();
        var oneDay = 24 * 3600 * 1000;
        var date = [];

        var data1 = [];
        var data2 = [];
        var data3 = [];

        while (base < today-oneDay) {
            var now = new Date(base += oneDay);
            date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
            data1.push(Math.round((Math.random()) * 250 ));
            data2.push(Math.round((Math.random()) * 250 ));
            data3.push(Math.round((Math.random()) * 25 ));
        }
        let option = {
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    return [pt[0], '10%'];
                },
                axisPointer: {
                    type: 'cross'
                }
            },
            legend: {
                data: ['今日新增参与人数', '今日新增解锁人数', '今日学习人数']
            },
            toolbox: {
                feature: {
                    dataView: {
                        show: true,
                        readOnly: false
                    },
                    magicType: {
                        show: true,
                        type: ['line', 'bar']
                    },
                    restore: {
                        show: true
                    },
                    saveAsImage: {
                        show: true
                    }
                }
            },
            xAxis: {
                type: 'category',
                data: date
            },
            yAxis: [{
                    type: 'value',
                    name: '今日新增参与人数',
                    min: 0,
                    // max: 250,
                    interval: 50,
                    axisLabel: {
                        formatter: '{value} '
                    }
                },
                {
                    type: 'value',
                    name: '今日新增解锁人数',
                    min: 0,
                    // max: 25,
                    interval: 50,
                    axisLabel: {
                        formatter: '{value} '
                    }
                }
            ],
            dataZoom: [{
                type: 'inside',
                start: '90',
                end: today
            }, {
                // start: 0,
                // end: 10,
                handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                handleSize: '80%',
                handleStyle: {
                    color: '#fff',
                    shadowBlur: 3,
                    shadowColor: 'rgba(0, 0, 0, 0.6)',
                    shadowOffsetX: 2,
                    shadowOffsetY: 2
                }
            }],
            series: [{
                    name: '今日新增参与人数',
                    type: 'bar',
                    data: data1
                },
                {
                    name: '今日新增解锁人数',
                    type: 'bar',
                    data: data2
                },
                {
                    name: '今日学习人数',
                    type: 'line',
                    yAxisIndex: 1,
                    data: data3
                }
            ]
        };

        // 绘制图表
        myChart2.setOption(option);
    }
  }
};
</script>
<style lang="scss">
.echarts {
  height: 300px;
}
</style>

