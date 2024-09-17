import React, { useEffect, useState } from 'react';
import { fetchNews } from '../helpers';
import NewsCard from './NewsCard';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const res = await fetchNews();
      setNews(res);
      setLoading(false);
    })();
  }, []);
  return (
    <div>
      <p>
        <button className="w-100 btn btn-outline-primary" type="button" data-bs-toggle="collapse" data-bs-target="#newsCollapse" aria-expanded="false" aria-controls="newsCollapse">
          News on weather events
        </button>
      </p>
      <div className="collapse show" id="newsCollapse">
        {loading ? <div className='d-flex w-100 justify-content-around'>
          <div className="spinner-grow text-primary" role="status"></div>
          <div className="spinner-grow text-secondary" role="status"></div>
          <div className="spinner-grow text-success" role="status"></div>
          <div className="spinner-grow text-danger" role="status"></div>
          <div className="spinner-grow text-warning" role="status"></div>
        </div> : undefined}
        {news.map((ea, i) => <NewsCard key={i} {...ea} />)}
      </div>
    </div>
  );
};

export default News;
