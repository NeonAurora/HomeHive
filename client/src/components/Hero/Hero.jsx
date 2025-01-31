import React from "react";
import "./Hero.css";
import CountUp from "react-countup";
import {motion} from 'framer-motion'
import Search from "../Search/Search";
const Hero = () => {
  return (
    <section className="hero-wrapper">
      <div className="paddings innerWidth flexCenter hero-container">
        <div className="flexColStart hero-left">
          <div className="hero-title">
            <div className="orange-circle" />
            <motion.h1
            initial={{y: "2rem", opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{
              duration: 2,
              type: "spring"
            }}
            >
              Discover
              <br />
              Your Dream Land
              <br />
              Today
            </motion.h1>
          </div>
          <div className="flexColStart hero-des">
            <span className="secondaryText">
              Our mission is to simplify the land-buying
              <br /> experience by offering direct sales and expert guidance
            </span>
            <span className="secondaryText">
              Whether you're seeking the perfect plot to build your dream home
              <br /> or a lucrative investment opportunity, <br /> we provide
              the tools and expertise to make it happen
            </span>
          </div>
          <Search/>
          <div className="flexCenter stats">
            <div className="flexColStart stat">
              <span>
              <CountUp start={50} end={100} duration={2}/>
              <span>+</span>
              </span>
              <span className="secondaryText">Exclusive Listings!</span>
            </div>
            <div className="flexColStart stat">
              <span>
              <CountUp start={100} end={200} duration={2}/>
              <span>+</span>
              </span>
              <span className="secondaryText">Property Sold!</span>
            </div>
            <div className="flexColStart stat">
              <span>
              <CountUp start={100} end={150} duration={2}/>
              <span>+</span>
              </span>
              <span className="secondaryText">Happy Buyers</span>
            </div>
          </div>
        </div>
        <div className="flexCenter hero-right">
          <motion.div
          initial={{x: "7rem", opacity: 0}}
          animate={{x: 0, opacity: 1}}
          transition={{ 
            duration: 2,
            type: "spring"
          }}
          className="image-container">
            <img src="./banner.jpg" alt="Landers Banner" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
