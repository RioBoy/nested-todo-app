import _ from 'lodash'

const defaultDataConfig = {
   btnTitle: {
      add: 'Add Stage',
      remove: 'Remove',
   },
}

const MainForm = ({
   formRequest = {},

   names = {
      title: '',
   },

   isUseBtnAdd = true,
   isSuccessBtn = false,
   isWarningBtn = false,

   actions = { change: () => {}, toggleAdd: () => {}, remove: () => {} },

   configHandle = { ...defaultDataConfig },
}) => {
   const config = _.merge({}, defaultDataConfig, configHandle)

   return (
      <>
         <div className="row mb-3">
            <div className="col">
               <div className="form-group">
                  <label className="form-label">Title</label>
                  <input
                     type="text"
                     className="form-control"
                     name={names.title}
                     value={formRequest.title}
                     onChange={actions.change}
                     placeholder="e.g. Site"
                  />
               </div>
            </div>

            <div className="col-auto align-self-end">
               <button
                  className="btn btn-danger btn-sm"
                  onClick={actions.remove}>
                  {config.btnTitle.remove}
               </button>
            </div>
         </div>

         {isUseBtnAdd ? (
            <button
               className={
                  'btn btn-sm' +
                  (isSuccessBtn ? ' btn-success' : '') +
                  (isWarningBtn ? ' btn-warning' : '')
               }
               type="button"
               onClick={actions.toggleAdd}>
               {config.btnTitle.add}
            </button>
         ) : null}
      </>
   )
}

export default MainForm
