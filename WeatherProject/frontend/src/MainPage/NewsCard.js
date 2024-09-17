import React from 'react';

const NewsCard = ({
  webPublicationDate,
  webTitle,
  webUrl,
}) => {
  
  return (
    <div className='card mb-1'>
      <div className='card-header'>
        <h3>{`${webTitle}`}</h3>
      </div>
      <div className='card-body'>
        <p>Published on {new Date(webPublicationDate).toLocaleDateString()}</p>
        <a className='link link-info' href={webUrl}>{webUrl}</a>
      </div>
    </div>
  );
};

export default NewsCard;
