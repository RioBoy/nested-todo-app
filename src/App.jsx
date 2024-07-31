import HomePage from '@/page/Home.page'
import { WrapReducerContext } from '@/context/useReducerForm.context'
import { formReducer } from '@/hook/store/reducer'
import { mainReducerForm } from '@/param/main.param'

function App() {
   return (
      <WrapReducerContext reducer={formReducer} initialState={mainReducerForm}>
         <HomePage />
      </WrapReducerContext>
   )
}

export default App
