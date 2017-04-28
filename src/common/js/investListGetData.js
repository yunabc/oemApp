/**
 * Created by Administrator on 2017/4/28.
 */
import axios from 'axios';
let page=2, flag=true, singleNum=6,DataObj={};//合并数据，以及确定范围export？export default
export function getData(url,beforeData,page){
  if(flag){
    axios.get(url).then((res) => {
      let data = res.data;
      if (data.status == 0) {
        if(page === 1){
          DataObj.regularDataHot = data.result[0];
          DataObj.regularData = data.result.slice(1);
          page ++
        }else{
          beforeData?DataObj.regularData = beforeData.concat(data.result):DataObj.regularData=data.result;
        }
        if(data.result.length < singleNum || data.result.length === 0){
          console.log(false)
        }
        return DataObj;
      } else {
        console.log(data.errorMsg)
      }
    }).catch(function (error) {
      console.log(error);
    });
  }
}
