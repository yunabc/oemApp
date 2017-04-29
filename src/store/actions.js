/**
 * Created by Administrator on 2017/2/10.
 */
import * as types from './mutation-types'

export default {
  addTotalTime ({commit}, time) {
    commit(types.ADD_TOTAL_TIME, time)
  },
  decTotalTime ({commit}, time) {
    commit(types.DEC_TOTAL_TIME, time)
  },
  savePlan ({commit}, plan) {
    commit(types.SAVE_PLAN, plan)
  },
  deletePlan ({commit}, plan) {
    commit(types.DELETE_PLAN, plan)
  },
  savePersonalInfo({commit},info){
    commit(types.SAVE_PERSONAL_INFO,info)
  },
  deletePersonalInfo({commit}){
    commit(types.DELETE_PERSONAL_INFO)
  }
}
