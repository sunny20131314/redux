/*
* Action 就是一个描述“发生了什么”的普通对象。
* 你可以在任何地方调用 store.dispatch(action)，包括组件中、XHR 回调中、甚至定时器中。
*/

/*
 整体逻辑:
AddTodo 输入字段的输入框和按钮。
 onAddClick(text: string) 当按钮被点击时调用的回调函数。
TodoList 用于显示 todos 列表。
 todos: Array 以 { text, completed } 形式显示的 todo 项数组。
 onTodoClick(index: number) 当 todo 项被点击时调用的回调函数。
Todo 一个 todo 项。
 text: string 显示的文本内容。
 completed: boolean todo 项是否显示删除线。
 onClick() 当 todo 项被点击时调用的回调函数。
Footer 一个允许用户改变可见 todo 过滤器的组件。
 filter: string 当前的过滤器为： 'SHOW_ALL'、 'SHOW_COMPLETED' 或 'SHOW_ACTIVE'。
 onFilterChange(nextFilter: string)： 当用户选择不同的过滤器时调用的回调函数。
 */



// react 与 redux 链接
// 我们需要做出两个变化，将 App 组件连接到 Redux 并且让它能够 dispatch actions
// 以及从 Redux store 读取到 state。
// 1. 首先，我们需要获取从之前安装好的 react-redux 提供的 Provider，
//    并且在渲染之前将根组件包装进 <Provider>。 这使得我们的 store 能为下面的组件所用。在内部，这个是通过 React 的 "context" 特性实现。）
// 2. 通过 react-redux 提供的 connect() 方法将包装好的组件连接到Redux。
//    尽量只做一个顶层的组件，或者 route 处理。从技术上来说你可以将应用中的任何一个组件 connect() 到 Redux store 中，但尽量避免这么做，因为这个数据流很难追踪。
//    任何一个从 connect() 包装好的组件都可以得到一个 dispatch 方法作为组件的 props，以及得到全局 state 中所需的任何内容。
//    connect() 的唯一参数是 selector。此方法可以从 Redux store 接收到全局的 state，然后返回组件中需要的 props。
//    最简单的情况下，可以返回一个初始的 state （例如，返回认证方法），但最好先将其进行转化



import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers/index'
import App from './components/App'

let store = createStore(todoApp)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
