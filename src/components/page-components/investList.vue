<template>
  <div ref="listWrapper" class="list-wrapper  list-wrapper-hook">
    <ul class="productList list-content  list-content-hook" ref="listContent">
      <li class="productItem" v-for="item in dataList">
        <div class="itemTitle">360金融·{{item.proName}}</div>
        <div class="itemInfo">
          <div class="profit">
            <p class="profitNum">{{item.proRate}}%</p>
            <p>预期年化利率</p>
          </div>
          <div class="verticalLine"></div>
          <div class="times">
            <p><span class="timesDay">{{item.proDayLimit}}</span>天</p>
            <p>期限</p>
          </div>
          <div @click="checkInfo(item.url)" class="buyBtn">立即购买</div>
        </div>
      </li>
    </ul>
    <loading :flag="flag"></loading>

  </div>
</template>
<style lang="less" rel="stylesheet/less">
  @import '../../common/style/commoncolor.less';
  .productList {
    padding: 0 .26666667rem 1px;
    .productItem {
      margin-bottom: .26666667rem;
      padding: .4rem;
      border-radius: .2rem;
      background-color: #fff;
      color: #666666;
      font-size: .26666667rem;
      
      .itemTitle {
        font-size: .32rem;
        line-height: .32rem;
        margin-bottom: .34666667rem /* 26px */;
        color: #333333;
        font-weight: bold;
      }
      .itemInfo {
        display: flex;
        line-height: 1.5;
        justify-content: space-between;
        .profit {
          .profitNum {
            font-size: .48rem;
            color: red;
            line-height: .56rem /* 42px */;
          }
        }
        .times {
          text-align: center;
          .timesDay {
            font-size: .37333333rem;
            color: @color;
            line-height: .50666667rem;
          }
        }
        .buyBtn {
          width: 2.4rem /* 180px */;
          height: .64rem;
          background-color: @color;
          color: #fff;
          text-align: center;
          line-height: .64rem;
          border-radius: .32rem;
        }
      }

    }

  }
</style>
<script>
  import axios from 'axios';
  import BScroll from 'better-scroll';
  import loading from 'components/common-components/loading';

  export default{
    data () {
      return {
        dataList:[],
        flag:true,
        page:1,
        singleNum:5,//每页默认5条数据
        promiseObj:{},
      };
    },
    props: {
      oldObj:{
          type:Object
      },
      userInfo: Object,
      investurl: String,
      navH: Number,
    },
    components:{
        loading
    },
    created(){

      this.promiseObj=this._getData(this.oldObj);
    },
    mounted(){
      this.$nextTick(() => {
        // 代码保证 this.$el 在 document 中
        let wrapper = this.$refs.listWrapper
        let offTop = wrapper.offsetTop;
        // let winH = window.offsetHeight;
        wrapper.style.top = offTop + "px";
        wrapper.style.bottom = 1.30666667+ "rem";

        this.promiseObj.then((res) =>{
          console.log(12)
          this._initScroll();

        })
      });
    },
    methods: {
      _initScroll() {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.listWrapper, {
            probeType: 1,
            click: true
          });
          this.scroll.on('touchend', (pos) => {

            //条件判断有误,第一次移动不了
            let listContent = this.$refs.listContent.offsetHeight;
            let listWrapper = this.$refs.listWrapper.offsetHeight;
            // let contentH = listContent.offsetHeight;
            let screenH = listWrapper.clientHeight;
            console.log(screenH);
            // let scrollTop = Number(listContent.style.transform.replace(/[^\d\.px]/g, '').split('px')[1]);
            console.log(listContent,listWrapper , pos.y);
            if ( listContent- listWrapper + pos.y < -100) {
              console.log(2);
            //   console.log(-pos.y, contentH, screenH + scrollTop - 50);
                this._getData()
            //       page:this.page,
            //       flag:this.flag,
            //       dataList:this.dataList,
            //       url:this.url
            //     });
            //     this.scroll.refresh();

            }

          })
        } else {
          // 未取到数据,所以不能滚动
          this.scroll.refresh();
        }
      },
      _getData(obj){
        this.page = obj.page || 1;
        this.flag = obj.flag || true;
        this.url = obj.isCurrent?"../../../static/currentInvest.json":"../../../static/regularInvest.json"
        this.dataList = obj.dataList || [];

        if (this.flag) {
         return new Promise((resolve) =>{
          console.log(this);
           axios.get(this.url).then((res) => {
            let data = res.data;
            if (data.status == 0) {
              if (this.page === 1) {
                this.dataList = data.result.slice(1);
                this.page++
              } else {
                this.dataList = this.dataList.concat(data.result)
              }
              if (data.result.length < this.singleNum || data.result.length === 0) {
                this.flag = false
              }
              this.$root.$emit('passObj', {
                page:this.page,
                flag:this.flag,
                dataList:this.dataList
              });
              console.log(11);
            } else {
              console.log(data.errorMsg)
            }
            resolve(res);
          }).catch(function (error) {
            console.log(error);
          });
         })
          
        }
      },
      checkInfo(url) {
        if(this.userInfo.userId && this.userInfo.userId !=''){
          location.href = url;
        }else{
          this.$router.push({path:"/login",query:{topage:this.investurl}});
        }
      },

    }
  };

</script>
