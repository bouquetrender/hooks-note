import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

const rootReducer = (state, action) => {
  if (!state) return {
    themeColor: 'red'
  }

  switch (action.type) {
    case 'CHANGE_COLOR':
      return { ...state, themeColor: action.themeColor }
    default:
      return state
  }
}
const myStore = createStore(rootReducer)

ReactDOM.render(
  <Provider store={myStore}>
    <CommentApp />
  </Provider>,
  document.getElementById('root')
);

//-------------------------------


import React, { Component, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const TestRedux = () => {
  const themeColor = useSelector(state => state.themeColor)
  const dispatch = useDispatch()
  
  // when passing a callback using dispatch to a child component, you should memoize it with useCallback
  // https://react-redux.js.org/api/hooks#usedispatch
  const changeColor = useCallback(
    (_color) => dispatch({ type: 'CHANGE_COLOR', themeColor: _color }),
    [dispatch]
  )

  const handleChangeColor = () => {
    let _color = themeColor === 'red' ? 'blue' : 'red'
    changeColor(_color)
  }

  return (
    <div>
      <span>{themeColor}</span>
      <button onClick={handleChangeColor}>change</button>
    </div>
  )
}
