import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'

// 在这个todo中, 下列三个每个组件中都使用了 connect, so 每个组件都可以使用dispatch 方法, 可是... 为什么不放在顶层呢?
const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)

export default App
