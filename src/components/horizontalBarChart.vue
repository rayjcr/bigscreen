<template>
  <div id="horizontalBarChart"></div>
</template>

<script>
  import { Chart, registerAnimation } from '@antv/g2';
  export default{
    name: 'horizontalBarChart',
    data(){
      return {
        chart: null,
        originData: [
          { studenName: '王明明', className:'三年级（3）班', score: 18203 },
          { studenName: '王明', className:'三年级（4）班', score: 23489 },
          { studenName: '王敏敏', className:'三年级（5）班', score: 29034 },
          { studenName: '张敏敏', className:'三年级（6）班', score: 104970 },
          { studenName: '王时', className:'四年级（5）班', score: 131744 }, { studenName: '王明明1', className:'三年级（3）班', score: 18203 },
          { studenName: '王明1', className:'三年级（4）班', score: 23489 },
          { studenName: '王敏敏1', className:'三年级（5）班', score: 29034 },
          { studenName: '张敏敏1', className:'三年级（6）班', score: 104970 },
          { studenName: '王时1', className:'四年级（5）班', score: 131744 },
        ],
        chartData:[],
        sliceFirst: false,
      }
    },
    mounted() {
      this.chartData = this.originData.slice(0,5);
      this.initChart();
      setInterval(()=>{
        this.chartDataChange()
      },5000)
    },
    methods:{
      chartDataChange(){
        this.sliceFirst = !this.sliceFirst;
        if(this.sliceFirst){
          this.chartData = this.originData.slice(5);
        } else {
          this.chartData = this.originData.slice(0,5);
        }
        this.chart.changeData(this.chartData);
      },
      initChart(){
        // 注册一个动画
        registerAnimation('label-update', (element, animateCfg, cfg) => {
          console.log(element,animateCfg,cfg,34)
          const startX = element.attr('x');
          const startY = element.attr('y');
          console.log(startX,startY,36)
        //   // @ts-ignore
        //   const finalX = cfg.toAttrs.x;
        //   // @ts-ignore
        //   const finalY = cfg.toAttrs.y;
        //   const labelContent = element.attr('text');
        //   // @ts-ignore
        //   const finalContent = cfg.toAttrs.text;
        
        //   const distanceX = finalX - startX;
        //   const distanceY = finalY - startY;
        //   const numberDiff = +finalContent - +labelContent;
        
        //   element.animate((ratio) => {
        //     const positionX = startX + distanceX * ratio;
        //     const positionY = startY + distanceY * ratio;
        //     const text = (+labelContent + numberDiff * ratio).toFixed(0);
        
        //     return {
        //       x: positionX,
        //       y: positionY,
        //       text,
        //     };
        //   }, animateCfg);
        
        
        });
        
        const chart = new Chart({
          container: 'horizontalBarChart',
          autoFit: true,
          height: 200,
          width: 420
        });
        
        chart.data(this.chartData);
        chart.scale('score', { nice: true });
        chart.coordinate().transpose();
        chart.tooltip({
          showMarkers: false
        });
        chart.interaction('active-region');
        chart
          .interval()
          .animate({
            appear:{
              animation: 'position-update',
              duration: 1000,
              easing: 'easeLinear'
            }
          })
          .position('studenName*score')
          .label('studenName',{
            position: 'left',
            offset: 180,
            content: (data) => {
              return data.studenName + data.className + data.score + '分';
            },
            style: {
              fill: '#fff'
            }
          })
          // .label('score',{            
          //   animate:{
          //     update: {
          //       animation: 'label-update',
          //       duration: 1000,
          //       easing: 'easeLinear'
          //     }
          //   },
          //   style: {
          //     fill: '#fff'
          //   }
          // })
        chart.axis(false)
        chart.render();
        this.chart = chart;
      }
    }
  }
</script>

<style scoped>
  #horizontalBarChart{
    display: inline-block;
  }
</style>
