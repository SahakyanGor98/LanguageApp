// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";

import { useDispatch, useSelector } from "react-redux";
import { getCount } from "./store/slices/count/countSlice";
import { AppDispatch } from "./store/setup";
import { increment, decrement } from "./store/slices/count/countSlice";
import ConversationForm from "./components/ConversationImage/ConversationImage";
import Paragraphs from "./components/ConversationParagraphs/Paragraphs";

function App() {
  const count = useSelector(getCount);

  const dispatch = useDispatch<AppDispatch>();

  const decrementCount = () => {
    dispatch(decrement());
  };

  const incrementCount = () => {
    dispatch(increment());
  };

  return (
    <div className="app">
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div> */}
      <div className="card">
        <button onClick={decrementCount}>-</button>
        <p>Count = {count}</p>
        <button onClick={incrementCount}>+</button>
      </div>
      <div>
        <Paragraphs />
        <ConversationForm />
      </div>
    </div>
  );
}

export default App;
