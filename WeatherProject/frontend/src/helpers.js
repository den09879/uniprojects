// const baseUrl = 'https://5qmp4gs3ud.execute-api.ap-southeast-2.amazonaws.com/F12A_PAPA/weather';
// const baseUrl = 'https://afzpve4n13.execute-api.ap-southeast-2.amazonaws.com/H09A_FOXTROT/graphql';
const baseUrl = 'https://f12a-papa-server.onrender.com'

export const doGqlFetch = async (endpoint) => {
  const res = await fetch(baseUrl + endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return res;
}

export const doWeatherFetch = async (location, hours = 1) => {
  const res = await doGqlFetch(`/weather/${location}/${hours}`);
  const data = await res.json();
  if (res.status === 200) {
    return data.data.createWeather.weathers; 
  }
  else {
    console.log('problem, here')
    return [];
  }
}

export const doListLocation = async (name) => {
  const res = await doGqlFetch(`/list/${name}`);
  const data = await res.json();
  if (res.status === 200) {
    return data.data.listLocations.locations;
  }
  else {
    console.log('problem, here')
    return [];
  }
}

export const doCreateWind = async (location) => {
  const res = await doGqlFetch(`/wind/${location}`);
  const data = await res.json();
  return data.data.createWind.wind_efficiency;
}

export const fetchNews = async () => {
  const res = await doGqlFetch('/news');
  const data = await res.json();
  return data.data.contentSearch.results;
}