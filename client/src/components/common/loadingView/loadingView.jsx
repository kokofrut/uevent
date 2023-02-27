import React from 'react';

import './loadingView.css'

function LoadingView() {
  return (
    <div className="loading-screen">
      <div className="spinning-circle"></div>
      <p>Loading...</p>
    </div>
  );
}

export default LoadingView;