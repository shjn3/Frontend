import {configureStore} from '@reduxjs/toolkit'
import authReducer from './reducers/authReducer' 
import todosReducer from './reducers/todoReducer'

const store = configureStore({
    reducer: {
         auth: authReducer,
         todos: todosReducer
    }
})
export default store
