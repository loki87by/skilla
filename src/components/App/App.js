import React, { useEffect, useState } from "react";
import { getList, getPersonsList, getMenu, getProfile } from "../../utils/Api";
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
  const [search, setSearch] = useState("");
  const [period, setPeriod] = useState(NaN);
  const [filters, setFilters] = useState([]);
  const [rates, setRates] = useState([]);
  const [innerFilters, setInnerFilters] = useState([]);
  const [outerFilters, setOuterFilters] = useState([]);

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
      getList(stringStart, stringEnd, search, filters.length > 0 ? filters : "")
        .then((data) => {
          if (innerFilters.length === 0 && outerFilters.length === 0) {
            setApiData(data.results);
          } else {
            let arr = data.results.slice();
            if (outerFilters.length > 0) {
              outerFilters.forEach((i) => {
                if (i.key === "is") {
                  const tmp = arr.filter((item) => {
                    if (item[i.params[0]] === item[i.params[1]]) {
                      return i;
                    } else {
                      return null;
                    }
                  });
                  arr = tmp;
                }
                if (i.key === "not") {
                  const tmp = arr.filter((item) => {
                    if (
                      item[i.params[0]].toString() === i.params[1].toString()
                    ) {
                      return null;
                    } else {
                      return item;
                    }
                  });
                  arr = tmp;
                }
              });
            }
            if (innerFilters.length > 0) {
              innerFilters.forEach((i) => {
                if (i.key === "is") {
                  const tmp = arr.filter((item) => {
                    if (item[i.params[0]] === item[i.params[1]]) {
                      return i;
                    } else {
                      return null;
                    }
                  });
                  arr = tmp;
                }
                if (i.key === "not") {
                  const tmp = arr.filter((item) => {
                    if (
                      rates.some(
                        (r) =>
                          r.id === item.id && r[i.params[0]] === r[i.params[1]]
                      )
                    ) {
                      return null;
                    } else {
                      return i;
                    }
                  });
                  arr = tmp;
                }
              });
            }
            setApiData(arr);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [endDate, filters, innerFilters, outerFilters, rates, search, startDate]);

  useEffect(() => {
    getPersonsList()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getMenu()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getProfile()
      .then((res) => {
        console.log(res);
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
          startDate={startDate}
          endDate={endDate}
          period={period}
          filters={filters}
          apiData={apiData}
          setFilters={setFilters}
          setSearch={setSearch}
          setPeriod={setPeriod}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setInnerFilters={setInnerFilters}
          setOuterFilters={setOuterFilters}
          setRates={setRates}
        />
      </main>
    </>
  );
}

export default App;
