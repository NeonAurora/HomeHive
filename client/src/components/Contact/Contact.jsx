import React from "react";
import "./Contact.css";
import { MdCall } from "react-icons/md";
import { BsFillChatDotsFill } from "react-icons/bs";
import { HiChatBubbleBottomCenter } from "react-icons/hi2";
const Contact = () => {
  return (
    <div id="contact-us" className="c-wrapper">
      <div className="paddings innerWidth flexCenter c-container">
        {/* left side */}
        <div className="flexColStart c-left">
          <span className="orangeText">Contact Us</span>
          <span className="primaryText">
            Reach out to us for personalized guidance and expert support
          </span>
          <span className="secondaryText">
            Whether you have questions, need assistance, or are ready to explore
            opportunities, we're here to help. Our team is dedicated to making
            your land-buying journey smooth and hassle-free{" "}
          </span>

          <div className="flexColStart contactModes">
            {/* first row */}
            <div className="flexStart row">
              <div className="flexColCenter mode">
                <div className="flexStart">
                  <div className="flexCenter icon">
                    <MdCall size={25} className="orangeIcon" />
                  </div>
                  <div className="flexColStart detail">
                    <span className="primaryText">Call</span>
                    <span className="secondaryText">(817) 567-2378</span>
                  </div>
                </div>
                <div className="flexCenter button">Call now</div>
              </div>

              <div className="flexColCenter mode">
                <div className="flexStart">
                  <div className="flexCenter icon">
                    <BsFillChatDotsFill size={25} className="orangeIcon" />
                  </div>
                  <div className="flexColStart detail">
                    <span className="primaryText">Live Chat</span>
                    <span className="secondaryText">
                      Chat with us for instant support
                    </span>
                  </div>
                </div>
                <div className="flexCenter button">
                  <a href="https://portal.landersinvestment.com/livechat">
                    Chat Now!
                  </a>
                </div>
              </div>
            </div>

            {/* second row */}
            <div className="flexStart row">
              <div className="flexColCenter mode">
                <div className="flexStart">
                  <div className="flexCenter icon">
                    <BsFillChatDotsFill size={25} className="orangeIcon" />
                  </div>
                  <div className="flexColStart detail">
                    <span className="primaryText">Email</span>
                    <span className="secondaryText">Email us your queries</span>
                  </div>
                </div>
                <div className="flexCenter button">
                  <a href="mailto:info@landersinvestment.com">Email Us</a>
                </div>
              </div>

              <div className="flexColCenter mode">
                <div className="flexStart">
                  <div className="flexCenter icon">
                    <HiChatBubbleBottomCenter
                      size={25}
                      className="orangeIcon"
                    />
                  </div>
                  <div className="flexColStart detail">
                    <span className="primaryText">Come Visit Us</span>
                    <span className="secondaryText">
                      630 Stoneglen Dr Suite B <br /> Keller, TX 76248
                    </span>
                  </div>
                </div>
                <div className="flexCenter button">
                  <a href="https://www.google.com/maps/place/Buy+Your+Land+-+Landers/@32.9353714,-97.2370646,18z/data=!4m9!1m2!2m1!1s630+Stoneglen+Dr+STE+B+Keller,+TX+762483626+USA!3m5!1s0x864e8707fe9371c1:0x4cf801bc1bac3beb!8m2!3d32.9362998!4d-97.2385054!16s%2Fg%2F11sq52dd7r"></a>
                  Find Us On Map
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="flexEnd c-right">
          <div className="image-container2">
            <img src="./contact.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
