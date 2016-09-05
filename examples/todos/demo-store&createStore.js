/*
* Action 就是一个描述“发生了什么”的普通对象。
* 你可以在任何地方调用 store.dispatch(action)，包括组件中、XHR 回调中、甚至定时器中。
*/

// react 与 redux 链接
// 我们需要做出两个变化，将 App 组件连接到 Redux 并且让它能够 dispatch actions
// 以及从 Redux store 读取到 state。
// 1. 首先，我们需要获取从之前安装好的 react-redux 提供的 Provider，
//    并且在渲染之前将根组件包装进 <Provider>。
//    这使得我们的 store 能为下面的组件所用。在内部，这个是通过 React 的 "context" 特性实现。）
//  1.1 props:
//      store (Redux Store): The single Redux store in your application.
//      children (ReactElement) The root of your component hierarchy.

// 2. 通过 react-redux 提供的 connect() 方法将包装好的组件连接到Redux。
//    尽量只做一个顶层的组件，或者 route 处理。从技术上来说你可以将应用中的任何一个组件 connect() 到 Redux store 中，但尽量避免这么做，因为这个数据流很难追踪。
//    任何一个从 connect() 包装好的组件都可以得到一个 dispatch 方法作为组件的 props，以及得到全局 state 中所需的任何内容。
//    connect() 的唯一参数是 selector。此方法可以从 Redux store 接收到全局的 state，然后返回组件中需要的 props。
//    最简单的情况下，可以返回一个初始的 state （例如，返回认证方法），但最好先将其进行转化. connect 见 container/FilterLink
//  2.1 connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
//      Connects a React component to a Redux store. It does not modify the component class passed to it.
//      Instead, it returns a new, connected component class, for you to use.



// 只有一个 Store，数据操作通过 Reducer 中实现；
// 同时它提供更简洁和清晰的单向数据流（View -> Action -> Middleware -> Reducer）
// Store 维持着应用的 state tree 对象。
// 因为应用的构建发生于 reducer，所以一个 Redux 应用中应当只有一个 Store。


import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers/index'
import App from './components/App'

// reducer
function todos(state = [], action) {
  switch (action.type) {
    case 'add':
      return state.concat([ action.text ]);
    default:
      return state
  }
}

// 1. createStore(reducer, [initialState])
//    1.1 reducer (Function): 接收两个参数，分别是当前的 state 树和要处理的 action，返回新的 state 树。

//    1.2 [initialState] (any): 初始时的 state。
//         在同构应用中，你可以决定是否把服务端传来的 state 水合（hydrate）后传给它，或者从之前保存的用户会话中恢复一个传给它。
//         如果你使用 combineReducers 创建 reducer，它必须是一个普通对象，与传入的 keys 保持同样的结构。
//         否则，你可以自由传入任何 reducer 可理解的内容。
// todos: reducer -> 处理state, 接收action, 返回新的state树
// []: 传递初始state 'Use Redux'
// † 使用 createStore 创建的 “纯正” store 只支持普通对象类型的 action，而且会立即传到 reducer 来执行。
let store = createStore(todos, [ 'Use Redux' ]);// store 创建后 dispatch了一个action

// 2. store
//    Store 就是用来维持应用所有的 state 树 的一个对象。
//    当 store 创建后，Redux 会 dispatch 一个 action 到 reducer 上，来用初始的 state 来填充 store。
//    你不需要处理这个 action。但要记住，如果第一个参数也就是传入的 state 如果是 undefined 的话，reducer应该返回初始的state值。

//    2.1 getState() 返回应用当前的 state 树。它与 store 的最后一个 reducer 返回值相同。

//    2.2 dispatch(action) 会使用当前 getState() 的结果和传入的 action 以同步方式的调用 store 的 reduce 函数。
//        返回值会被作为下一个 state。从现在开始，这就成为了 getState() 的返回值，同时变化监听器(change listener)会被触发。
//       2.2.1 参数
//             action (Object†): 描述应用变化的普通对象。
//             Action 是把数据传入 store 的惟一途径，所以任何数据，无论来自 UI 事件，
//             网络回调或者是其它资源如 WebSockets，最终都应该以 action 的形式被 dispatch。
//             按照约定，action 具有 type 字段来表示它的类型。type 也可被定义为常量或者是从其它模块引入。
//             最好使用字符串，而不是 Symbols 作为 action，因为字符串是可以被序列化的。
//             除了 type 字段外，action 对象的结构完全取决于你。参照[Flux 标准 Action 获取如何组织 action 的建议](https://github.com/acdlite/flux-standard-action)

//    2.3 subscribe(listener) 添加一个变化监听器。每当 dispatch action 的时候就会执行，state 树中的一部分可能已经变化。
//         你可以在回调函数里调用 getState() 来拿到当前 state。

function handleChange() {
  // store初始化后每次store改变时都会触发
  console.log(store.getState());
}
let Asubscribe = store.subscribe(handleChange);

store.dispatch({
  type: 'add',
  text: 'hahha'
});

//    2.4 replaceReducer(nextReducer)
//        替换 store 当前用来计算 state 的 reducer。 nextReducer (Function) store 会使用的下一个 reducer。
//        这是一个高级 API。只有在你需要实现代码分隔，而且需要立即加载一些 reducer 的时候才可能会用到它。
//        在实现 Redux 热加载机制的时候也可能会用到。





//var store2 = store.getState();
//console.log(store2, store1 == store2 );  // ["Use Redux", "Read the docs"] false

