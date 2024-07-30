import { mainReducerForm } from '@/param/main.param'
import _ from 'lodash'

export const INITIAL_STATE = { ...mainReducerForm }

const updateNestedProperty = (obj, path, value) => {
   const newObj = _.cloneDeep(obj)
   _.set(newObj, path, value)
   return newObj
}

const formReducer = (state, action) => {
   switch (action.type) {
      case 'CHANGE_INPUT':
         const { name, value } = action.payload
         return updateNestedProperty(state, name, value)
      case 'ADD_SITE':
         return {
            ...state,
            sites: [...state.sites, action.payload],
         }
      case 'REMOVE_SITE':
         return {
            ...state,
            sites: state.sites.filter((_, idx) => idx !== action.payload),
         }
      case 'ADD_STAGE':
         const { siteIndex, newStage } = action.payload

         return {
            ...state,
            sites: state.sites.map((site, idx) => {
               if (idx === siteIndex) {
                  return {
                     ...site,
                     stages: [...site.stages, newStage],
                  }
               }
               return site
            }),
         }
      case 'REMOVE_STAGE':
         const { siteIdx: sIdx, stageIdx } = action.payload

         return {
            ...state,
            sites: state.sites.map((site, idx) => {
               if (idx === sIdx) {
                  return {
                     ...site,
                     stages: site.stages.filter(
                        (_, index) => index !== stageIdx
                     ),
                  }
               }
               return site
            }),
         }
      case 'ADD_TASK':
         const { siteIdx, stgIdx, newTask } = action.payload

         return {
            ...state,
            sites: state.sites.map((site, idx) => {
               if (idx === siteIdx) {
                  return {
                     ...site,
                     stages: site.stages.map((stage, sIdx) => {
                        if (sIdx === stgIdx) {
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
      case 'REMOVE_TASK':
         const { siteIndex: sIndex, stageIndex, taskIndex } = action.payload

         return {
            ...state,
            sites: state.sites.map((site, idx) => {
               if (idx === sIndex) {
                  return {
                     ...site,
                     stages: site.stages.map((stage, sIdx) => {
                        if (sIdx === stageIndex) {
                           return {
                              ...stage,
                              tasks: stage.tasks.filter(
                                 (_, tIdx) => tIdx !== taskIndex
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
      default:
         return state
   }
}

export default formReducer
