import { useReducer } from 'react'
import _ from 'lodash'
import formReducer, { INITIAL_STATE } from '@/hook/useReducerForm.hook'
import {
   siteMainParam,
   stageMainParam,
   taskMainParam,
} from '@/param/main.param'
import MainForm from './component/MainForm'
import StageSection from './container/StageSection'

const HomePage = () => {
   const [state, dispatch] = useReducer(formReducer, INITIAL_STATE)

   const _handleChange = (e) => {
      const { name, value } = e.target
      dispatch({
         type: 'CHANGE_INPUT',
         payload: { name, value },
      })
   }

   // Site Start
   const _handleToggleSite = () => {
      dispatch({
         type: 'ADD_SITE',
         payload: { ...siteMainParam },
      })
   }

   const _handleRemoveSite = (index) => {
      dispatch({ type: 'REMOVE_SITE', payload: index })
   }
   // Site End

   // Stage Start
   const _handleToggleStage = (siteIndex) => {
      dispatch({
         type: 'ADD_STAGE',
         payload: { siteIndex, newStage: { ...stageMainParam } },
      })
   }

   const _handleRemoveStage = (siteIndex, stageIndex) => {
      dispatch({
         type: 'REMOVE_STAGE',
         payload: { siteIdx: siteIndex, stageIdx: stageIndex },
      })
   }
   // Stage End

   // Task Start
   const _handleToggleTask = (siteIndex, stageIndex) => {
      dispatch({
         type: 'ADD_TASK',
         payload: {
            siteIdx: siteIndex,
            stgIdx: stageIndex,
            newTask: { ...taskMainParam },
         },
      })
   }

   const _handleRemoveTask = (siteIndex, stageIndex, taskIndex) => {
      dispatch({
         type: 'REMOVE_TASK',
         payload: {
            siteIndex,
            stageIndex,
            taskIndex,
         },
      })
   }
   // Task End

   return (
      <div className="container">
         <div className="h-auto w-75 mt-5">
            <h3 className="text-primary">Todo</h3>

            <button
               className="btn btn-primary btn-sm my-3"
               type="button"
               onClick={_handleToggleSite}>
               Add Site
            </button>

            {!_.isEmpty(state.sites)
               ? state.sites.map((site, idx) => (
                    <div className="row mb-4" key={idx}>
                       <div className="col-12 mb-4">
                          <MainForm
                             formRequest={site}
                             names={{
                                title: `sites.${idx}.title`,
                             }}
                             isSuccessBtn
                             actions={{
                                change: _handleChange,

                                // Site
                                remove: () => _handleRemoveSite(idx),

                                // Stage
                                toggleAdd: () => _handleToggleStage(idx),
                             }}
                          />
                       </div>

                       <StageSection
                          stages={site.stages}
                          idxSite={idx}
                          actions={{
                             change: _handleChange,

                             //  Stage
                             removeStage: _handleRemoveStage,

                             //  Task
                             toggleAddTask: _handleToggleTask,
                             removeTask: _handleRemoveTask,
                          }}
                       />
                    </div>
                 ))
               : null}
         </div>
      </div>
   )
}

export default HomePage
