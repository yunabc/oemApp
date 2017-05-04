<template>
  <div class="simpleCalenderArea">
    <label>月份:</label>
    <span class="chooseMonth" type="text" @click="toggleClick">{{chooseMonth}}</span>
  <div class="calender" v-if="isHide">
    <div class="canHeader">
      <span class="canBtn prevBtn" @click="prevYear">&lt;</span>
      <span class="curMonth">{{year}}.{{month}}</span>
      <span class="canBtn nextBtn" @click="nextYear">&gt;</span>
    </div>
    <ul class="canBody">
      <li class="monthItem" v-for="item in months" @click="chooseHandle(item)">{{item}}</li>
    </ul>
  </div>
  </div>
</template>

<script>
    export default {
        data () {
            return {
                year:0,
                month:0,
                months:[],
                isHide:false,
                chooseMonth:''
            }
        },
        created(){
            this.getCurMonth();
            this.getMonths();
        },
        methods:{
            getCurMonth(){
                let today = new Date();
                this.year = today.getFullYear();
                this.month = today.getMonth();/*上个月份*/
                this.chooseMonth = this.year + "." + this.month
            },
            getMonths(){
                this.months = [];
                for(let i=1;i<13;i++){
                    this.months.push(this.year + "." + i)
                }
            },
            prevYear(){
                this.year --;
                this.getMonths()
            },
            nextYear(){
              this.year ++;
              this.getMonths()
            },
            toggleClick(){
                this.isHide = !this.isHide
            },
            chooseHandle(item){
                this.isHide = false;
                this.chooseMonth = item
            }


        }
    }
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../common/style/commoncolor.less';
  .simpleCalenderArea{
    width: 5rem;
  }
  .chooseMonth {
    display: inline-block;
    font-size: .32rem;
    border: .01333333rem solid @lineGrayColor;
    padding: .06666667rem;
    margin-left: .4rem;
    width: 2rem;
  }
  .calender{
     width: 3rem;
     box-shadow: 0.02666666666666667rem 0.02666666666666667rem 0.10666666666666667rem 0.02666666666666667rem @backGrayColor;
     font-size: 0.32rem;
     text-align: center;
     line-height: 0.6666666666666666rem;
     margin:0.2rem 0 0 .6rem;
     position: absolute;
     background-color: #fff;
     .canHeader{
         padding: 0 0.26666666666666666rem;
         height: 0.6666666666666666rem;
         text-align: center;
         background-color: @backGrayColor;
         font-weight: bold;
         display: flex;
         .canBtn{
             width: 0.26666666666666666rem;
             height: 0.6666666666666666rem;
             cursor: pointer;
        }
         .curMonth{
             flex:1;
        }
    }
     .canBody{
         .monthItem{
             &:active{
                 background-color: @backGrayColor;
            }
        }
    }
}
 

</style>
