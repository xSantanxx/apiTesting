import { useState } from "react"; 
import "./App.css"; //import styling
import { useEffect } from "react";

function App(){
  const [city, setCity] = useState(""); //input for the city
  const [weather, setWeather] = useState(null); // holds the weather response data
  const [error, setError] = useState(""); //holds the error message
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  }); //default mode is light
  const [loading, setLoading] = useState(false); //start loading

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if(savedTheme === "true"){
      setDarkMode(true);
    }
  }, []);


  //effect for dark mode  
  useEffect(() => {

    /*localStorage.setItem("darkMode", darkMode);*/

    if(darkMode){
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "true");

    }
    else{
      document.body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  //background 
  useEffect(() => {

    if(weather?.description){
      const desc = weather.description.toLowerCase();

      console.log(desc);

      if(desc.includes("clear sky") || desc.includes("sun")){
        document.body.className = "sunny-bg";
      } else if(desc.includes("cloud") || desc.includes("few clouds")){
        document.body.className = "cloudy-bg";
      } else if (desc.includes("light intensity drizzle")){
        document.body.className = "rainy-bg";
      } else if (desc.includes("snow")){
        document.body.className = "snowy-bg";
      } else if(desc.includes("mist")){
        document.body.className = "mist";
      } 
      else {
        document.body.className = "";
      }
    }
  }, [weather]);

  //add weather messages
  function getWeatherMessage(description){
    description = description.toLowerCase();

    if(description.includes("light intensity drizzle")) return "Make sure you carry your umbrella!";
    if(description.includes("clear sky")) return "It's a beautiful day";
    if(description.includes("mist")) return "Ooooo, it's cloudy";

    return "Have a nice day";
  }


  //function that runs when the user submits the form
  const fetchWeather = async (e) => {
    e.preventDefault();
    setLoading(true); // loading starts
    setError("");

    if(!city){
      setError("Please enter a city");
      return;
    }

    try{
      //connection between the frontend and backend
      const response = await fetch(`http://localhost:3000/api/weather?city=${city}`);
      const data = await response.json();

      if(response.ok){
        setWeather(data); //save the weather data to state
        setError(""); //removes any previous error
      }
      else{
        setError(data.error || "Failed to fetch weather");
        setWeather(null);
      }
    } catch(err){
      setError("Network error or server is down.");
      setWeather(null);
    }
    finally {
      setLoading(false);
    }
  }

  return(
  <div className="app">
    <h1>World Global 🌎</h1>

    <button onClick={() => setDarkMode(!darkMode)}>
      Switch to {darkMode ? "Light" : "Dark"} Mode
    </button>
    {/*search form*/}
    <form onSubmit={fetchWeather}>
      {/*value = city: input value comes from the city state*/}
      {/*onChange allows updates to the city being displayed*/}
      <input type="text" placeholder="Enter city" value={city} onChange={(e) => setCity(e.target.value)} />
      <button type="submit">Enter Weather</button>
    </form>

    {/* Shows an error if present */}
    {error && <p className="error">{error}</p>}

    {/*start the loading part */}
    {loading && <div className="spinner"></div>}

    {/*skeleton shimmer */}
    {loading && (
      <div className="skeleton-screen">
        <div className="skeleton title"></div>
        <div className="skeleton text"></div>
        <div className="skeleton text"></div>
        <div className="skeleton image"></div>
      </div>
      
    )}

    {/* if the weather is present, display it */}
    {weather && (
      <div className="weather-Info">
        <h2>{weather.city}</h2>
        <h3>
          {weather.city}, {weather.state && `${weather.state}, `}{weather.country}
        </h3>
        {/* <p>Here: {weather.icon}</p> */}
        <p>{weather.description.charAt(0).toUpperCase() + weather.description.slice(1)}</p>
        <p>Temperature: {Math.round(weather.temperature)}F</p>
        <p>Feels like: {Math.round(weather.feels_like)}F</p>
        <p>Date: {weather.local_date}</p>

        {/* if the weather icon needed */}
        <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="weather icon" />
        <p className="message">{getWeatherMessage(weather.description)}</p>
      </div>
    )}
  </div>
  );
}

export default App;

