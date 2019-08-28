import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import DropdownSelect from "./components/DropdownSelect";
import { WeeklyWeatherContainer } from "./components/WeeklyWeatherContainer";

class App extends Component {
  constructor() {
    super();
    this.state = {
      locationsApi: [],
      selectedCity: "",
      weatherForcast: [],
      selectedDay: "0"
    };
  }

  async componentDidMount() {
    await this.getLocations();
  }

  getForcast = async value => {
    const forecast = await axios.get(
      `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${value}?apikey=Pcam0PjGtEMwkxAAI0LL8lIjSlpwkHFS&details=true`
    );
    this.setState({
      weatherForcast: forecast.data.DailyForecasts
    });
  };

  getLocations = async () => {
    const locations = await axios.get(
      "http://dataservice.accuweather.com/locations/v1/topcities/150?apikey=Pcam0PjGtEMwkxAAI0LL8lIjSlpwkHFS"
    );
    const cityCountry = [];
    for (let location of locations.data) {
      let label = location.AdministrativeArea.EnglishName;
      let value = location.Country.EnglishName;
      let code = location.Key;
      cityCountry.push({ label, value, code });
    }
    this.setState({ locationsApi: cityCountry });
  };

  handleOnChange = (city, code) => {
    this.setState({ selectedCity: city });
    this.getForcast(code);
  };

  handleDaySelection = e => {
    this.setState({
      selectedDay: e
    });
  };

  render() {
    return (
      <div className="App">
        <h1 className="m-5">Weather Forcast</h1>
        <DropdownSelect
          locations={this.state.locationsApi}
          handleOnChange={this.handleOnChange}
        />

        {Object.keys(this.state.weatherForcast).length === 0 ? null : (
          <WeeklyWeatherContainer
            handleDaySelection={this.handleDaySelection}
            selectedDay={this.state.selectedDay}
            selectedCity={this.state.selectedCity}
            weatherData={this.state.weatherForcast}
          />
        )}
      </div>
    );
  }
}

export default App;
