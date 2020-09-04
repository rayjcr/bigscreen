<template>
  <div class="noumenon">
    <div class="header">
      <div class="datetime">
        <span :text="dateTime.yearDay">{{dateTime.yearDay}}</span>
        <span class="week" :text="dateTime.week">{{dateTime.week}}</span>
        <div id="myclock"></div>
        <!-- <span :text="dateTime.time">{{dateTime.time}}</span> -->
      </div>
      <div class="schoolName"  @click="fullscreen">
        <span :text="schoolBaseInfo.SchoolName">{{schoolBaseInfo.SchoolName}}</span>
      </div>
      <div class="weather">
        <div id="weather-view-he"></div>
      </div>
    </div>
    <div class="content">
      <div class="left">
        <div class="top">
          <div class="title">小水滴排行榜</div>
          <div class="range">
            <span class="rangeItem">全部</span>
            <span class="rangeItem select">近7日</span>
            <div class="sliderBar"></div>
          </div>
          <tableScroll class="tableScroll"></tableScroll>  
        </div>
        <div class="center">
          <div class="title">师生参与度</div>
          <div class="leftCenterBox flex justifySpaceAround">
            <div class="student">
              <div class="value">101,660</div>
              <div class="label">学生</div>
            </div>
            <div class="teacher">
              <div class="value">140,188</div>
              <div class="label">教师</div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="title">班级排行榜</div>
          <div class="range">
            <span class="rangeItem select">全部</span>
            <span class="rangeItem">近7日</span>
            <div class="sliderBar"></div>
          </div>
          <dv-scroll-ranking-board class="rankingScroll" :config="rankConfig" style="height:calc(100% - 50px)" />
        </div>
      </div>
      <div class="middle">
        <div class="top">
          <div class="title">小水滴银行</div>
          <div class="midTopContent">
            <div class="schooltitle">
              <img src="../assets/new/schoolIcon.png" alt="" class="schoolIcon">
              <img src="../assets/new/schoolName.png" alt="" class="schoolName">
            </div>
            <div class="centerBox countBox">
              <div class="label">学生总积分</div>
              <div class="digitalRoll">
                <IOdometer class="iOdometer" format='(,ddd)' :value="studentAllScore" />
              </div>              
            </div>
            <div class="bottomBox flex justifySpaceAround">
              <div class="countBox">
                <div class="label">任务提交总次数</div>
                <div class="digitalRoll orangeRoll">
                  <IOdometer class="iOdometer" format='(,ddd)' :value="taskCommitCount" />
                </div>
                <div class="tip">近7日 <span class="increaseOrange">30次</span></div>
              </div>          
              <div class="countBox">
                <div class="label">商品兑换总次数</div>
                <div class="digitalRoll blueRoll">
                  <IOdometer class="iOdometer" format='(,ddd)' :value="exchangeTimes" />
                </div>
                <div class="tip">近7日 <span class="increaseBlue">30次</span></div>
              </div>          
            </div>

          </div>
        </div>
        <div class="bottom">
          <div class="title">小水滴之星</div>
        </div>
      </div>
      <div class="right">        
        <div class="top">
          <div class="title">小水滴在行动</div>
          <div class="rightTopBox">
            <div class="flex">
              <div class="taskCount countBox">
                <div class="label">任务总数</div>
                <div class="digitalRoll">
                  <IOdometer class="iOdometer" format='(,ddd)' :value="working.taskCount" />
                </div>
              </div> 
              <div class="taskScoreCount countBox">
                <div class="label">任务总积分数</div>
                <div class="digitalRoll">
                  <IOdometer class="iOdometer" format='(,ddd)' :value="working.taskScoreCount" />
                </div>
              </div>                           
            </div>
            <div class="taskChart">
              <div class="label">任务发布分布图</div>
              <dv-conical-column-chart :config="conicalConfig" style="height:120px;width:400px;" />
            </div>
          </div>
        </div>
        <div class="center">
          <div class="title">爆款商品</div>
          <div class="swiper">
            <swiper ref="mySwiper" :options="swiperOptions">
              <swiper-slide v-for="n in 6" :key="n">
                <div class="commodity flex flexColumn alignCenter">
                  <div class="rank">TOP{{n}}</div>
                  <div class="commodityImg">
                    <img src="" alt="">
                  </div>
                  <div class="commodityName">笔记本</div>
                  <div class="exchangeCount">已兑换10</div>
                </div>
              </swiper-slide>
              <!-- <div class="swiper-pagination" slot="pagination"></div> -->
            </swiper>            
          </div>
        </div>
        <div class="bottom">
          <div class="title">七彩少年</div>
          <div class="rightBottomBox flex alignCenter">
            <div class="statistics">
              <div class="qcsnCount">
                <div class="label">
                  七彩少年人数:
                </div>
                <div class="value">
                  150
                </div>
              </div>
              <div class="schoolCount">
                全校学生总数：560
              </div>              
            </div>
            <dv-water-level-pond class="waterChart" :config="waterConfig" style="width:160px;height:160px" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import screenfull from 'screenfull'
