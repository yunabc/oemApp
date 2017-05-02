/**
 * Created by Administrator on 2017/4/28.
 */
import axios from 'axios';
let initObj = {
  page:2,
  flag:true,
  singleNum:6
};
let dataObj={};//合并数据，以及确定范围export？export default
export function getData(passObj){
  let obj = Object.assign({},initObj,passObj);
  console.log("getDataFunction");
  if(obj.flag){
    axios.get(obj.url).then((res) => {
      console.log("axios")
      let data = res.data;
      if (data.status == 0) {
        if(obj.page === 1){
          dataObj.regularDataHot = data.result[0];
          dataObj.regularData = data.result.slice(1);
          dataObj.page = obj.page ++
        }else{
          beforeData?dataObj.regularData = beforeData.concat(data.result):dataObj.regularData=data.result;
        }
        if(data.result.length < obj.singleNum || data.result.length === 0){
          dataObj.flag = false
        }
        console.log(dataObj);
        return dataObj;
      } else {
        console.log(data.errorMsg)
      }
    }).catch(function (error) {
      console.log(error);
    });
  }
}
