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
                        <Input v-model="value1" style="width: 300px">
                        <Select v-model="selectName" slot="prepend" style="width: 80px">
                                <Option value="lessonName">课程名称</Option>
                                <Option value="activityName">活动名称</Option>
                            </Select>
                        </Input>
                    </div>
                    <div class="fbox">
                        <Button type="primary" @click="queryInfo()">查询</Button>
                    </div>
                </div>
                <p class="errInfo" v-show="errInfo">{{errInfo}}</p>
                <section class="main" v-show="showLesson">
                    <div class="querySecond">
                        <div style="background:#eee;padding: 10px">
                            <Card dis-hover>
                                <div v-if="selectName == 'lessonName'">
                                    <p><strong>课程名称：</strong> {{courseActInfo.name}}</p>
                                    <p><strong>课程ID：</strong> {{courseActInfo._id}}</p>
                                    <p><strong>课节数量：</strong> {{courseActInfo.lessonCount}}</p>
                                    <p><strong>状态：</strong> {{courseActInfo.status}}</p>
                                </div>
                                <div v-if="selectName == 'activityName'">
                                    <p><strong>活动名称：</strong> 绘本打卡奖励-外教课</p>
                                    <p><strong>活动ID：</strong> XXX</p>
                                    <p><strong>状态：</strong> 已上线</p>
                                </div>
                            </Card>
                        </div>
                        
                    </div>  
                    <div class="queryThird">
                        <!-- 课程 -->
                        <div v-show="selectName == 'lessonName'">
                            <Row>
                                <div id="myChart1" :style="{width: '96%', height: '500px'}"></div>
                            </Row>

                            <div class="tableTop" style="margin-top: 20px;">课节统计（累计）</div>
                            <Table :loading="loadingLesson" :columns="columnsLesson" :data="dataLesson" height="400" ></Table>

                            <div class="tableTop" style="margin-top: 20px;">用户统计</div>                 
                            <Row class="zzt">
                                <Col span="12">学习天数分布（柱状图）</Col>
                                <Col span="12">累积有效天数分布（柱状图）</Col>
                                <Row>
                                    <Col span="12" class="pos_r">
                                        <div id="myChart2" :style="{width: '100%', height: '300px', marginTop: '20px'}"></div>
                                        <Spin fix size="large" v-show="loadSpin2"></Spin>
                                    </Col>
                                    <Col span="12" class="pos_r">
                                        <div id="myChart3" :style="{width: '100%', height: '300px', marginTop: '20px'}"></div>
                                        <Spin fix size="large" v-show="loadSpin3"></Spin>
                                    </Col>
                                </Row>
                            </Row>
                        </div>
                        <!-- 活动 -->
                        <div  v-show="selectName == 'activityName'">
                            <div class="queryTop">
                                <div class="fbox">
                                    <span>上线日期：</span>
                                    <DatePicker type="daterange" v-model="TimeDate" :options="options" placement="bottom-end" placeholder="选择日期" style="width: 200px"></DatePicker>
                                </div>

                                <div class="fbox">
                                    <Button type="primary" @click="queryInfo()">查询</Button>
                                </div>
                            </div>
                            <div class="tableTop">活动统计（累计）</div>
                            <Table :columns="columnsActivity" :data="dataActivity" ></Table>
                        </div>

                    </div>
                    <Spin fix size="large" v-show="loadSpin"></Spin>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import utils from '../../utils'
    // 引入基本模板
    let echarts = require("echarts/lib/echarts");
    // 引入柱状图组件
    require("echarts/lib/chart/bar");
    // 引入提示框和title组件
    require("echarts/lib/component/tooltip");
    require("echarts/lib/component/title");
    export default {
        data() {
            return {
                value1: "多纳自然拼读外教课（初级）",
                selectName: "lessonName",
                loadSpin: false,
                loadSpin2: false,
                loadSpin3: false,
                loadingLesson: false,
                showLesson: false,
                TimeDate: '',
                options: {
                    shortcuts: [
                        {
                            text: '最近一周',
                            value() {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                return [start, end];
                            }
                        },
                        {
                            text: '最近一个月',
                            value() {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                return [start, end];
                            }
                        },
                        {
                            text: '最近三个月',
                            value() {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                return [start, end];
                            }
                        }
                    ]
                },

                columnsLesson: [
                    {
                        title: '序号',
                        key: 'order'
                    },
                    {
                        title: '视频观看用户数',
                        key: 'userCount',
                        className: 'redColor'
                    },
                    {
                        title: '视频播放次数',
                        key: 'totalCount',
                        className: 'redColor'
                    },
                    {
                        title: '人均播放次数',
                        key: 'averageCount'
                    },
                    {
                        title: '视频完成用户数',
                        key: 'finishedUserCount'
                    },
                    {
                        title: '评论数量',
                        key: 'commentCount'
                    }
                ],
                dataLesson: [{
                    order: '',
                    averageCount: '',
                    commentCount: '',
                    finishedUserCount: '',
                    totalCount: '',
                    userCount: '',
                }],
                dataStudyDays: [{
                    days: '',
                    people: '',
                }],
                dataStudyDays: [],
                dataVipDays: [],

                columnsActivity: [
                    {
                        title: '参与人数',
                        key: 'joinPeople'
                    },
                    {
                        title: '解锁人数',
                        key: 'unlockPeople',
                        className: 'redColor'
                    },
                    {
                        title: '学习人数（去重）',
                        key: 'studyPeople'
                    },
                    {
                        title: '有效参与率',
                        key: 'joinRate'
                    }
                ],
                dataActivity: [
                    {
                        joinPeople: 22,
                        unlockPeople: 18,
                        studyPeople: 16,
                        joinRate: '80%'
                    }
                ]
            };
        },
        mounted() {
            // console.log(this.$refs.mmm);
        },
        methods: {
            ...mapActions('moduleStatistics', ['queryCourseActInfo', 'courseStatistics', 'lessonStatistics', 'courseStudyDays', 'vipAllDays']),
            queryInfo() {
                let datas = {
                    type: this.selectName == 'lessonName' ? 0 : 1,
                    name: this.value1.trim()
                }
                this.queryCourseActInfo(datas).then(res => {
                    if(!res){   // 0 显示课程
                        this.showLesson = true;
                    }else{      // -1 隐藏课程
                        this.showLesson = false;
                    }
                });
            },
            drawLine1(data) {
                // 基于准备好的dom，初始化echarts实例
                let myChart1 = this.$echarts.init(document.getElementById("myChart1"));
                // var base = +new Date(2017, 10, 1);

                var date = [];
                var data1 = [];
                var data2 = [];
                var data3 = [];
                data.forEach((e,i)=>{
                    date.push(e.date);
                    data1.push(e.todayNewCount);
                    data2.push(e.todayUnlockCount);
                    data3.push(e.todayLearnCount);

                })
                let option = {
                    tooltip: {
                        trigger: "axis",
                        position: function(pt) {
                            return [pt[0], "10%"];
                        },
                        axisPointer: {
                            type: "cross"
                        }
                    },
                    legend: {
                        data: ["今日新增参与人数", "今日新增解锁人数", "今日学习人数"]
                    },
                    toolbox: {
                        feature: {
                            dataView: {
                                show: true,
                                readOnly: false
                            },
                            magicType: {
                                show: true,
                                type: ["line", "bar"]
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
                        type: "category",
                        data: date
                    },
                    yAxis: [{
                            type: "value",
                            // name: "今日新增参与人数",
                            min: 0,
                            // max: 250,
                            // interval: 50,
                            // boundaryGap: [0.2, 0.2],
                            axisLabel: {
                                formatter: "{value} "
                            }
                        },
                        {
                            type: "value",
                            // name: "今日新增解锁人数",
                            min: 0,
                            // max: 25,
                            boundaryGap: [0.2, 0.2],
                            // interval: 100,
                            axisLabel: {
                                formatter: "{value} "
                            }
                        }
                    ],
                    dataZoom: [{
                            type: "inside",
                            start: 60,
                            end: 100
                        },
                        {
                            // start: 0,
                            // end: 10,
                            handleIcon: "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
                            handleSize: "80%",
                            handleStyle: {
                                color: "#fff",
                                shadowBlur: 3,
                                shadowColor: "rgba(0, 0, 0, 0.6)",
                                shadowOffsetX: 2,
                                shadowOffsetY: 2
                            }
                        }
                    ],
                    series: [{
                            name: "今日新增参与人数",
                            type: "bar",
                            data: data1
                        },
                        {
                            name: "今日新增解锁人数",
                            type: "bar",
                            data: data2,
                        },
                        {
                            name: "今日学习人数",
                            type: "line",
                            data: data3,
                            yAxisIndex: 1,
                        }
                    ]
                };
    
                // 绘制图表
                myChart1.setOption(option);
            },
            drawLine2(data) {
                // 基于准备好的dom，初始化echarts实例
                let myChart2 = this.$echarts.init(document.getElementById("myChart2"));
                var today = new Date();
                var data1 = [];
                var data2 = [];
                data.forEach((e,i)=>{
                    data1.push(e.days);
                    data2.push(e.people);

                });
                let option = {
                    tooltip: {
                        trigger: "axis",
                        position: function(pt) {
                            return [pt[0], "10%"];
                        },
                        axisPointer: {
                            type: "cross"
                        }
                    },
                    legend: {
                        // data: ["今日新增参与人数", "今日新增解锁人数", "今日学习人数"]
                    },
                    toolbox: {
                        feature: {
                            dataView: {
                                show: true,
                                readOnly: false
                            },
                            magicType: {
                                show: true,
                                type: ["line"]
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
                        type: "category",
                        data: data1
                    },
                    yAxis: [{
                            type: "value",
                            name: "用户数",
                            min: 0,
                            // max: 250,
                            // interval: 50,
                            // boundaryGap: [0.2, 0.2],
                            axisLabel: {
                                formatter: "{value} "
                            }
                        }
                    ],
                    dataZoom: [{
                            type: "inside",
                            start: 60,
                            end: 100
                        },
                        {
                            // start: startDay,
                            // end: 10,
                            handleIcon: "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
                            handleSize: "80%",
                            handleStyle: {
                                color: "#fff",
                                shadowBlur: 3,
                                shadowColor: "rgba(0, 0, 0, 0.6)",
                                shadowOffsetX: 2,
                                shadowOffsetY: 2
                            }
                        }
                    ],
                    series: [{
                            // name: "用户数",
                            type: "bar",
                            data: data2
                        }
                    ],
                    color: ['#1c81e8']
                };
    
                // 绘制图表
                myChart2.setOption(option);
            },
            drawLine3(data) {
                // 基于准备好的dom，初始化echarts实例
                let myChart3 = this.$echarts.init(document.getElementById("myChart3"));
                var today = new Date();
                var data1 = [];
                var data2 = [];
                var data3 = [];
                data.forEach((e,i)=>{
                    data1.push(e.days);
                    data2.push(e.people1);
                    data3.push(e.people2);

                });
                let option = {
                    tooltip: {
                        trigger: "axis",
                        position: function(pt) {
                            return [pt[0], "10%"];
                        },
                        axisPointer: {
                            type: "cross"
                        }
                    },
                    legend: {
                        // data: ["有效累计天数", "领取外教课"]
                    },
                    toolbox: {
                        feature: {
                            dataView: {
                                show: true,
                                readOnly: false
                            },
                            magicType: {
                                show: true,
                                type: ["line"]
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
                        type: "category",
                        data: data1
                    },
                    yAxis: [{
                            type: "value",
                            name: "用户数",
                            min: 0,
                            // max: 250,
                            // interval: 50,
                            // boundaryGap: [0.2, 0.2],
                            axisLabel: {
                                formatter: "{value} "
                            }
                        }
                    ],
                    dataZoom: [{
                            type: "inside",
                            start: 80,
                            end: 100
                        },
                        {
                            handleIcon: "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
                            handleSize: "80%",
                            handleStyle: {
                                color: "#fff",
                                shadowBlur: 3,
                                shadowColor: "rgba(0, 0, 0, 0.6)",
                                shadowOffsetX: 2,
                                shadowOffsetY: 2
                            }
                        }
                    ],
                    series: [{
                            name: "有效累计天数",
                            type: "bar",
                            data: data3
                        },{
                            name: "领取外教课数",
                            type: "bar",
                            barGap: '-100%',
                            data: data2
                        },
                    ],
                    color: ['#c23531','#1c81e8']

                };
    
                // 绘制图表
                myChart3.setOption(option);
            }
        },
        computed: {
            ...mapState('moduleStatistics', ['courseActInfo', 'activityActInfo', 'errInfo'])
        },
        watch: {
            courseActInfo(val, oldVal){
                console.log(val)
                this.loadSpin = true;
                let date = '2018-01-01,'+ utils.formatDate(new Date())
                let datas = {
                    courseId: val._id,
                    date: date
                }
                // console.log(datas)
                
                this.courseStatistics(datas).then(res => {
                    // console.log(res)
                    let data = res.data.data;
                    this.loadingLesson = true;
                    this.loadSpin2 = true;
                    this.loadSpin3 = true;
                    this.loadSpin = false;
                    this.drawLine1(data);
                });
                this.lessonStatistics({courseId: val._id}).then(res => {
                    let data = res.data.data;
                    let arr = [];
                    // console.log(data)
                    data.forEach((e, i) => {
                        arr.push(e);
                    });
                    this.loadingLesson = false;
                    this.dataLesson = arr;
                });
                this.courseStudyDays({courseId: val._id}).then(res => {
                    let data = res.data.data;
                    let arr = [];
                    // console.log(data)
                    data.forEach((e, i) => {
                        arr.push({
                            days: e[0]+'T',
                            people: e[1]
                        });
                    });
                    this.dataStudyDays = arr;
                    this.drawLine2(this.dataStudyDays);
                    this.loadSpin2 = false;
                });
                this.vipAllDays({courseId: val._id}).then(res => {
                    let data = res.data.data;
                    let arr = [];
                    // console.log(data)
                    data.forEach((e, i) => {
                        arr.push({
                            days: e[0]+'T',
                            people1: e[1],
                            people2: e[2],
                        });
                    });
                    this.dataVipDays = arr;
                    this.drawLine3(this.dataVipDays);
                    
                    this.loadSpin3 = false;
                });

            },
            activityActInfo(val, oldVal){
                console.log(val)
            }
        }
    };
</script>

<style lang="scss" scope>
    .pos_r{
        position: relative;
    }
    .main{
        position: relative;
    }
    .echarts {
        height: 300px;
    }
    .queryTop{
        border-bottom: none;
    }
    .queryThird{
        margin-top: 20px;
    }
    .ivu-table th{
        background: #ffffff;
    }
    .tableTop{
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: #eee;
        border: 1px solid #d4d4d4;
        border-bottom: none;
        font-weight: bold;
    }
    thead .redColor{
        color: red;
    }
    .zzt{
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: #fafafa;
        color: red;
        .ivu-col:first-child{
            border-right: 1px solid #e9e9e9;
        }
    }
    .errInfo{
        height: 60px;
        text-align: center;
        line-height: 60px;
        border-top: 1px solid #eeeeee;
        font-size: 14px;
        // font-weight: bold;
    }
</style>

