import React, { useEffect, useState } from "react";
import { getList, getPersonsList } from "../../utils/Api";
import { DATE_OPTIONS } from "../../utils/consts";
import Menu from "../Menu/Menu";
import Header from "../Header/Header";
import Calls from "../Calls/Calls";
import "../../vendor/normalize.css";
import "./App.css";

function App() {
  const [apiData, setApiData] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [search, setSearch] = useState('');
  const [period, setPeriod] = useState(NaN);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    getList("2023-06-02", "2023-06-07", "", "")
      .then((data) => {
        setApiData(data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (startDate !== null && endDate !== null) {
      const stringStart = new Intl.DateTimeFormat("ru-RU", DATE_OPTIONS)
        .format(startDate)
        .split(",")[1]
        .slice(1, 9)
        .split(".")
        .reverse()
        .join("-");
      const stringEnd = new Intl.DateTimeFormat("ru-RU", DATE_OPTIONS)
        .format(endDate)
        .split(",")[1]
        .slice(1, 9)
        .split(".")
        .reverse()
        .join("-");
      getList(stringStart, stringEnd, search, filters.length > 0 ? filters : '')
        .then((data) => {
          console.log(data);
          setApiData(data.results);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [endDate, filters, search, startDate]);

  useEffect(() => {
    getPersonsList('', '')
      .then((data) => {
        console.log(data);
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
          filters={filters}
          setFilters={setFilters}
          setSearch={setSearch}
          setPeriod={setPeriod}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      </main>
    </>
  );
}

export default App;
