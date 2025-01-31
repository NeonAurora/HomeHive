import React from "react";
import "./Footer.css";

export const Footer = () => {
  return (
    <section className="f-wrapper">
      <div className="paddings innerWidth flexCenter f-container">
        <div className="flexColStart f-left">
          <img src="logo-dark.svg" alt="Landers-Logo" width={175} />
          <span className="secondaryText">
            Your journey to owning property made simple. <br /> We're with you
            at every step
          </span>
        </div>
        <div className="flexColStart f-right">
        <span className="primaryText">Buy Your Land</span>
        <span className="secondaryText">
          630 Stoneglen Dr Suite B, Keller, TX 76248
        </span>
        <div className="flexCenter f-menu">
          <span>Property Listings</span>
          <span>Services</span>
          <span>About Us</span>
        </div>
        <span></span>
      </div>
      </div>
     
    </section>
  );
};
export default Footer;
