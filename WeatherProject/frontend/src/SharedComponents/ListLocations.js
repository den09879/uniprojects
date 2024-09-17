import React, { useRef, useState } from 'react';
import { doListLocation } from '../helpers';

const ListLocations = () => {
  const [locations, setLocations] = useState([]);
  const [errMsg, setErrMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const formRef = useRef();
  const getLocations = () => {
    setLoading(true);
    (async () => {
      const res = await doListLocation(formRef.current.name.value.trim());
      if (res.length === 0) {
        setErrMsg('No locations found');
      }
      if (res.length > 5) {
        setErrMsg('Showing first 6 results');
      }
      setLocations(res);
      setLoading(false);
    })();
  };
  const onClick = (e) => {
    e.preventDefault();
    if (!formRef.current.reportValidity()) {
      return;
    }
    if (formRef.current.name.value.trim() === '') {
      setErrMsg('Location cannot be empty');
      return;
    }
    getLocations();
  }
  return (
    <div>
      <form ref={formRef} className='border rounded p-3 border-info mt-3'>
        <h5 className='text-decoration-underline text-info'>Check locations</h5>
        {loading 
          ? <div className="spinner-border text-primary" role="status"></div>
          : undefined
        }
        {errMsg === '' ? undefined : <p className='text-danger'>{errMsg}</p>}
        <div className='form-group mt-3'>
          <label htmlFor='name' className='input-label'>Enter location to check</label>
          <input required onChange={() => setErrMsg('')} className='form-control' id='name' placeholder='Name of location' />
        </div>
        <button className='btn btn-primary mt-3' onClick={onClick}>Check</button>
      </form>
      <div>
        <ul className="list-group">
          {locations.map((ea, i) => i > 5 ? undefined : <li key={i} className='list-group-item'>{ea}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default ListLocations;
