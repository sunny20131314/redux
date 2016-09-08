/**
 * Created by sunzhimin on 05/09/16.
 */

import React from 'react'
import Immutable, { Map, List, fromJS } from 'immutable';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { render } from 'react-dom'


// Map, List 是仿原生的
//console.log( Map());
//console.log( List());
//console.log( fromJS());
var state = fromJS({a:1});
console.log(state);
state = state.set('activeLocationId', 111);
console.log(state);
var state2 = Map({b:2}).set('activeLocationId', 111);
console.log(state);  // Map {size: 2, _root: ArrayMapNode, __ownerID: undefined, __hash: undefined, __altered: false}
console.log(state.toJS()); // Object {a: 1, activeLocationId: 111}
console.log(state2);   // Map {size: 2, _root: ArrayMapNode, __ownerID: undefined, __hash: undefined, __altered: false}
console.log(state2.toJS()); // Object {a: 2, activeLocationId: 111}


var map1 = Map({a:1, b:2, c:3});
var fromJs1 = fromJS({aa: 2});
var map2 = map1.set('b', fromJs1);    // set 是在原对象的基础上生成, 可以共用的共用, 其他重新生成
console.log(map1.get('b')); // 2
console.log(map2.get('b').get('aa')); // 2








const components = {
  Todo({ todo }) {
    if(todo.isDone) {
      return <strike>{todo.text}</strike>;
    } else {
      return <span>{todo.text}</span>;
    }
  },
  TodoList({ todos, toggleTodo, addTodo }) {
    const onSubmit = (e) => {
      const text = e.target.value;
      if(e.which === 13 && text.length > 0) {
        addTodo(text);
        e.target.value = '';
      }
    };

    const toggleClick = (id) => () => toggleTodo(id);

    const { Todo } = components;

    return (
      <div className='todo'>
        <input type='text'
               className='todo__entry'
               placeholder='Add todo'
               onKeyDown={onSubmit} />
        <ul className='todo__list'>
          {todos.map(t => (
            <li
              key={t.get('id')}
              className='todo__item'
              onClick={toggleClick(t.get('id'))}>
              <Todo todo={t.toJS()} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

const actions = {
  addTodo(text) {
    return {
      type: 'ADD_TODO',
      payload: {
        id: Math.random().toString(34).slice(2),
        isDone: false,
        text
      }
    };
  },
  toggleTodo(id) {
    return {
      type: 'TOGGLE_TODO',
      payload: id
    }
  }
};

const init = List();

const reducer = function(state=init, action) {
  switch(action.type) {
    case 'ADD_TODO':
      return state.push(
        Map(action.payload)
      );
    case 'TOGGLE_TODO':
      return state.map(t => {
        if(t.get('id') == action.payload) {
          return t.update('isDone', isDone => !isDone);
        } else {
          return t;
        }
      });
    default:
      return state;
  }
};

const containers = {
  TodoList: connect(
    function mapStateToProps(state) {
      return {
        todos: state
      };
    },
    function mapDispatchToProps(dispatch) {
      return {
        toggleTodo: (id) => dispatch(actions.toggleTodo(id)),
        addTodo: (text) => dispatch(actions.addTodo(text))
      };
    }
  )(components.TodoList)
};

const { TodoList } = containers;
const store = createStore(reducer);

render(
  <Provider store={store}>
    <TodoList />
  </Provider>,
  document.getElementById('root')
);
