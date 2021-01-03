// https://segmentfault.com/a/1190000020108840

import React, { useState, useEffect, useCallback, useRef } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

// 用于记录 getData 调用次数
let count = 0;

function useRefCallback(fn, dependencies) {
  const ref = useRef(fn);

  useEffect(() => {
    ref.current = fn;
  }, [fn, ...dependencies]);

  return useCallback(() => {
    const fn = ref.current;
    return fn();
  }, [ref]);
}

function App() {
  const [val, setVal] = useState("");

  // getData模拟数据请求1（如果请求里面用到外面的state的情况，那么需要额外再写一个hook，让val更新时，请求方法fn不更新）
  const getData = useRefCallback(() => {
    console.log(val);

    setTimeout(() => {
      setVal("new data " + count);
      count++;
    }, 500);
  }, [val]);
  
  // getData模拟数据请求2（如果无需用到外面的state，则用useCallback，这样当App重新渲染时生成新的getData方法，传给Child，Child的useEffect判断getData引用没更新就不会再次执行getData）
  // const getData = useCallback(() => {
  //   setTimeout(() => {
  //     setVal("new data " + count);
  //     count++;
  //   }, 500);
  // }, []);

  return <Child val={val} getData={getData} />;
}

function Child({ val, getData }) {
  useEffect(() => {
    getData();
  }, [getData]); // 依赖列表存在get

  return <div>{val}</div>;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
