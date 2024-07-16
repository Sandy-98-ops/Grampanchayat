import React from 'react';
import homeImage from '../homeImage.png'; 

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <img src={homeImage} alt="Home" style={{ width: '100%', height: '50%' }} />
    </div>
  );
}

export default Home;