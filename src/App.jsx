import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from '@/page/Home.page'
import TestingPage from '@/page/Testing.page'
import CobaPage from '@/page/Coba.page'
import { WrapReducerContext } from '@/context/useReducerForm.context'
import { formReducer } from '@/hook/store/reducer'
import { testingReducer } from '@/hook/store/testingReducer'
import { mainReducerForm } from '@/param/main.param'

function App() {
   return (
      <>
         <BrowserRouter>
            <Routes>
               <Route
                  path="/"
                  index
                  element={
                     <WrapReducerContext
                        reducer={formReducer}
                        initialState={mainReducerForm}>
                        <HomePage />
                     </WrapReducerContext>
                  }
               />

               <Route
                  path="/testing"
                  element={
                     <WrapReducerContext
                        reducer={testingReducer}
                        initialState={mainReducerForm}>
                        <TestingPage />
                     </WrapReducerContext>
                  }
               />

               <Route path="/coba" element={<CobaPage />} />
            </Routes>
         </BrowserRouter>
      </>
   )
}

export default App
