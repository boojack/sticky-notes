import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store";
import { increment, decrement } from "./store/counter";

function App() {
  const counter = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // do nth
  }, []);

  const handleIncrementBtnClick = () => {
    dispatch(increment());
  };

  const handleDecrementBtnClick = () => {
    dispatch(decrement());
  };

  return (
    <div>
      <p className="text-3xl">Hello sticky notes!</p>
      <p>
        Counter: {counter} <span onClick={handleIncrementBtnClick}>+</span> <span onClick={handleDecrementBtnClick}>-</span>
      </p>
    </div>
  );
}

export default App;
