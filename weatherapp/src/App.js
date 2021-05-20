import React from 'react';

import './App.css';

import 'weather-icons/css/weather-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from './app_component/weather.component';
import Form from './app_component/form.component';

// api call api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const API_key="461a0ff685ca5b1a30fe7f2641365672";

class App extends React.Component{
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      farenheit: undefined,
      temp_min: undefined,
      temp_max: undefined,
      description: "",
      error: false
    };
    //this.getWeather();

    this.weathericon = {
      Sunny: "wi-day-sunny",
      Clouds: "wi-cloud",
      Drizzle: "wi-sprinkle",
      Rain: "wi-rain",
      Thunderstorm: "wi-thunderstorm",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-clear",
      Default: "wi-alien"
    }
  }

  calcFarenheit(temp) {
    // (kelvin - 273.15) x 9/5 + 32
    let far = Math.floor((temp - 273.15) * 9 / 5 + 32);
    return far;
  }

  getWeatherIcon(icons, rangeId) {
    switch(true) {
      case rangeId >= 200 && rangeId <= 232:
        this.setState({icon: this.weathericon.Thunderstorm});
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({icon: this.weathericon.Drizzle});
        break;
      case rangeId >= 500 && rangeId <= 522:
        this.setState({icon: this.weathericon.Rain});
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({icon: this.weathericon.Snow});
        break;
      case rangeId >= 700 && rangeId <= 781:
        this.setState({icon: this.weathericon.Atmosphere});
        break;
      case rangeId === 800:
        this.setState({icon: this.weathericon.Clear});
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({icon: this.weathericon.Clouds});
        break;
        default:
          this.setState({icon: this.weathericon.Default})
    }
  }

  getWeather = async e => {

    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if(city && country) {
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`);

      const response = await api_call.json();

      console.log(response);

      this.setState({
        city: `${response.name}, ${response.sys.country}`,
        country: response.sys.country,
        farenheit: this.calcFarenheit(response.main.temp),
        temp_min: this.calcFarenheit(response.main.temp_min),
        temp_max: this.calcFarenheit(response.main.temp_max),
        description: response.weather[0].description,
        error: false

      });

    this.getWeatherIcon(this.weathericon, response.weather[0].id);
    }else{
      this.setState({error: true});
    }
  }
  render() {
    return(
      <div className="App">
        <Form loadweather={this.getWeather} error={this.state.error}/>
        <Weather 
        city={this.state.city}  
        temp_farenheit={this.state.farenheit}
        temp_min={this.state.temp_min}
        temp_max={this.state.temp_max}
        description={this.state.description}
        weahtericon={this.state.icon}
        />  
      </div>
    );
  }
}

export default App;
