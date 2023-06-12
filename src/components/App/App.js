import React, { useEffect, useState } from "react";
import { getList } from "../../utils/Api";
import Menu from "../Menu/Menu";
import Header from "../Header/Header";
import Calls from "../Calls/Calls";
import "../../vendor/normalize.css";
import "./App.css";

function App() {
  const [apiData, setApiData] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [period, setPeriod] = useState(3);
  console.log(startDate, endDate);

  useEffect(() => {
    getList("2023-06-02", "2023-06-07", "")
      .then((data) => {
        console.log(data);
        setApiData(data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Menu />
      <main>
        <Header />
        <Calls
          apiData={apiData}
          startDate={startDate}
          endDate={endDate}
          period={period}
          setPeriod={setPeriod}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      </main>
    </>
  );
}

export default App;
