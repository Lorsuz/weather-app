import React, { useState } from 'react';
import "./Weather.App.css";

import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";

let WeatherApp = () => {

	let apiKey = "8c6f9d5fb76f8eb1615a84a44f69d414";
	let data = {
		name: "No City",
		main: {
			temp: 273.15,
			humidity: 0
		},
		weather: { icon: clear_icon },
		wind: { speed: 0 }

	};
	let [ weatherData, setWeatherData ] = useState( data );

	let search = async () => {
		let element = document.getElementsByClassName( "cityInput" );
		if ( element[ 0 ].value === "" ) {
			return 0;
		} else {
			let url = `https://api.openweathermap.org/data/2.5/weather?q=${ element[ 0 ].value }&appid=${ apiKey }`;
			console.log( url);
			let response = await fetch( url );
			weatherData = await response.json();

			if (
				weatherData.weather[ 0 ].icon === "01d" ||
				weatherData.weather[ 0 ].icon === "01n"
			) {
				weatherData.weather.icon = clear_icon;
			} else if (
				weatherData.weather[ 0 ].icon === "02d" ||
				weatherData.weather[ 0 ].icon === "02n"
			) {
				weatherData.weather.icon = cloud_icon;
			} else if (
				weatherData.weather[ 0 ].icon === "03d" ||
				weatherData.weather[ 0 ].icon === "03n" ||
				weatherData.weather[ 0 ].icon === "04d" ||
				weatherData.weather[ 0 ].icon === "04n"
			) {
				weatherData.weather.icon = drizzle_icon;
			} else if (
				weatherData.weather[ 0 ].icon === "09d" ||
				weatherData.weather[ 0 ].icon === "09n" ||
				weatherData.weather[ 0 ].icon === "10d" ||
				weatherData.weather[ 0 ].icon === "10n"
			) {
				weatherData.weather.icon = rain_icon;
			} else if (
				weatherData.weather[ 0 ].icon === "13d" ||
				weatherData.weather[ 0 ].icon === "13n"
			) {
				weatherData.weather.icon = snow_icon;
			} else weatherData.weather.icon = clear_icon;

			setWeatherData( weatherData );
		}
	};
	return (
		<div className="container">
			<div className="top-bar">
				<input type="text" className="cityInput" name="" id="" placeholder="Search" />
				<div className="search-icon" onClick={ () => search() }>
					<img src={ search_icon } alt="" />
				</div>
			</div>

			<div className="weather-image">
				<img src={ weatherData.weather.icon } alt="" />
			</div>
			<div className="weather-temp">{ ( weatherData.main.temp - 273.15 ).toFixed( 1 ) }°C</div>
			<div className="weather-location">{ weatherData.name }</div>
			<div className="data-container">
				<div className="element">
					<img src={ humidity_icon } alt="" className="icon" />
					<div className="details-text">
						<div className="data">{ weatherData.main.humidity }%</div>
						<div className="text">Humidity</div>
					</div>
				</div>
				<div className="element">
					<img src={ wind_icon } alt="" className="icon" />
					<div className="details-text">
						<div className="data">{ weatherData.wind.speed } km/h</div>
						<div className="text">Wind Speed</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WeatherApp;