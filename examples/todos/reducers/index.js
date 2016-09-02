/*
* 根 reducer 的结构完全由你决定。
* Redux 原生提供combineReducers()辅助函数，来把根 reducer 拆分成多个函数，用于分别处理 state 树的一个分支。
*
*/

// 当你触发 action 后，combineReducers 返回的 todoApp 会负责调用两个 reducer：
// let nextTodos = todos(state.todos, action);
// let nextVisibleTodoFilter = visibleTodoFilter(state.visibleTodoFilter, action);

// 然后会把两个结果集合并成一个 state 树：
// return {
//   todos: nextTodos,
//   visibleTodoFilter: nextVisibleTodoFilter
// };


// Redux store 保存了根 reducer 返回的完整 state 树。

// 这个新的树就是应用的下一个 state！所有订阅 store.subscribe(listener) 的监听器都将被调用；
// 监听器里可以调用 store.getState() 获得当前 state。
// 现在，可以应用新的 state 来更新 UI。
// 如果你使用了 React Redux 这类的绑定库，这时就应该调用 component.setState(newState) 来更新。

import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'

const todoApp = combineReducers({
  todos,
  visibilityFilter
})

export default todoApp
