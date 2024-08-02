import _ from 'lodash'
import FormInput from '@/component/form/FormInput'
import FormDatepicker from '@/component/form/FormDatepicker'
import { useReducerFormContext } from '@/context/useReducerForm.context'
import {
   ADD_SITE,
   ADD_STAGE,
   ADD_TASK,
   CHANGE_INPUT,
   REMOVE_SITE,
   REMOVE_STAGE,
   REMOVE_TASK,
} from '@/hook/store/type'
import { stageMainParam, taskMainParam } from '@/param/main.param'

const TestingPage = () => {
   const { __state: state, __dispatch: dispatch } = useReducerFormContext()

   const _handleChange = (e, index, parent = '', idxStg, idxTsk) => {
      const { name, value } = e.target

      dispatch({
         type: CHANGE_INPUT,
         payload: { name, value, index, parent, idxStg, idxTsk },
      })
   }

   // Handle Site Start
   const _handleToggleSite = () => {
      dispatch({ type: ADD_SITE })
   }

   const _handleRemoveSite = (index) => {
      dispatch({ type: REMOVE_SITE, payload: index })
   }
   // Handle Site End

   // Handle Stage Start
   const _handleToggleStage = (idxSite) => {
      dispatch({
         type: ADD_STAGE,
         payload: { idxSite, newStage: { ...stageMainParam } },
      })
   }

   const _handleRemoveStage = (idxSite, idxStage) => {
      dispatch({
         type: REMOVE_STAGE,
         payload: { idxSite, idxStage },
      })
   }
   // Handle Stage End

   // Handle Task Start
   const _handleToggleTask = (idxSite, idxStage) => {
      dispatch({
         type: ADD_TASK,
         payload: {
            idxSite,
            idxStage,
            newTask: { ...taskMainParam },
         },
      })
   }

   const _handleRemoveTask = (idxSite, idxStage, idxTask) => {
      dispatch({
         type: REMOVE_TASK,
         payload: {
            idxSite,
            idxStage,
            idxTask,
         },
      })
   }
   // Handle Task End

   const _handleSubmit = (e) => {
      e.preventDefault()

      console.log('state', state)
   }

   return (
      <div className="container">
         <div className="h-auto w-75 mt-5">
            <form onSubmit={_handleSubmit}>
               <h3 className="text-primary">Todo</h3>

               <button
                  className="btn btn-primary btn-sm my-3"
                  type="button"
                  onClick={_handleToggleSite}>
                  Add Site
               </button>

               {/* Sites */}
               {!_.isEmpty(state.sites) ? (
                  <>
                     {state.sites.map((site, idxSite) => (
                        <div
                           key={idxSite}
                           className={
                              'row ' + (_.isEmpty(site.stages) ? 'mb-4' : '')
                           }>
                           <div
                              className={
                                 'col-12 ' +
                                 (!_.isEmpty(site.stages) ? 'mb-4' : '')
                              }>
                              <div className="row mb-3">
                                 <div className="col">
                                    <FormInput
                                       name="title"
                                       label="Title"
                                       value={site.title}
                                       actions={{
                                          onChange: (e) =>
                                             _handleChange(e, idxSite, 'sites'),
                                       }}
                                    />

                                    <FormDatepicker
                                       name="date"
                                       label="Date"
                                       value={site.date}
                                       actions={{
                                          onChange: (e) =>
                                             _handleChange(e, idxSite, 'sites'),
                                       }}
                                    />
                                 </div>

                                 <div className="col-auto align-self-end mb-3">
                                    <button
                                       className="btn btn-danger btn-sm"
                                       type="button"
                                       onClick={() =>
                                          _handleRemoveSite(idxSite)
                                       }>
                                       Remove
                                    </button>
                                 </div>
                              </div>

                              <button
                                 className="btn btn-success btn-sm"
                                 type="button"
                                 onClick={() => _handleToggleStage(idxSite)}>
                                 Add Stage
                              </button>
                           </div>

                           {/* Stages */}
                           {!_.isEmpty(site.stages) ? (
                              <>
                                 {site.stages.map((stage, idxStg) => (
                                    <div
                                       key={idxStg}
                                       className={
                                          'row ' +
                                          (_.isEmpty(stage.tasks) ? 'mb-4' : '')
                                       }>
                                       <div
                                          className={
                                             'offset-1 col-10 ' +
                                             (!_.isEmpty(stage.tasks)
                                                ? 'mb-4'
                                                : '')
                                          }>
                                          <div className="row mb-3">
                                             <div className="col">
                                                <FormInput
                                                   name="title"
                                                   label="Title"
                                                   value={stage.title}
                                                   actions={{
                                                      onChange: (e) =>
                                                         _handleChange(
                                                            e,
                                                            idxSite,
                                                            'sites',
                                                            idxStg
                                                         ),
                                                   }}
                                                />

                                                <FormDatepicker
                                                   name="date"
                                                   label="Date"
                                                   value={stage.date}
                                                   actions={{
                                                      onChange: (e) =>
                                                         _handleChange(
                                                            e,
                                                            idxSite,
                                                            'sites',
                                                            idxStg
                                                         ),
                                                   }}
                                                />
                                             </div>

                                             <div className="col-auto align-self-end mb-3">
                                                <button
                                                   className="btn btn-danger btn-sm"
                                                   type="button"
                                                   onClick={() =>
                                                      _handleRemoveStage(
                                                         idxSite,
                                                         idxStg
                                                      )
                                                   }>
                                                   Remove
                                                </button>
                                             </div>
                                          </div>

                                          <button
                                             className="btn btn-warning btn-sm"
                                             type="button"
                                             onClick={() =>
                                                _handleToggleTask(
                                                   idxSite,
                                                   idxStg
                                                )
                                             }>
                                             Add Task
                                          </button>
                                       </div>

                                       {/* Task */}
                                       {!_.isEmpty(stage.tasks) ? (
                                          <>
                                             {stage.tasks.map(
                                                (task, idxTsk) => (
                                                   <div
                                                      key={idxTsk}
                                                      className={
                                                         'row ' +
                                                         (_.isEmpty(stage.tasks)
                                                            ? 'mb-4'
                                                            : '')
                                                      }>
                                                      <div
                                                         className={
                                                            'offset-2 col-8 ' +
                                                            (!_.isEmpty(
                                                               stage.tasks
                                                            )
                                                               ? 'mb-4'
                                                               : '')
                                                         }>
                                                         <div className="row mb-3">
                                                            <div className="col">
                                                               <FormInput
                                                                  name="title"
                                                                  label="Title"
                                                                  value={
                                                                     task.title
                                                                  }
                                                                  actions={{
                                                                     onChange: (
                                                                        e
                                                                     ) =>
                                                                        _handleChange(
                                                                           e,
                                                                           idxSite,
                                                                           'sites',
                                                                           idxStg,
                                                                           idxTsk
                                                                        ),
                                                                  }}
                                                               />

                                                               <FormDatepicker
                                                                  name="date"
                                                                  label="Date"
                                                                  value={
                                                                     task.date
                                                                  }
                                                                  actions={{
                                                                     onChange: (
                                                                        e
                                                                     ) =>
                                                                        _handleChange(
                                                                           e,
                                                                           idxSite,
                                                                           'sites',
                                                                           idxStg,
                                                                           idxTsk
                                                                        ),
                                                                  }}
                                                               />
                                                            </div>

                                                            <div className="col-auto align-self-end mb-3">
                                                               <button
                                                                  className="btn btn-danger btn-sm"
                                                                  type="button"
                                                                  onClick={() =>
                                                                     _handleRemoveTask(
                                                                        idxSite,
                                                                        idxStg,
                                                                        idxTsk
                                                                     )
                                                                  }>
                                                                  Remove
                                                               </button>
                                                            </div>
                                                         </div>
                                                      </div>
                                                   </div>
                                                )
                                             )}
                                          </>
                                       ) : null}
                                    </div>
                                 ))}
                              </>
                           ) : null}
                        </div>
                     ))}

                     <button type="submit" className="btn btn-primary btn-sm">
                        Submit
                     </button>
                  </>
               ) : null}
            </form>
         </div>
      </div>
   )
}

export default TestingPage
