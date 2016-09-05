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
