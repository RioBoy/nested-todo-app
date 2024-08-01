import { useId } from 'react'

const FormInput = (props) => {
   const defaultId = useId()

   const {
      id = '',
      name = '',
      value = '',
      type = 'text',
      label = '',

      actions = {
         onChange: () => {},
      },
   } = props

   const idInput = id || 'text-datepicker-' + (name || '') + defaultId

   return (
      <>
         <div className="form-group mb-3">
            {label ? (
               <label className="form-label" htmlFor={idInput}>
                  {label}
               </label>
            ) : null}

            <input
               id={idInput}
               type={type}
               className="form-control"
               name={name}
               value={value}
               onChange={actions.onChange}
               placeholder="e.g. Site"
            />
         </div>
      </>
   )
}

export default FormInput
