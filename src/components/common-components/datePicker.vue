<template>
  <div class="simpleCalenderArea">
    <label>月份:</label>
    <input class="chooseMonth" type="text" @click="toggleClick" :value="chooseMonth"/>
  <div class="calender" v-if="isHide">
    <div class="canHeader">
      <span class="canBtn prevBtn" @click="prevYear">&lt;</span>
      <span class="curMonth">{{chooseMonth}}</span>
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
        mounted() {
            document.addEventListener('click', (e) => {
               if (!this.$el.contains(e.target)) this.isHide = false
           })
        },

        created(){
            this.isHide = this.$store.state.datePicker
            this.getCurMonth();
            this.getMonths();
        },
        methods:{
            getCurMonth(){
                let today = new Date();
                this.year = today.getFullYear();
                this.month = this.padLeftZero(today.getMonth());/*上个月份*/
                this.chooseMonth = this.year + "." + this.month
            },
            getMonths(){
                this.months = [];
                for(let i=1;i<13;i++){
                    i = this.padLeftZero(i);
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
                document.activeElement.blur();
                this.isHide = !this.isHide;

                // this.$store.dispatch('saveDP',this.isHide);
                // console.log(this.$store.state)
                // this.$emit('datePicker',this.isHide);
            },
            chooseHandle(item){
                this.isHide = false;
                this.chooseMonth = item;
                this.$emit('chooseMonth',this.chooseMonth)
            },
            padLeftZero(str) {
              typeof(str) === 'number' && (str = str + '');
              return ('00' + str).substr(str.length);
            }
        },

    }
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../common/style/commoncolor.less';
  .simpleCalenderArea{
    float: left;
  }
  .chooseMonth {
    display: inline-block;
    font-size: .32rem;
    border: .01333333rem solid @lineGrayColor;
    padding: .13rem;
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
