<template>
  <div ref="listWrapper" class="list-wrapper  list-wrapper-hook">
    <ul class="productList list-content  list-content-hook" ref="listContent">
      <li class="productItem" v-for="item in dataList2" :data-id="item.proId">
        <div class="itemTitle">360金融·{{item.proName}}</div>
        <div class="itemInfo">
          <div class="profit">
            <p class="profitNum">{{item.proRate}}%</p>
            <p v-if="isH">{{item.proRateTips}}</p>
            <p v-else>{{item.rateTips}}</p>
          </div>
          <div class="verticalLine"></div>
          <div class="times" v-if="isH">
            <p><span class="timesDay">{{item.proProspectiveEarn}}</span></p>
            <p>{{item.proProspectiveEarnStart}}</p>
          </div>
          <div class="times" v-else>
            <p><span class="timesDay">{{item.proDayLimit}}</span>天</p>
            <p>期限</p>
          </div>

          <div class="buyBtn" v-tap="{methods:checkInfo}">立即购买</div>
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
  import qs from 'qs';
  import BScroll from 'better-scroll';
  import loading from 'components/common-components/loading';

  export default{
    data () {
      return {
          singleNum:5,//每页默认5条数据
          dataList2:[],
          page2:0,
          _flag:false,
      };
    },
    props: {
      flag:Boolean,
      url:String,
      dataList:Array,
      page:Number,
      loadDone: Boolean,
      promiseObj: Promise,
      isH:Boolean
    },

    components:{
        loading
    },
    created() {
      this._flag = this.flag;
      console.log()
    },
    mounted(){
      this.promiseObj.then((res) =>{
        this.dataList2 = this.dataList;
        console.log(this.dataList2);
        this.page2=this.page;
        
        console.log(12)
        this.$nextTick(() => {
          let wrapper = this.$refs.listWrapper
          let offTopParent = wrapper.parentNode;
          let offHei = offTopParent.offsetHeight;
          let offTop = offTopParent.offsetTop;
          
          
          // console.log(offTopThis,docH,offTopParent,docW)
          // wrapper.style.top = offTop + "px";(docH-offTopThis-offTopParent)/75 -1.30666667
          wrapper.style.top = offTop + offHei+ "px";
          wrapper.style.bottom = 1.30666667+ "rem";
          this._initScroll();
        })
      })
    },
    methods: {
      _initScroll() {
          this.scroll = new BScroll(this.$refs.listWrapper, {
            probeType: 1,
            click: true
          });
           console.log(13)
          this.scroll.on('touchend', (pos) => {
            //条件判断有误,第一次移动不了
            console.log(pos)
            let listContent = this.$refs.listContent.offsetHeight;
            let listWrapper = this.$refs.listWrapper.offsetHeight;
            console.log(listContent,listWrapper,pos.y)
            if ( listContent- listWrapper + pos.y < -100) {
              console.log(1111);
                this._getData()
            }
          })

      },
      _getData(){
        if (this._flag) {
          axios.post(this.url,qs.stringify({page:this.page2})).then((res) => {
            let data = res.data;
            if (data.status == 0) {
              this.dataList2 = this.dataList2.concat(data.result);
              this.page2++;
              if (data.result.length < this.singleNum || data.result.length === 0) {
                this._flag = false
              }
              this.$root.$emit('passObj', {
                page:this.page,
                _flag:this._flag,
                dataList:this.dataList2
              });
              this.$nextTick(() => {
                this.scroll.refresh();
              })
            } else {
              console.log(data.errorMsg)
            }
          }).catch(function (error) {
            console.log(error);
          });
        }
      },
      checkInfo(url) {
        if(this.userInfo && this.userInfo['userId'] !=''){
          location.href = url;
        }else{
          this.$router.push({path:"/login",query:{topage:this.$route.name}});
        }
      }

    }
  };

</script>
