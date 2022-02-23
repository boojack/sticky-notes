import { useAppDispatch, useAppSelector } from "../store";
import { decrement, increment, setValue } from "../store/counter";

const Counter = () => {
  const counter = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  const handleIncrementBtnClick = () => {
    dispatch(increment());
  };

  const handleDecrementBtnClick = () => {
    dispatch(decrement());
  };

  const handleResetBtnClick = () => {
    dispatch(setValue(0));
  };

  return (
    <div>
      <p>Counter: {counter}</p>
      <div>
        <span onClick={handleIncrementBtnClick}>+</span>
        <span onClick={handleDecrementBtnClick}>-</span>
        <span onClick={handleResetBtnClick}>/</span>
      </div>
    </div>
  );
};

export default Counter;
