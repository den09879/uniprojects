import React, { useRef, useState } from 'react';
import WeatherForm from './WeatherForm';
import WeatherTable from './WeatherTable';
import ListLocations from '../SharedComponents/ListLocations';
import Wind from './Wind';
import WindResult from './WindResult';
import News from './News';

const MainPage = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [windData, setWindData] = useState(undefined);
  const buttonRef = useRef();
  return (
    <div className={`w-100 m-auto rounded d-flex flex-column align-items-center`}>
      <header className='d-flex justify-content-center pb-3 pt-2 w-100 border-bottom mb-2'>
        <h1 className='text-center'>SENG3011 ✨<span className='text-decoration-underline text-info'>P A P A</span>✨ WEATHER</h1>
      </header>
      <div className='d-flex w-100 justify-content-between px-3 gap-3'>
        <div>
          <Wind setWindData={setWindData} />
          <WeatherForm setWeatherData={setWeatherData} />
          <ListLocations />
        </div>
        <div className='w-100'>
          <News buttonRef={buttonRef} />
          <WindResult result={windData} />
          <WeatherTable weatherData={weatherData}/>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
