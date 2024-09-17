import React from 'react';

const WeatherTable = ({
  weatherData
}) => {
  if (weatherData.length === 0) {
    return;
  }
  return (
    <table className='table border'>
      <thead>
        <tr>
          <th scope='col'>{weatherData[0].location} on {weatherData[0].date}</th>
          <th scope='col'>Temp (&deg;C)</th>
          <th scope='col'>Apparent temp (&deg;C)</th>
          <th scope='col'>Dew point (&deg;C)</th>
          <th scope='col'>Relative humidity (%)</th>
          <th scope='col'>Wind direction</th>
          <th scope='col'>Wind speed (knots)</th>
          <th scope='col'>Rain (mm)</th>
        </tr>
      </thead>
      <tbody>
        {weatherData.map((ea, i) => <tr key={i}>
          <th scope='row'>{ea.time}</th>
          <td>{ea.temperature}</td>
          <td>{ea.apparent_temp}</td>
          <td>{ea.dew_point}</td>
          <td>{ea.relative_humidity}</td>
          <td>{ea.wind_direction}</td>
          <td>{ea.wind_speed}</td>
          <td>{ea.rain}</td>
        </tr>)}
      </tbody>
    </table>
  );
};

export default WeatherTable;
