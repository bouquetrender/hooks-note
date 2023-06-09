import React, { useImperativeHandle, useState, useRef } from "react";

function A() {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  return (
    <div>
      <p>父组件 count{count}</p>
      <button
        onClick={() => {
          setCount(count + 1);
          ref.current.update(count + 1);
        }}
      >
        click
      </button>
      <B count={count} ref={ref} />
    </div>
  );
}
const B = React.forwardRef((props, ref) => {
  const [number, setNumber] = useState(0);

  useImperativeHandle(
    ref,
    () => ({
      update: (n) => {
        setNumber(n);
      }
    }),
    []
  );
  console.log("子组件render");

  return (
    <div>
      <p>子组件 number{number}</p>
      <button onClick={() => setNumber(number + 1)}>click</button>
    </div>
  );
});

export default A;
