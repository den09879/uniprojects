import React from 'react';

const WindResult = ({ result }) => {
  if (result === null || result === undefined) {
    return;
  }
  const toGoodForm = () => {
    let res = parseFloat(result);
    res *= 100;
    res = res.toFixed(2);
    return res;
  }
  return (
    <div className='text-center border-bottom mb-3'>
      <h3>Wind efficency of the area relative to the past 24 hours is: {toGoodForm()}%</h3>
    </div>
  );
};

export default WindResult;
