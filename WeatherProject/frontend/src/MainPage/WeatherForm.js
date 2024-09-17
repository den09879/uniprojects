import React, { useRef, useState } from 'react';
import { doWeatherFetch } from '../helpers';

const WeatherForm = ({
  setWeatherData
}) => {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const formRef = useRef();
  const getWeatherData = () => {
    setLoading(true);
    (async () => {
      const res = await doWeatherFetch(formRef.current.location.value.trim(), parseInt(formRef.current.hours.value));
      if (res === null || res.length === 0) {
        setErrMsg('Location invalid');
        setLoading(false);
        return;
      } else {
        setWeatherData(res);
      }
      setLoading(false);
    })();
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (!formRef.current.reportValidity()) {
      return;
    }
    if (formRef.current.location.value.trim() === '') {
      setErrMsg('Location cannot be empty');
      return;
    }
    getWeatherData();
  };
  return (
    <form ref={formRef} className='rounded border p-3 border-info'>
      <h5 className='text-decoration-underline text-info'>Weather information</h5>
      {loading 
        ? <div className="spinner-border text-primary" role="status"></div>
        : undefined
      }
      {errMsg === '' ? undefined : <p className='text-danger'>{errMsg}</p>}
      <div className='form-group mt-3'>
        <label htmlFor='location' className='input-label'>Location</label>
        <input required onChange={() => setErrMsg('')} className='form-control' id='location' placeholder='Yamba' />
      </div>
      <div className='form-group mt-3'>
        <label htmlFor='hours' className='input-label'>Number of hours of data</label>
        <input required onChange={() => setErrMsg('')} type='number' min={1} className='form-control' id='hours' defaultValue={1} />
      </div>
      <button onClick={onSubmit} type='submit' className='btn btn-primary mt-3'>Submit</button>
    </form>
  );
};

export default WeatherForm;
