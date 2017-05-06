/**
 * Created by Administrator on 2017/2/10.
 */
// src/store/mutations.js
import * as types from './mutation-types'

export default {
/*存储删除个人信息*/
  [types.SAVE_PERSONAL_INFO] (state, info) {
    state.personalInfo = info;
  },
  [types.SAVE_FOOT_H] (state, h) {
    state.footH = h;
  },
  [types.DELETE_PERSONAL_INFO] (state) {
    state.personalInfo = null;
  },
  [types.SAVE_DATEPICKER_INFO] (state, bool) {
  	console.log(bool);
    state.datePicker = bool;
  }
}
