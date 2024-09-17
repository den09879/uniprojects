import React, { useRef, useState } from 'react';
import { doCreateWind } from '../helpers';

const Wind = ({
  setWindData
}) => {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const formRef = useRef();
  const getWindData = () => {
    setLoading(true);
    (async () => {
      const res = await doCreateWind(formRef.current.windLocation.value.trim());
      if (res === null || res.length === 0) {
        setErrMsg('Location invalid');
        setLoading(false);
        return;
      } else {
        setWindData(res);
      }
      setLoading(false);
    })();
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (!formRef.current.reportValidity()) {
      return;
    }
    if (formRef.current.windLocation.value.trim() === '') {
      setErrMsg('Location cannot be empty');
      return;
    }
    getWindData();
  };
  return (
    <div className='mb-3'>
      <form ref={formRef} className='rounded border p-3 border-info'>
        <h5 className='text-decoration-underline text-info'>Wind efficiency</h5>
        {loading 
          ? <div className="spinner-border text-primary" role="status"></div>
          : undefined
        }
        {errMsg === '' ? undefined : <p className='text-danger'>{errMsg}</p>}
        <div className='form-group'>
          <label htmlFor='windLocation' className='input-label'>Location</label>
          <input required onChange={() => setErrMsg('')} className='form-control' id='windLocation' placeholder='Yamba' />
        </div>
        <button onClick={onSubmit} type='submit' className='btn btn-primary mt-3'>Submit</button>
      </form>
    </div>
  );
};

export default Wind;
