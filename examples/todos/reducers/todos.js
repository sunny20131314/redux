/*
* Store 会把两个参数传入 reducer： 当前的 state 树和 action。
* 例如，在这个 todos 应用中，根 reducer 可能接收这样的数据：
* 注意 reducer 是纯函数。它仅仅用于计算下一个 state。它应该是完全可预测的：多次传入相同的输入必须产生相同的输出。
* 它不应做有副作用的操作，如 API 调用或路由跳转。这些应该在 dispatch action 前发生
 */


// reducer
// type Reducer<S, A> = (state: S, action: A) => S
// 处理当前store, return 处理后的, 按理是和之前的合并了, 具体不详~~~
// Reducer (也称为 reducing function) 函数接受两个参数：
// 之前累积运算的结果(state)和当前被累积的值(action)，返回的是一个新的累积结果。该函数把一个集合归并成一个单值。
// 不要在 reducer 中有 API 调用

const todo = (state, action) => {
  console.log( state, action, 'state, action, todo~~~~' )
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case 'TOGGLE_TODO':
      console.log( state, 'state', action, 'action' )
      if (state.id !== action.id) {
        return state
      }

      // Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。
      // Object.assign方法的第一个参数是目标对象，后面的参数都是源对象。
      // 注意，如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。
      return Object.assign({}, state, {
        completed: !state.completed
      })
    default:
      return state
  }
}

const todos = (state = [], action) => {
  console.log( state, action, 'state, action, todos~~~~' )
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ]
    case 'TOGGLE_TODO':
      return state.map(t =>
        todo(t, action)
      )
    default:
      return state
  }
}

export default todos
