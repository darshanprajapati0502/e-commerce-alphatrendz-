import React from 'react';
import './Hero.css'
import arrow_icon from '../Assets/arrow.png';
import hero_img from '../Assets/hero.png';
export const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>New Arrivals Only.</h2>
        <div>
          <div className="hand-hand-icon">
            <p>New</p>
        </div>
          <p>collections</p>
          <p>for Mens.</p>
        </div>
        <div className="hero-latest-btn">
          <div>Latest Collections</div>

          <img src={arrow_icon} alt="" />
        </div>
      </div>
      <div className="hero-right">
        <div className="heroimg">
          <img src={hero_img} alt="" />
        </div>
      </div>
    </div>
  );
}
 export default Hero