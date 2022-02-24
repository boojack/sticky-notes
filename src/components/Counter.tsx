import { useAppDispatch, useAppSelector } from "../store";
import { decrement, increment, setValue } from "../store/counter";
import "../less/counter.less";

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
    <div className="counter-container">
      <p>Counter: {counter}</p>
      <div className="btns-container">
        <span className="action-btn" onClick={handleIncrementBtnClick}>
          +
        </span>
        <span className="action-btn" onClick={handleDecrementBtnClick}>
          -
        </span>
        <span className="action-btn" onClick={handleResetBtnClick}>
          /
        </span>
      </div>
    </div>
  );
};

export default Counter;
