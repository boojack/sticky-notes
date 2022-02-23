import { useEffect } from "react";
import Counter from "./components/Counter";

const App = () => {
  useEffect(() => {
    // do nth
  }, []);

  return (
    <div>
      <p className="text-3xl">Hello sticky notes!</p>
      <Counter />
    </div>
  );
};

export default App;
