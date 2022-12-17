import reducer from './reducer'
import { configureStore } from 'redux'

const store = configureStore(reducer)

export default store