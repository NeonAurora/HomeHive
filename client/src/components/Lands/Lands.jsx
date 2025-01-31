import React from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "./Lands.css";
import data from "../../utils/slider.json";
import { sliderSettings } from "../../utils/common";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import useProperties from '../../components/hooks/useProperties'
import {PuffLoader} from "react-spinners"

export const Lands = () => {
  const { data, isError, isLoading } = useProperties()
  if(isError){
    return(
        <div className="wrapper">
            <span>Error While Fetching Data</span>
        </div>
    )
}
if(isLoading){
    return(
        <div className="wrapper flexCenter" style={{height:"60vh"}}>
        <PuffLoader
        height="80"
        width="80"
        radius={1}
        color="#4066FF"
        aria-label='puff-loading'
        />
        </div>
    )
}

  return (
    <section className="l-wrapper">
      <div className="paddings innerWidth l-container">
        <div className="l-head flexColStart">
          <span className="orangeText">New Properties</span>
          <span className="primaryText">
            Check out what just become available
          </span>
        </div>
        <Swiper {...sliderSettings}>
          {data.slice(0,8).map((card, i) => (
            <SwiperSlide key={i}>
              <PropertyCard card={card}/>
            </SwiperSlide>
          ))}
          <SliderButtons />
        </Swiper>
      </div>
    </section>
  );
};

export default Lands;

const SliderButtons = () => {
  const swiper = useSwiper();
  return (
    <div className="flexCenter l-buttons">
      <button onClick={() => swiper.slidePrev()}>&lt;</button>
      <button onClick={() => swiper.slideNext()}>&gt;</button>
    </div>
  );
};
