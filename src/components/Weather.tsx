import React, { useState, KeyboardEvent} from "react";
import axios from "axios";
import "../styles/weather.css";
import key from "../keys"

export default function Weather() {
    const [location, setLocation] = useState(``);
    const [data, setData] = useState({
        name: ``,
        main: {
            temp: 0,
            temp_min: 0,
            temp_max: 0,
            humidity: 0
        },
        weather: [{
            main: ``,
            description: ``,
            icon: ``
        }],
        wind: {
            speed: 0,
            deg: 0
        },
        clouds: {
            all: 0
        },
        sys: {
            country: ``,
            sunrise: 0,
            sunset: 0
        },
        timezone: 0,
    });
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}`;

    const searchLocation = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key === `Enter`) {
            axios.get(url).then((response) => {
                setData(response.data);
                console.log(response.data);
            });
            setLocation(``);
        }
    }

    function current_weather(temp: number): number {
        return Math.round((temp - 273.15) * 9/5 + 32);
    }


    return (
        <div className="weather">
            <div className="container">
                <div className="search">
                    <input 
                        value={location}
                        type="text" 
                        placeholder="Enter location" 
                        onChange={(e) => setLocation(e.target.value)} 
                        onKeyPress={searchLocation} 
                    />
                </div>
                <div className="current_weather">
                        <div>
                            {data.name ? <h1>{data.name}</h1> : null}
                            {data.main.temp ? <h1 className={current_weather(data.main.temp) > 32 ? "temp_warm" : "temp_cold"}>{current_weather(data.main.temp)}°F</h1> : null}
                        </div>
                        <div>
                            {data.weather[0].main ? <h3>{data.weather[0].main}</h3> : null}
                            {data.weather[0].description ? <p>{data.weather[0].description}</p> : null}
                        </div>
                </div>

                <div className="related_info">
                    <div>
                        {data.main.temp_min ? <p>Low: {current_weather(data.main.temp_min)}°F</p> : null}
                        {data.main.temp_max ? <p>High: {current_weather(data.main.temp_max)}°F</p> : null}
                    </div>
                    <div>
                        {data.main.humidity ? <p>Humidity: {data.main.humidity}%</p> : null}
                        {data.wind.speed ? <p>Wind: {data.wind.speed} mph</p> : null}
                    </div>
                    <div>
                        {data.sys.sunrise ? <p>Sunrise: {new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p> : null}
                        {data.sys.sunset ? <p>Sunset: {new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p> : null}
                    </div>
                </div>

                <div className="weather-icon">
                    <div>
                        {data.weather[0].icon ? <img className="weather_image" src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="weather icon" /> : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
