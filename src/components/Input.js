import React, { useEffect } from "react";
import { useState } from "react";
import { Typewriter } from "react-simple-typewriter";

export default function Input() {
  const api = {
    key: "80759a4da43f60267812de0693781be1",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  /*  const wapi = {
   // key: "e65895b6e4d244c9a24110620231411",
    base: "https://api.weatherapi.com/v1/forecast.json?key=e3a2ede78bf54e8cb8694626222311&q=Antalya&days=15",
  }; */

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [days, setDays] = useState([]);
  const [whichDays, setWhichDays] = useState();

  console.log("query:", query);
  console.log("days:", days);
  console.log("whichDays:", whichDays);

  const handleClick = (e) => {
    const value = e.target.value;
    console.log(value);
    setWhichDays(value);
  };

  useEffect(() => {
    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=e65895b6e4d244c9a24110620231411&q=${query}&days=${whichDays}`
    )
      .then((data) => data.json())
      .then((data) => {
        setDays([data]);
      });
  }, [whichDays]);

  console.log(days);

  const search = (event) => {
    if (event.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);

          setWhichDays();
          // console.log(weather);
          console.log(result);
          //setQuery("");
        });
    }
  };

  const data = (d) => {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    let myDate = new Date();
    let cur_time =
      myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds();
    return `${day} ${date} ${month} ${year}      ${cur_time}`;
  };
  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 15
            ? `app warm`
            : `app`
          : `main`
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="search a location:"
            value={query}
            onKeyPress={search}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{data(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temperature">
                {Math.round(weather.main.temp)} °C
              </div>
              <div className="weather"> {weather.weather[0].main} </div>
              <div className="min-max">
                {Math.round(weather.main.temp_min)} °C /
                {Math.round(weather.main.temp_max)} °C
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button className="btn btn-light" onClick={handleClick} value={3}>
                3 days
              </button>
              <button className="btn btn-light" onClick={handleClick} value={5}>
                5 days
              </button>
              <button
                className="btn btn-light"
                onClick={handleClick}
                value={10}
              >
                10 days
              </button>
            </div>
          </div>
        ) : (
          <>
            <h1>
              <Typewriter
                words={["Vaso", "Thomopoulou", "Web Entwicklerin", "!"]}
                loop={true}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </h1>
          </>
        )}

        <div className="d-flex justify-content-center flex-wrap">
          {days[0]?.forecast?.forecastday.length > 1
            ? days[0].forecast?.forecastday?.map((item) => {
                return (
                  <div
                    class="card m-1 weather-box temperature"
                    style={{
                      width: "18rem",
                      boxShadow: "2px 4px 6px rgba(76, 72, 72, 0.5)",
                      backgroundColor: "rgb(255, 255, 255, 0.3)",
                    }}
                  >
                    <div class="card-body">
                      <h5 class="card-title">{item.date}</h5>
                      <p class="card-text">{item.day.maxtemp_c}°C</p>
                      <img src={item.day.condition.icon} alt="img" />
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
      </main>
    </div>
  );
}
