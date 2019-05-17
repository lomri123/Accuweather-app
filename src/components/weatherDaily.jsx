import React from "react";
import Moment from "react-moment";

export const WeatherStrip = ({
  weatherData,
  selectedCity,
  selectedDay,
  handleDaySelection
}) => {
  return (
    <div className="container col-6 mx-auto mt-2 gray  rounded text-white ">
      {weatherData[0] ? (
        <div className="d-flex p-2 bd-highlight justify-content-center top-weather">
          <div className="flex-row bd-highlight">
            <h4>{selectedCity}</h4>
            <Moment format="dddd">{weatherData[selectedDay].Date}</Moment>

            <div className="flex-row bd-highlight">
              <img
                src={`https://developer.accuweather.com/sites/default/files/${
                  weatherData[selectedDay].Day.Icon >= 10
                    ? weatherData[selectedDay].Day.Icon
                    : "0" + weatherData[selectedDay].Day.Icon
                }-s.png`}
                alt="weather-icon"
              />
              <p>{weatherData[selectedDay].Day.IconPhrase}</p>
            </div>
          </div>
        </div>
      ) : null}

      <div className="d-flex p-2 bd-highlight justify-content-center bottom-weather">
        {weatherData.map((day, index) => (
          <div
            className={`single-day ${selectedDay === index ? "selected" : ""}`}
            onClick={() => handleDaySelection(index)}
            key={day.EpochDate}
          >
            <div className="flex-row bd-highlight m-2 ">
              <h6>
                <Moment format="ddd">{day.Date}</Moment>
              </h6>
              <img
                className="small-image"
                src={`https://developer.accuweather.com/sites/default/files/${
                  day.Day.Icon >= 10 ? day.Day.Icon : "0" + day.Day.Icon
                }-s.png`}
                alt="weather-icon"
              />
              <h6>{`${day.Temperature.Maximum.Value}°F`}</h6>
              <h6>{`${day.Temperature.Minimum.Value}°F`}</h6>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
