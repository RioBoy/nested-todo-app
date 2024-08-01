import { useReducer } from 'react'
import FormInput from '@/component/form/FormInput'

const CobaPage = () => {
   const [formRequest, setFormRequest] = useReducer(
      (oldState, currState) => ({
         ...oldState,
         ...currState,
      }),
      {
         username: '',
         password: '',
      }
   )

   const _handleChange = (e) => {
      const { name, value } = e.target

      setFormRequest({
         [name]: value,
      })
   }

   return (
      <div className="container mt-5 pt-5">
         <div className="row">
            <div className="col-md-8">
               <FormInput
                  name="username"
                  label="Username"
                  value={formRequest.username}
                  actions={{
                     onChange: (e) => _handleChange(e),
                  }}
               />

               <FormInput
                  name="password"
                  label="Password"
                  type="password"
                  value={formRequest.password}
                  actions={{
                     onChange: (e) => _handleChange(e),
                  }}
               />
            </div>
         </div>
      </div>
   )
}

export default CobaPage
