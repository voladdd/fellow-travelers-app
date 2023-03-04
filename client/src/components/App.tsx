import { useEffect, useState } from "react";
import "./App.css";
import { useTelegram } from "../hooks/useTelegram";
import { authHost } from "../http";

function App() {
  const { tg } = useTelegram();
  const [data, setData] = useState<any>("sample data");

  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <div className="App">
      <p>{data}</p>
      <button
        onClick={async () => {
          const response = await authHost.get("/tours");
          console.log(response.data);
        }}
      >
        fetch data
      </button>
    </div>
  );
}

export default App;
