import _ from 'lodash'
import { siteMainParam } from '@/param/main.param'
import {
   ADD_SITE,
   ADD_STAGE,
   ADD_TASK,
   CHANGE_INPUT,
   REMOVE_SITE,
   REMOVE_STAGE,
   REMOVE_TASK,
} from './type'

const actionTestingMap = new Map([
   [
      CHANGE_INPUT,
      (state, payload) => {
         const { name, value, index, parent, idxStg, idxTsk } = payload

         let newState = { ...state }

         if (!_.isUndefined(idxTsk)) {
            //  Task
            newState[parent] = state[parent].map((site, siteIdx) => {
               if (siteIdx === index) {
                  return {
                     ...site,
                     stages: site.stages.map((stage, stageIdx) => {
                        if (stageIdx === idxStg) {
                           return {
                              ...stage,
                              tasks: stage.tasks.map((task, taskIdx) => {
                                 if (taskIdx === idxTsk) {
                                    return { ...task, [name]: value }
                                 }

                                 return task
                              }),
                           }
                        }

                        return stage
                     }),
                  }
               }

               return site
            })
         } else if (!_.isUndefined(idxStg)) {
            // Stage
            newState[parent] = state[parent].map((site, siteIdx) => {
               if (siteIdx === index) {
                  return {
                     ...site,
                     stages: site.stages.map((stage, stageIdx) => {
                        if (stageIdx === idxStg) {
                           return { ...stage, [name]: value }
                        }

                        return stage
                     }),
                  }
               }

               return site
            })
         } else {
            // Site
            newState[parent] = state[parent].map((vm, idx) => {
               if (idx === index) {
                  return {
                     ...vm,
                     [name]: value,
                  }
               }

               return vm
            })
         }

         return newState
      },
   ],
   [
      ADD_SITE,
      (state) => ({
         ...state,
         sites: [...state.sites, { ...siteMainParam }],
      }),
   ],
   [
      REMOVE_SITE,
      (state, payload) => ({
         ...state,
         sites: state.sites.filter((_, idx) => idx !== payload),
      }),
   ],
   [
      ADD_STAGE,
      (state, payload) => {
         const { idxSite, newStage } = payload

         return {
            ...state,
            sites: state.sites.map((site, idx) => {
               if (idx === idxSite) {
                  return {
                     ...site,
                     stages: [...site.stages, newStage],
                  }
               }

               return site
            }),
         }
      },
   ],
   [
      REMOVE_STAGE,
      (state, payload) => {
         const { idxSite, idxStage } = payload

         return {
            ...state,
            sites: state.sites.map((site, idx) => {
               if (idx === idxSite) {
                  return {
                     ...site,
                     stages: site.stages.filter(
                        (_, index) => index !== idxStage
                     ),
                  }
               }
               return site
            }),
         }
      },
   ],
   [
      ADD_TASK,
      (state, payload) => {
         const { idxSite, idxStage, newTask } = payload

         return {
            ...state,
            sites: state.sites.map((site, idx) => {
               if (idx === idxSite) {
                  return {
                     ...site,
                     stages: site.stages.map((stage, sIdx) => {
                        if (sIdx === idxStage) {
                           return {
                              ...stage,
                              tasks: [...stage.tasks, newTask],
                           }
                        }
                        return stage
                     }),
                  }
               }
               return site
            }),
         }
      },
   ],
   [
      REMOVE_TASK,
      (state, payload) => {
         const { idxSite, idxStage, idxTask } = payload

         return {
            ...state,
            sites: state.sites.map((site, idx) => {
               if (idx === idxSite) {
                  return {
                     ...site,
                     stages: site.stages.map((stage, sIdx) => {
                        if (sIdx === idxStage) {
                           return {
                              ...stage,
                              tasks: stage.tasks.filter(
                                 (_, tIdx) => tIdx !== idxTask
                              ),
                           }
                        }
                        return stage
                     }),
                  }
               }
               return site
            }),
         }
      },
   ],
])

export const testingReducer = (state, { type, payload }) => {
   const mappedAction = actionTestingMap.get(type)
   return mappedAction ? mappedAction(state, payload) : state
}
