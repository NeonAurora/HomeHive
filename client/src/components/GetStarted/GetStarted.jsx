import React from "react";
import { HiOutlineMail } from "react-icons/hi";
import { HiLocationMarker } from "react-icons/hi";
import "./GetStarted.css";

export const GetStarted = () => {
  return (
    <section className="g-wrapper">
      <div className="paddings innerWidth g-container">
        <div className="flexColCenter inner-container">
          <span className="primaryText">
            Be The First to Know About New Listings
          </span>
          <span className="secondaryText">
            Receive Updates On The Latest Properties & Unbeatable Deals
          </span>
          <button className="button"><a href="http://buy.landersinvestment.com/subscribe/">Get Started</a></button>
        </div>
      </div>
    </section>
  );
};

export default GetStarted;
