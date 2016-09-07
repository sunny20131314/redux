/**
 * Created by sunzhimin on 05/09/16.
 */

// combineReducers(reducers)
// The combineReducers helper function turns
// an object whose values are different reducing functions
// into a single reducing function you can pass to createStore.

// combineReducers辅助函数可以把(有着不同reducing函数的value的)对象转变为一个reducing函数,
// 并将其传递给createStore

// The resulting reducer calls every child reducer,
// and gathers their results into a single state object.
// The shape of the state object matches the keys of the passed reducers.
// 合并后的 reducer 可以调用各个子 reducer，并把它们的结果合并成一个 state 对象。
// state 对象的结构由传入的多个 reducer 的 key 决定。

//{
//  reducer1: ...
//  reducer2: ...
//}

// 本函数可以帮助你组织多个 reducer，使它们分别管理自身相关联的 state。类似于 Flux 中的多个 store 分别管理不同的 state。在 Redux 中，只有一个 store，但是 combineReducers 让你拥有多个 reducer，同时保持各自负责逻辑块的独立性。



