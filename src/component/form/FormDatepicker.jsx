import { useEffect, useId } from 'react'

const FormDatepicker = (props) => {
   const defaultId = useId()

   const {
      id = '',
      name = '',
      value = '',
      label = '',
      className = '',

      placeholder = '20/05/2023',
      format = 'dd/mm/yyyy',

      readOnly = true,

      actions = {
         onChange: () => {},
      },
      index = 0,
   } = props

   const idInput = id || 'text-datepicker-' + (name || '') + defaultId

   const _configDatePicker = (element = null, Datepicker = {}) => {
      return new Datepicker(element, {
         clearButton: true,
         buttonClass: 'btn',
         format: format,
         autohide: true,
         prevArrow: '‹',
         nextArrow: '›',
      })
   }

   useEffect(() => {
      import('vanillajs-datepicker').then((module) => {
         const { Datepicker } = module.default || module

         const modals = document.querySelectorAll('.modal')
         const elem = document.getElementById(idInput)
         const customClearBtn = document.getElementById('custom-clear-btn')
         let datepicker = _configDatePicker(elem, Datepicker) || {}

         elem?.addEventListener('changeDate', (e) => {
            actions.onChange(e || {})
         })

         customClearBtn?.addEventListener('click', (e) => {
            datepicker.setDate({
               clear: true,
            })
         })

         // Handle in modal
         if (modals.length) {
            modals?.forEach((modal) => {
               modal?.addEventListener('shown.bs.modal', () => {
                  datepicker.update()
               })

               modal?.addEventListener('hidden.bs.modal', () => {
                  datepicker.setDate({
                     clear: true,
                  })
               })
            })
         }
      })
   }, [index])

   return (
      <div className={'form-group mb-3 ' + className}>
         {label ? (
            <label htmlFor={idInput} className="form-label">
               {label}
            </label>
         ) : null}

         <div className="wp-input-group-append">
            <input
               id={idInput}
               type="text"
               value={value}
               name={props.name}
               onChange={actions.onChange}
               className="form-control"
               placeholder={placeholder}
               readOnly={readOnly}
            />
         </div>
      </div>
   )
}

export default FormDatepicker
