// action
// 封装了一层, 定义type等, 返回的结果传递给reducer
let nextTodoId = 0

export const addTodo = (text) => {
  console.log(text, 'text');
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  }
}

export const setVisibilityFilter = (filter) => {
  console.log( filter, 'active~~~~' );
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}

export const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
}
