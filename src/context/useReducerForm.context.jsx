import { createContext, useContext, useReducer } from 'react'

export const ReducerFormContext = createContext()

export const WrapReducerContext = ({
   children,
   reducer = () => {},
   initialState = {},
}) => {
   const [state, dispatch] = useReducer(reducer, initialState)

   return (
      <ReducerFormContext.Provider value={[state, dispatch]}>
         {children}
      </ReducerFormContext.Provider>
   )
}

export const useReducerFormContext = () => {
   const context = useContext(ReducerFormContext)

   if (!context) {
      throw new Error(
         'useReducerFormHook must be used within a WrapReducerContext'
      )
   }

   const [state, dispach] = context

   return {
      __state: state,
      __dispatch: dispach,
   }
}
