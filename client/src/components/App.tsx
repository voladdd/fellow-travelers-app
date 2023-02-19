import { useEffect } from "react";
import "./App.css";
import { useTelegram } from "../hooks/useTelegram";

function App() {
  const { tg, onClose } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <div className="App">
      <p>{tg.initData}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default App;