import $ from 'jquery';
import _ from 'lodash';
import './util/flipclock';
import {formatDate} from '../utils/formateDate.js';
import './util/jquery.thooClock'
import DigitRoll from '@huoyu/vue-digitroll';
import IOdometer from 'vue-odometer';
import 'odometer/themes/odometer-theme-default.css';

import horizontalBarChart from '../components/horizontalBarChart.vue'
import tableScroll from '../components/tableScroll.vue'
export default {
  name: 'Noumenon',
  components:{
    DigitRoll,
    IOdometer,
    horizontalBarChart,
    tableScroll
  },
  data(){
    return{
      schoolCode:'456',
      weekName: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
      dateTime: {
        time: '',
        yearDay: '',
        week: ''
      },
      countDownClock: null,
      schoolBaseInfo:{
        ClassNum: 0,
        SchoolArea: 0,
        SchoolCode: "456",
        SchoolName: "七彩水滴特色评价",
        StudentNum: 0,
        TeacherNum: 0,
        IsShowTemperature: true,
      },
      nowTime: new Date(),//精确到秒
      interval:{
        update: null,
        checkTime: null,
        timeInterval: null,
      },
      rankConfig:{
          data: [
            {
              name: '周口',
              value: 55
            },
            {
              name: '南阳',
              value: 120
            },
            {
              name: '西峡',
              value: 78
            },
            {
              name: '驻马店',
              value: 66
            },
            {
              name: '新乡',
              value: 80
            },
            {
              name: '信阳',
              value: 45
            },
            {
              name: '漯河',
              value: 29
            }
          ],
          waitTime: 5000,
          carousel: 'page',
      },
      waterConfig:{
        colors: ['#0CE1DA','#0F9FFF'],
        data: [20],
        waveHeight: 10,
        waveNum: 3,
        shape: 'round'
      },
      studentAllScore:100560238,
      taskCommitCount: 22222,
      exchangeTimes: 22222,
      working:{
        taskCount: 256165,
        taskScoreCount: 40056165
      },
      conicalConfig:{
        data: [
          {
            name: '一年级',
            value: 10562
          },
          {
            name: '六年级',
            value: 9185
          },
          {
            name: '三年级',
            value: 8565
          },
          {
            name: '二年级',
            value: 8265
          },
          {
            name: '五年级',
            value: 7053
          },
          {
            name: '四年级',
            value: 2943
          }
        ],
        columnColor: 'rgba(5,209,202,0.5)',
        fontSize:16,
        showValue: true
      },
      swiperOptions:{
        loop: true,
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 19,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination'
        },
      }
    }
  },
  mounted(){
    this.init()
  },
  updated(){
    // 触发resize-->图表的autofix
    const e = document.createEvent('Event')
    e.initEvent('resize', true, true)
    window.dispatchEvent(e)
  },
  methods:{
    // 初始化定时刷新时间
    updateDateTime(){
      var nowTime = new Date(this.nowTime);
      this.dateTime.yearDay = formatDate(nowTime,"yyyy-MM-dd");
      this.dateTime.week = this.weekName[nowTime.getDay()]
    },
    // 设置天气组件
    setWeather(weatherId){
      window.WIDGET = {ID: weatherId};
      (function (d){
        var cs = d.createElement('link');
        cs.rel = 'stylesheet';
        cs.href = "https://apip.weatherdt.com/view/static/js/r.js?v=1111";
        var s = d.createElement('script');
        s.src = "https://apip.weatherdt.com/view/static/js/r.js?v=1111"
        var sn = d.getElementsByTagName('script')[0];
        sn.parentNode.insertBefore(cs, sn);
        sn.parentNode.insertBefore(s, sn);
      })(document);
    },
    // 1秒定时执行函数
    OneSecondFunction(){
        this.updateDate();  
    },
    initClock(){
      var that = this;
      $('#myclock').thooClock({
        size: 160,
        showNumerals: false,
        onEverySecond: function(){
          that.OneSecondFunction();
        }
      });
      // 设置学校名字底下的动画时间
      $('.schoolLine').find('animate').attr('dur','5s')
      // console.log(item,369)
    },
    async init(){
      this.updateDateTime();
      this.$nextTick(()=>{
        this.initClock();
      })
      // this.setWeather('haJXTKwK7H');
      this.setWeather('1rbP9fMRdb');
      setTimeout(()=>{        
        this.taskChartFix();
      },1000)
    },
    // 更新日期
    updateDate(){
      this.nowTime = new Date();
      this.dateTime.time = formatDate(this.nowTime,"hh:mm:ss")
    },
    setClock(time,start=true){
      var that = this;
      var item = $('#countDownClock');
      console.log(item.length,720)
      if(item.length==0){
        return
      }
      if(this.countDownClock){
        if(!this.countDownClock.running){
          this.countDownClock.setTime(time);
          if(start){
            this.countDownClock.start();
          }          
        }
      } else {
        this.$nextTick(()=>{
          this.countDownClock = $('#countDownClock').FlipClock(time, {
            clockFace: 'SecondCounter',
            countdown: true,
            autoStart: false,
            callbacks: {
              stop: function() {//倒计时结束
                that.countDownClock = null
              }
            }
          })
          if(start){
            this.countDownClock.start();
          }                     
        })     
      }

    },
    taskChartFix(){
      var items = $('.taskChart').find('g');
      $.each(items,function(){
        var gTop = $(this).children('path').attr('d');
        gTop = gTop.split('\n');
        gTop = gTop[3].split(',');
        gTop = gTop[1];
        var text = $(this).children('text:eq(1)')
        text.attr('y',gTop);
        console.log(gTop,369)        
      })
    },
    fullscreen(){
      if (screenfull.isEnabled) {
        screenfull.request();
      }
    }
  },
  computed:{
  },
  watch: {
  },
  beforeDestroy(){
    // 关闭所有定时器
    for(var item in this.interval){
      if(this.interval[item]){
        clearInterval(this.interval[item])
      }
    }
  }
}
</script>
<style>
  @import './util/flipclock.css';
  .flip-clock-label{
    display: none;
  }
  .flip-clock-wrapper{
    zoom: 1;
    transform: scale(1.35) translateX(-50%);
    transform-origin: left;
    display: inline-block;
    margin-top: 60px;
    position: relative;
    left: 50%;
  }
  .flip-clock-wrapper ul li a div div.inn{
    background-color: #0517a3;
  }
  .flip-clock-dot{
    background-color: #fff;
  }
