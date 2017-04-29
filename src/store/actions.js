/**
 * Created by Administrator on 2017/2/10.
 */
import * as types from './mutation-types'

export default {
  savePersonalInfo({commit},info){
    commit(types.SAVE_PERSONAL_INFO,info)
  },
  saveFootH({commit},h){
    commit(types.SAVE_FOOT_H,h)
  },
  deletePersonalInfo({commit}){
    commit(types.DELETE_PERSONAL_INFO)
  }
}
