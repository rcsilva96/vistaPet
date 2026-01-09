import React from 'react';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Bem-vindo ao vistaPet</h1>
        {/* <img src={LogoVistaPet} alt="Logo VistaPet" className="logo" width={550} /> */}
      </div>
    </div>
  );
};

export default Home;
