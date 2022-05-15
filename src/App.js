import './App.css';
import MainPage from './javascript/components/MainPage';
import React, { useState } from 'react';
import Header from './javascript/components/Header';
import axios from 'axios';


function App() {

  const apiKey = '4eae7754e7de8e8a56603c411bc3c4b8'
  const [weatherData, setWeatherData] = useState([{}])
  const [city, setCity] = useState("")

  const getWeather = (event) => {
    if (event.key === "Enter") {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apiKey}`).then(
        response => response.json()
      ).then(
        data => {
          setWeatherData(data)
          setCity("")
        }
      )
    }
  }


  const handleWeatherMessageSend = async (e) => {
    const button = e.target;
    const language = button.value;
    const senderName = document.getElementById('senderName').value;
    const receiverMail = document.getElementById('receiverMail').value;
    const messageContent = document.getElementById('messageContent').value + ' ' + weatherData.name + ' ' + Math.round((weatherData.main.temp - 32) * 0.5556) + ' ' + weatherData.weather[0].main;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/messages/send`,
        {
          language,
          senderName,
          receiverMail,
          messageContent,
          senderMail: 'edith.dragoi@gmail.com'
        }
      )

      console.log(response)

      if (response) {
        alert(`\nE-mail sent`)
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='APP'>
      <Header title={'Weather Subscription App'} />

      <div className='container'>
        <input
          className='input'
          placeholder='Enter City...'
          onChange={e => setCity(e.target.value)}
          value={city}
          onKeyPress={getWeather}
        />


        {typeof weatherData.main === 'undefined' ? (
          <div>
            <p>Welcome to weather app! Enter your city to get current weather data</p>
          </div>
        ) : (
          <div className='weather-data'>
            <p className='city'>{weatherData.name}</p>
            <p className='temp'>{Math.round((weatherData.main.temp - 32) * 0.5556)} ℃</p>
            <p className='weather'>{weatherData.weather[0].main}</p>
          </div>
        )}

        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2 capitalize'
          onClick={handleWeatherMessageSend}
        >
          Send Weather e-mail
        </button>
      </div>
      <div className="App">
        <MainPage />
      </div>
    </div>
  );
}

export default App;