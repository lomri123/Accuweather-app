import React from "react";

export const WeatherStrip = props => {
  return (
    <div className="d-flex p-2 bd-highlight justify-content-center col-10 mx-auto">
      {props.weatherForcastInfo.map(day => (
        <div
          className="p-2 bd-highlight border border-primary m-2"
          key={day.EpochDate}
        >
          <h6>{day.Date.slice(0, 10)}</h6>
          <img
            src={`https://developer.accuweather.com/sites/default/files/${
              day.Day.Icon >= 10 ? day.Day.Icon : "0" + day.Day.Icon
            }-s.png`}
            alt="weather-icon"
          />
          <div>
            {`${day.Temperature.Maximum.Value}°`}
            <sub>Hi</sub> {`/ ${day.Temperature.Minimum.Value}°`}
            <sub>Low</sub>
          </div>
          {/* <p>{day.IconPhrase}</p> */}
        </div>
      ))}
    </div>
  );
};
