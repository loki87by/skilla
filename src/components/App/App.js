import React, { useEffect, useState } from "react";
import { getList } from "../../utils/Api";
import Header from "../Header/Header";
import Calls from "../Calls/Calls";
import "../../vendor/normalize.css";
import "./App.css";

function App() {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    getList("2023-06-02", "2023-06-07", "")
      .then((data) => {
        console.log(data)
        setApiData(data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <aside></aside>
      <main>
        <Header />
        <Calls apiData={apiData} />
      </main>
    </>
  );
}

export default App;
