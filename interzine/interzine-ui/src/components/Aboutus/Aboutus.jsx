import * as React from "react"
import "./Aboutus.css"
import { useState, useEffect } from "react";
import ScrollTrigger from 'react-scroll-trigger' 
// import Bot from "../Bot/Bot";

export default function ContactUs() {
  const [isMounted, setIsMounted] = useState(false);

  const handleEnterViewport = () => {
    setIsMounted(true);
  };

  return (
    <>
      <p id="contact-header">Contact</p>
      <div className="contact">
        <ScrollTrigger onEnter={handleEnterViewport} triggerOnLoad={false}>
          <p className="aheader"> About us! </p>
          <p className="statement"> Intersínee was created with you in mind! </p>
          <div className={`about-image ${isMounted ? "slide-in" : ""}`}>
          <div>
            <img src="Bereket.jpg" alt="" className="about-imsg" width="300" height="300" />
            <h5 className="img-sub1"> Bereket! </h5>
          </div>
          <div>
            <img src="Vanessa.JPG" alt="" className="about-img" width="300" height="300" object-fit="contain" />
            <h5 className="img-sub1"> Vanessa! </h5>
          </div>
          <div>
            <img src="David.jpg" alt="" className="about-img" width="300" height="300" />
            <h5 className="img-sub1"> David! </h5>
          </div>
        </div>
        </ScrollTrigger>
      </div>
      {/* <Bot/> */}
    </>
  );
}
