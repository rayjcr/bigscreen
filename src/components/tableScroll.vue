<template>
    <div class="tableScroll">
        <dv-scroll-board :config="config" style="width:100%;height:calc(100% - 50px)" />
    </div>
</template>

<script>
export default {
    name: 'tableScroll',
    data(){
        return {
            config:{
                header: ['排名', '姓名/班级', '水滴数'],
                data: [
                    ['<span class="rank1"></span>', '行1列2', '行1列3'],
                    ['行2列1', '行2列2', '行2列3'],
                    ['行3列1', '行3列2', '行3列3'],
                    ['行4列1', '行4列2', '行4列3'],
                    ['行5列1', '行5列2', '行5列3'],
                    ['行6列1', '行6列2', '行6列3'],
                    ['行7列1', '行7列2', '行7列3'],
                    ['行8列1', '行8列2', '行8列3'],
                    ['行9列1', '行9列2', '行9列3'],
                    ['行10列1', '行10列2', '行10列3']
                ],
                headerBGC: 'rgba(0,160,233,0.1)',
                oddRowBGC: 'rgba(0,0,0,0)',
                evenRowBGC: 'rgba(0,0,0,0)',
                headerHeight: 40,
                columnWidth: [60,230,80],
                rowNum: 5,
                align: 'center',
                carousel: 'page',
                waitTime: 10000
            },
            tableData:[
                { studenName: '王明明', className:'三年级（3）班', score: 18203 },
                { studenName: '王明', className:'三年级（4）班', score: 23489 },
                { studenName: '王敏敏', className:'三年级（5）班', score: 29034 },
                { studenName: '张敏敏', className:'三年级（6）班', score: 104970 },
                { studenName: '王时', className:'四年级（5）班', score: 131744 }, { studenName: '王明明1', className:'三年级（3）班', score: 18203 },
                { studenName: '王明1', className:'三年级（4）班', score: 23489 },
                { studenName: '王敏敏1', className:'三年级（5）班', score: 29034 },
                { studenName: '张敏敏1', className:'三年级（6）班', score: 104970 },
                { studenName: '王时1', className:'四年级（5）班', score: 131744 },
            ]
        }
    },
    mounted(){
        this.setData();
    },
    methods:{
        setData(){
            var res = [];
            this.tableData.forEach((e,ind)=>{
                var arr = [];
                if(ind<3){
                    arr.push(`<span class="rank${ind+1}"></span>`)
                } else {
                    arr.push(`<span class="rank">${ind+1}</span>`)
                }
                arr.push(`${e.studenName}-${e.className}`);
                arr.push(e.score)
                res.push(arr);
            })
            this.config.data = res;
        }
    }
}
</script>

<style lang="scss" scoped>
    @mixin rankTop3 {
        display: inline-block;
        height: 31px;
        width: 24px;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: 0 0;
        margin-left: 3px;  
        margin-top: 10px;
    }
.tableScroll{
    height: 100%;
}
/deep/ .header{
    color: #00A0E9;
}
/deep/ .row-item:nth-child(n+6){
  box-sizing: border-box;
  border-bottom: 2px dashed #022E60;
}
/deep/ .rank1{
    @include rankTop3;
    background-image: url('../assets/no1.png');
}
/deep/ .rank2{
    @include rankTop3;
    background-image: url('../assets/no2.png');
}
/deep/ .rank3{
    @include rankTop3;
    background-image: url('../assets/no3.png');
}
/deep/ .rank{
    height: 24px;
    width: 24px;
    border-radius: 50%;
    border: 3px solid rgba(0,0,0,0.5);
    background-color: rgba(0,160,233,0.5);
    font-size:15px;
    font-family:Microsoft YaHei;
    font-weight:bold;
    color:rgba(255,255,255,1);
    line-height:24px;
    text-align: center;
    display: inline-block;
}
</style>