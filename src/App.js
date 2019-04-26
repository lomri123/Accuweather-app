import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import data from "./Sources/citiesList.json";
import { Route, Switch, Redirect } from "react-router-dom";
import forcastData from "./Sources/forcast.json";
import { SearchDS } from "./components/searchDS";
import { WeatherStrip } from "./components/weatherStrip";
import "bootstrap/dist/css/bootstrap.css";
import SingleSelect from "./components/searchRS";
import { ToggleButton } from "./components/toggleButton";

class App extends Component {
  constructor() {
    super();
    this.state = {
      locationsApi: this.getLocations(),
      selectedCity: "",
      weatherForcast: [],
      toggleSearch: "downshift"
    };
  }

  getForcast = async value => {
    const forecast = await axios.get(
      `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${value}?apikey=Pcam0PjGtEMwkxAAI0LL8lIjSlpwkHFS&details=false`
    );
    this.setState({ weatherForcast: forecast.data.DailyForecasts });
  };

  getLocations = () => {
    // const locations = await axios.get(
    //   "http://dataservice.accuweather.com/locations/v1/topcities/150?apikey=Pcam0PjGtEMwkxAAI0LL8lIjSlpwkHFS"
    // );
    const cityCountry = [];
    const locations = data;
    for (let location of locations) {
      let label = location.AdministrativeArea.EnglishName;
      let country = location.Country.EnglishName;
      let code = location.Key;
      cityCountry.push({ label, country, code });
    }
    return cityCountry;
  };

  handleOnChange = (city, code) => {
    this.setState({ selectedCity: city });
    this.getForcast(code);
  };

  handleClick = () => {
    console.log(this.state.weatherForcast, typeof this.state.weatherForcast);
  };

  handleToggleButton = () => {
    let tmpSelection =
      this.state.toggleSearch === "react-select" ? "downshift" : "react-select";
    this.setState({ toggleSearch: tmpSelection });
  };

  render() {
    return (
      <div className="App">
        <ToggleButton
          handleToggleButton={this.handleToggleButton}
          toggleName={this.state.toggleSearch}
        />
        <h1 className="m-5">Get Weather Forcast</h1>
        <Switch>
          <Route
            path="/react-select"
            render={props => (
              <SingleSelect
                locations={this.state.locationsApi}
                handleOnChange={this.handleOnChange}
                {...props}
              />
            )}
          />
          <Route
            path="/downshift"
            render={props => (
              <SearchDS
                cityData={this.state.locationsApi}
                handleOnChange={this.handleOnChange}
                {...props}
              />
            )}
          />
          <Redirect exact from="/" to="/react-select" />
        </Switch>
        {Object.keys(this.state.weatherForcast).length === 0 ? null : (
          <WeatherStrip weatherForcastInfo={this.state.weatherForcast} />
        )}
      </div>
    );
  }
}

export default App;