</style>
<style lang="scss" scoped>
  @mixin cubeNormal{
    margin: 0 12px;
    padding: 10px;
    color: #fff;
    // border: 1px solid #8e9ba3;
    // 同样的背景图
    background-image: url('../assets/new/cubeBorder.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .title{
      margin-left: 16px;
      margin-top: 10px;
      font-size:24px;
      font-family:Microsoft YaHei;
      font-weight:bold;
      color:rgba(218,246,255,1);
    }
  }

  @mixin fontColorGradient($fromColor,$toColor,$direction){
    color: $fromColor;
    position: relative;
    &::after{
      content: attr(text);
      position: absolute;
      left: 0;
      top: 0;
      color: $toColor;
      -webkit-mask:linear-gradient($direction, $toColor, transparent );
      -webkit-user-select: none;
    }
  } 

// 解决谷歌浏览器在渲染动画时的抖动问题
  @mixin transitionHelper {
    -webkit-backface-visibility: hidden;
    -webkit-transform-style: preserve-3d;
  }

  .flex{
    display: flex;
  }
  .flexColumn{
    flex-direction: column;
  }
  .justifySpaceAround{
    justify-content: space-around;
  }
  .alignCenter{
    align-items: center;
  }
  .noumenon{
    background: url(../assets/new/bg@2x.png) no-repeat;
    background-size: 100% 100%;
    position: relative;
    height: 1080px;
    // min-height: 1080px;
    width: 1920px;
    overflow: hidden;
    overflow-y: auto;
    // width: 100%;
  }
  .header{
    height: 103px;
    padding-top: 22px;
    // margin-bottom: 22px;
    .datetime{
      display: inline-block;
      position: absolute;
      left: 30px;
      top: 40px;
      span{
        font-size: 24px;
        @include fontColorGradient(#00aeff,#bfddff,to bottom);
      }
      .week{
        background-image: url('../assets/headerSmall.png');
        background-repeat: no-repeat;
        background-position: 9px 6px;
        background-size: auto 24px;
        margin-right: 15px;
        padding-left: 60px;
        &::after{
          left: 60px;
          width: 100%;
        }
      }
      #myclock{
        position: absolute;
        right: -140px;
        top: -70px;
        transform: scale(0.5);
      }
    }
    .schoolName{
      height: 50px;
      padding: 20px 40px;
      line-height: 50px;
      font-weight: normal;   
      background: url('../assets/titlebg.png') no-repeat;
      background-size: 100% 100%;
      position: absolute;
      left: 50%;
      transform: translate(-50%,0);
      span{
        display: inline-block;
        min-width: 370px;
        font-size: 42px;
        text-align: center;
        @include fontColorGradient(#00aeff,#bfddff,to bottom);
        &::after{
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
        }
      } 
      &::before{
        position: absolute;
        height: 79px;
        width: 716px;
        transform: translate(-51%, -16px);
        content: '';
        background: url('../assets/headerTitleLeft.png') no-repeat;
        background-size: contain;
      }
      &::after{
        position: absolute;
        height: 79px;
        width: 395px;
        transform: translate(12%, -16px);
        content: '';
        background: url('../assets/headerTitleRight.png') no-repeat;
        background-size: contain;
      }
    }
    .headerBorder{
      .schoolLine{
        position: absolute;
        height: 40px;
        width: 50%;
        top: 105px;
        left: 50%;
        transform: translateX(-50%);
      }  
      .leftBorder{
        width: 495px;
        height: 15px;
        position: absolute;
        left: 25px;
        top: 125px;
      }   
      .rightBorder{
        width: 495px;
        height: 15px;
        position: absolute;
        right: 25px;
        top: 125px;
      }  
    }

    .weather{
      position: absolute;
      right: -80px;
      top: 0px;
      /deep/ .wv-v-v-now,
      /deep/ .wv-v-v-location,
      /deep/ .wv-v-v-copyright,
      /deep/ .wv-cr-h-copyright,
      /deep/ .wv-lt-refresh,
      /deep/ .wv-lt-location,
      /deep/ .wv-nb-now-base,
      /deep/ .wv-n-h-now-rain{
        display: none;
      }
      /deep/ #weather-view-he{
        background-color: transparent!important;
        background-image: none!important;
        height: 120px!important;
        width: 500px!important;
      }
      /deep/ .wv-v-h-now{
        padding: 1.58em .65em 0;
      }
      /deep/ .wv-v-h-col-left{
        width: 36.561%!important;
      } 
      /deep/ .wv-v-h-col-middle{
        margin-right: 15px;
        margin-left: -15px;
      }
    }
  }
  .content{
    padding: 0px 19px;
    display: flex;
    overflow: hidden;
    height: calc(100% - 135px);
    .top,.center,.bottom{
      @include cubeNormal;      
    }
    .left{
      height: 100%;
      flex: 0.3;
      .top{
        height: calc(40% - 40px);
        margin-bottom: 20px;
        position: relative;
        .tableScroll{
          margin: 17px 33px 0px 15px;
        }
      }
      .center{
        height: calc(26% - 40px);
        margin-bottom: 20px;
        .leftCenterBox{
          height: calc(100% - 50px);
          align-items: baseline;
          margin-top: 20px;
          .student{
            position: relative;
            height: 118px;
            width: 128px;
            background-image: url(../assets/new/student.png);
            background-repeat: no-repeat;
            background-size: 100% auto;
            background-position: 0 0;
            .value{
              position: absolute;
              top: -25px;
              left: 50%;
              transform: translateX(-50%);
              font-size:18px;
              font-family:Microsoft YaHei;
              font-weight:400;
              color:rgba(255,255,255,1);
            }
            .label{
              position: absolute;
              top: 36px;
              left: 50%;
              transform: translateX(-50%);
              text-align: center;
              font-size:18px;
              font-family:Microsoft YaHei;
              font-weight:400;
              color:rgba(31,197,222,1);
            }
          }
          .teacher{
            position: relative;
            height: 138px;
            width: 128px;
            background-image: url(../assets/new/teacher.png);
            background-repeat: no-repeat;
            background-size: 100% auto;
            background-position: 0 0;
            .value{
              position: absolute;
              top: -25px;
              left: 50%;
              transform: translateX(-50%);
              font-size:18px;
              font-family:Microsoft YaHei;
              font-weight:400;
              color:rgba(255,255,255,1);
            }
            .label{
              position: absolute;
              top: 56px;
              left: 50%;
              transform: translateX(-50%);
              text-align: center;
              font-size:18px;
              font-family:Microsoft YaHei;
              font-weight:400;
              color:rgba(164,134,255,1);
            }
          }
        
        }
      }
      .bottom{
        height: calc(34% - 40px);
        position: relative;
        .rankingScroll{
          width: calc(100% - 50px);
          margin: 20px 34px 8px 17px;
        }
        /deep/ .rank{
          color: #05D1CA;
        }
        /deep/ .ranking-column{
          border-width: 1px;
          border-color: #04D0C9;
        }
        /deep/ .inside-column{
          background-color: #04D0C9;
          border-radius: 3px;
        }
      }
    }
    .middle{
      height: 100%;
      flex: 0.4;
      // .top,.bottom{
      //   height: calc(50% - 35px);
      // }
      .bottom{
        height: calc(45% - 35px);
      }
      .top{
        margin-bottom: 20px;
        height: calc(53% - 40px);
        background-image: url(../assets/new/midbg.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: 0 0;
        position: relative;
        .title{
          margin-top: 18px;
          margin-left: 30px;
        }
        .midTopContent{
          .schooltitle{
            position: absolute;
            right: 39px;
            top: 29px;
            .schoolIcon{
              height: 36px;
              width: 29px;
              margin-right: 10px;
            }
            .schoolName{
              height: 24px;
              width: 210px;
            }
          }
          .centerBox{
            margin-top: 34px;
            .label{
              text-align: center;
              font-size:40px;
              font-family:FZLanTingHei-B-GBK;
              font-weight:bold;
              color:rgba(255,255,255,1);
              line-height: 55px;
              position: relative;
              &::before{
                content: '';
                height: 55px;
                width: 64px;
                background-image: url(../assets/new/arrow3.png);
                background-repeat: no-repeat;
                background-size: 100% auto;
                background-position: 0 0;
                position: absolute;
                left: 70px;
              }
              &::after{
                content: '';
                height: 55px;
                width: 64px;
                background-image: url(../assets/new/arrow3.png);
                background-repeat: no-repeat;
                background-size: 100% auto;
                background-position: 0 0;
                position: absolute;
                right: 70px;
                transform: rotate(180deg);
              }
            }
            .digitalRoll{
              font-size:89px;
              font-family:DIN;
              font-weight:bold;
              color:#F1E357;
              text-align: center;
            }
          }
          .bottomBox{  
            .label{
              margin-bottom: 19px;
            }
            .digitalRoll{
              font-size:48px;
              font-family:DIN;
              font-weight:bold;
              color:rgba(255,211,0,1);
              text-align: center;
              /deep/ .odometer-digit{
                line-height: 80px;
                width: 50px;
                margin-right: 10px;
                background-image: url(../assets/new/counterBg.png);
                background-repeat: no-repeat;
                background-size: 100% auto;
                background-position: 0 0;
              }
              &.orangeRoll{
                color: #F29718;
              }
              &.blueRoll{
                color: #06D2CA;
              }
            }
            .tip{
              text-align: center;
              font-size:20px;
              font-weight:400;
              color:rgba(218,246,255,1);
              .increaseOrange{
                color:#F29718;
                &::before{
                  content: '';
                  height: 12px;
                  width: 21px;
                  background-image: url(../assets/new/upOrange.png);
                  background-repeat: no-repeat;
                  background-size: 100% auto;
                  background-position: 0 0;
                  position: relative;
                  display: inline-block;
                  margin-right: 7px;
                }
              }
              .increaseYellow{
                color:rgba(255,211,0,1);
                &::before{
                  content: '';
                  height: 12px;
                  width: 21px;
                  background-image: url(../assets/new/upYellow.png);
                  background-repeat: no-repeat;
                  background-size: 100% auto;
                  background-position: 0 0;
                  position: relative;
                  display: inline-block;
                  margin-right: 7px;
                }
              }
              .increaseBlue{
                color:rgba(6,210,202,1);
                &::before{
                  content: '';
                  height: 12px;
                  width: 21px;
                  background-image: url(../assets/new/upBlue.png);
                  background-repeat: no-repeat;
                  background-size: 100% auto;
                  background-position: 0 0;
                  position: relative;
                  display: inline-block;
                  margin-right: 7px;
                }
              }
            }
          }
        }
        
      }
    }
    .right{
      height: 100%;
      flex: 0.3;
      .top{
        margin-bottom: 20px;
        height: calc(40% - 40px);
        .title{
          margin-top: 10px;
          margin-left: 16px;
        }
        .rightTopBox{
          margin-left: 16px;
          margin-top: 20px;
          .countBox{
            padding: 15px 29px;
            min-width: 120px;
            background:rgba(8,52,142,1);
            .label{
              text-align: left;
              font-size:16px;
              font-family:Microsoft YaHei;
              font-weight:400;
              color:rgba(255,255,255,1);
            }
            .digitalRoll{
              font-size:24px;
              font-family:DIN;
              font-weight:bold;
              color:rgba(0,230,217,1);
              text-align: left;
            }
          }
          .taskCount{
            border-radius:40px 40px 4px 40px;
          }
          .taskScoreCount{
            margin-left: 30px;
            border-radius:4px 40px 40px 40px;
          }
          .taskChart{
            font-size:20px;
            font-family:Microsoft YaHei;
            font-weight:bold;
            color:rgba(218,246,255,1);
            margin-top: 23px;
          }
        }
      }
      .center{
        margin-bottom: 20px;
        height: calc(32% - 40px);
        .swiper{
          margin-left: 16px;
          width: 460px;
          overflow: hidden;
          margin-top: 5px;
          .commodity{
            width: 140px;
            height: 203px;
            .rank{
              font-size:18px;
              font-family:Microsoft YaHei;
              font-weight:bold;
              color:rgba(242,151,24,1);
              text-align: center;
            }
            .commodityImg{
              margin-top: 15px;
              position: relative;
              height: 100px;
              width: 100%;
              background-image: url(../assets/new/commoditybg.png);
              background-repeat: no-repeat;
              background-size: 100% auto;
              img{
                height: 70px;
                width: 110px;
                border-radius:4px;
                background-color: #ccc;    
                display: block;
                position: relative;
                top: 10px;
                left: 10px;
              }
              
            }
            .commodityName{
              margin-top: 10px;
              font-size:18px;
              font-family:Microsoft YaHei;
              font-weight:400;
              color:rgba(255,255,255,1);
              text-align: center;
            }
            .exchangeCount{
              margin-top: 10px;
              text-align: center;
              font-size:16px;
              font-family:Microsoft YaHei;
              font-weight:400;
              color:rgba(255,255,255,1);
              line-height: 30px;
              padding: 0 20px;
              border-radius: 15px;
              background:rgba(8,52,142,1);
              display: inline-block;
            }
          }
        }
      }
      .bottom{
        height: calc(26% - 20px);
        .rightBottomBox{
          height: 160px;
          margin-left: 15px;
          .statistics{
            height: 136px;
            width: 200px;
            margin-right: 60px;
            text-align: center;
            .qcsnCount{
              .label{
                font-size:20px;
                font-family:Microsoft YaHei;
                font-weight:400;
                color:rgba(218,246,255,1);
                &::before{
                  content: '';
                  width: 47px;
                  height: 40px;
                  display: inline-block;
                  position: relative;
                  top: 12px;
                  margin-right: 10px;
                  background-image: url(../assets/new/qcsn.png);
                  background-repeat: no-repeat;
                  background-size: 100% auto;
                }
              }
              .value{
                font-size:36px;
                font-family:DIN;
                font-weight:bold;
                color:rgba(5,209,202,1);
                margin-top: 20px;
                text-align: center;
              }
            }
            .schoolCount{
              font-size:16px;
              font-family:Microsoft YaHei;
              font-weight:400;
              color:rgba(255,255,255,1);
              padding: 0 20px;
              display: inline-block;
              border-radius: 15px;
              line-height: 30px;
              margin-top: 19px;
              background-color: #08348E;
            }
          }
          .waterChart{
            
          }
        }
      }
    }
  }
  
  .range{
    position: absolute;
    top: 20px;
    right: 43px;
    width: 120px;
    height: 26px;
    font-size:16px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(218,246,255,1);
    background-color: #08348E;
    border-radius: 13px;
    .sliderBar{
      background-color: #057FF6;
      height: 100%;
      width: 60px;
      border-radius: 13px;
      position: relative;
      display: inline-block;
      top: 0;
      left: 0;
      transition: left 0.3s;
      z-index: 0;
    }
    .rangeItem{
      width: 60px;
      line-height: 26px;
      z-index: 1;
      display: inline-block;
      position: absolute;
      text-align: center;
      top: 0;
      &:nth-child(1){
        left: 0;
      }
      &:nth-child(2){
        right: 0;
        &.select+.slideBar{
          left: 50%;
        }
      }
    }
  }
  .countBox{
    .label{
      text-align: center;
      font-size:24px;
      font-family:Microsoft YaHei;
      font-weight:400;
      color:rgba(218,246,255,1);
    }
    .digitalRoll{
      font-size:48px;
      font-family:DIN;
      font-weight:bold;
      text-align: center;
    }
  }
</style>