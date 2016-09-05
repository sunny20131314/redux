
import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions'
import Link from '../components/Link'

const mapStateToProps = (state, ownProps) => {
  console.log(state, ownProps, 'state, ownProps FilterLink~~~~');

  return {
    active: ownProps.filter === state.visibilityFilter
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log(dispatch, ownProps, 'dispatch, ownProps FilterLink~~~~');
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter))
    }
  }
}

// 为啥感觉... 这里像是传进组件 Link 的props? --
// 没有修改原始组件,而是返回一个新的组件
const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)


//  1. connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
//      https://github.com/reactjs/react-redux/blob/master/docs/api.md#provider-store
//   1.1[mapStateToProps(state, [ownProps]): stateProps] (Function): 如果指定了相关的mapStateToProps,
//      组件(EX:Link)将会订阅redux store update. 任何时候更新, mapStateToProps都会被调用!
//      返回的结果将会是一个简单的对象! 并且会发给组件的props!
//      如果没有指定, 则不会订阅
//      如果有第二个参数: ownProps, its value will be the props passed to your component
//      当组件接收新的props时，mapStateToProps将被重新调用
//   1.2[mapDispatchToProps(dispatch, [ownProps]): dispatchProps](Object or Function)
//      如果传递一个对象，每个函数里面将被假定为是一个redux action creator. 一个具有相同功能名称的对象，但与每一个action creator包裹成一个dispatch，
//      使他们可以直接调用，并且将被合并到组件的props。
//      如果一个函数被传递，它将被dispatch。
//      这取决于你返回一个对象，以某种方式使用dispatch绑定 action creator
//      如果省略，默认的实现是将dispatch到你的组件的props
//      如果有第二个参数: ownProps, its value will be the props passed to your component
//      当组件接收新的props时，mapDispatchToProps将被重新调用
//   1.3[mergeProps(stateProps, dispatchProps, ownProps): props] (Function)
//      如果指定，mapstatetoprops()，mapdispatchtoprops()和parent的结果将会被传递
//      返回的简单对象,将会传递给the wrapped component as props
//      您可以指定此功能，以选择一个props的基础上的state，或将action creator绑定到props的一个特定的变量。
//      如果没有指定 -> Object.assign({}, ownProps, stateProps, dispatchProps)
//   1.4[options] (Object) If specified, further customizes the behavior of the connector.
//      1.4.1 [pure = true] (Boolean):
//            true: 实现了 shouldcomponentupdate 浅比较 mergeprops结果，防止不必要的更新，
//                  假设组件是一个“pure”的成分，不依赖于任何input或state而不是其props和选择 Redux store’s state。
//            default: false
//      1.4.2 [withRef = false] (Boolean):
//            true: stores ref到包装组件的实例并通过getwrappedinstance()方法使其可用
//            default: false

// Inject all action creators (addTodo, completeTodo, ...) without subscribing to the store
// connect(null, actionCreators)(TodoApp)
export default FilterLink
