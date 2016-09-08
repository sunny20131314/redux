import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'

// 任何被发送到 store 的 action 都会经过 applyMiddleware 部分!
export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunkMiddleware, createLogger())
  )

  console.log(module);
  // -- ?
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      //const nextRootReducer = require('../reducers').default
      store.replaceReducer(rootReducer)
    })
  }

  return store
}
