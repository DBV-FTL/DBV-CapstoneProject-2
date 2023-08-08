import * as React from "react"
import "./Aboutus.css"
import { useState, useEffect } from "react";
import ScrollTrigger from 'react-scroll-trigger'
// import Bot from "../Bot/Bot";
import David from "../../assets/David.jpg"
import Vanessa from "../../assets/Vanessa.jpg"
import Bereket from "../../assets/Bereket.jpg"
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
          <p className={`about-blurb ${isMounted ? "slide-in" : ""}`}>
            "Step into the heart of International Cuisines, where every flavor tells a story and every dish is a journey.
            We believe in the magic of food, in its ability to connect us across oceans and cultures.
            Our mission is to bring the world to your table, to evoke memories and create new ones with each bite.
            With every order, you're not just getting a meal – you're getting a piece of the world, carefully crafted and delivered with love.
            Join us in this culinary delight, as we unite the world one dish at a time..."
            <br />
            <br />
            Meet our flavor fusion artists, blending global cuisines and code algorithms to craft a tantalizing online dining experience;
          </p>
          <div className={`about-image ${isMounted ? "slide-in" : ""}`}>   
            <div className="about-creator">
              <img src={Bereket} alt="" className="about-imsg" width="400" height="400" />
              <h5 className="img-sub1"> Bereket! </h5>
              <p className="about-description">
                Tech guru by day, culinary mastermind by night. Bereket brings flavors to life through lines of code and taste explosions.
              </p>
              </div>
           
            <div className="about-creator">
              <img src={Vanessa} alt="" className="about-imsg" width="400" height="400" />
              <h5 className="img-sub1"> Vanessa! </h5>
              <p className="about-description">
                Code composer by day, taste architect by night. Vanessa orchestrates symphonies of flavor and algorithms, creating a harmonious dining experience.
              </p>
              </div>
            
            <div className="about-creator">
              <img src={David} alt="" className="about-imsg" width="400" height="400" />
              <h5 className="img-sub1"> David! </h5>
              <p className="about-description">
                Technology enthusiast during daylight, culinary virtuoso after hours. David merges coding prowess with culinary finesse, crafting digital and edible delights.
              </p>
              </div>
            
          </div>
        </ScrollTrigger>
      </div>
      {/* <Bot/> */}
    </>
  );
}
