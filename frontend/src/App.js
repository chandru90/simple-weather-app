import React, { useEffect, useState } from 'react';
import { CircularProgress, Slide, TextField } from '@mui/material';
import './App.css';
import image1 from './image1.png'

function App() {
  const [cityName, setCityName] = useState('puducherry');
  const [inputText, setInputText] = useState('');
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://chandru-weather.onrender.com/weather/${cityName}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Something went wrong');
        }
      })
      .then((data) => {
        setData(data);
        setError(false);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [cityName]);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setCityName(e.target.value);
      setInputText('');
    }
  };

  return (
   <div className="bg_img">
      {!loading ? (
        <>
        <div className='bg-container'>
          <TextField
            variant="filled"
            label="Search location"
            className="input"
            error={error}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleSearch}
          />
          <h1 className="city">{data.name}</h1>
          <div className="group">
            
            <h1>{data.weather?.[0]?.main}</h1>
          </div>

          <h1 className="temp">{data.main?.temp?.toFixed()} °C</h1>

          <Slide direction="right" timeout={800} in={!loading}>
            <div className="box_container">
              <div className="box">
                <p>Humidity</p>
                <h1>{data.main?.humidity?.toFixed()}%</h1>
              </div>

              <div className="box">
                <p>Wind</p>
                <h1>{data.wind?.speed?.toFixed()} km/h</h1>
              </div>

              <div className="box">
                <p>Feels Like</p>
                <h1>{data.main?.feels_like?.toFixed()} °C</h1>
              </div>
            </div>
           
          </Slide>
          </div>
        </>
        
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

export default App;
