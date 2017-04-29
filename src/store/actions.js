/**
 * Created by Administrator on 2017/2/10.
 */
import * as types from './mutation-types'

export default {
  savePersonalInfo({commit},info){
    commit(types.SAVE_PERSONAL_INFO,info)
  },
  deletePersonalInfo({commit}){
    commit(types.DELETE_PERSONAL_INFO)
  }
}
