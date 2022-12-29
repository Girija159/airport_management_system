import {useEffect} from 'react';
import Heading from "../Heading/Heading";

import styles from "../NavBar/NavBar.module.css";
import video from "./homevideo.mp4";
import Navbar from "../Navbar2/Navbar"
import anime from 'animejs';
import './Home.css'

const Home = (props) => {
  useEffect(() => {
    anime.timeline({loop: true})
    .add({
      targets: '.ml5 .line',
      opacity: [0.5,1],
      scaleX: [0, 1],
      easing: "easeInOutExpo",
      duration: 700
    }).add({
      targets: '.ml5 .line',
      duration: 600,
      easing: "easeOutExpo",
      translateY: (el, i) => (-0.625 + 0.625*2*i) + "em"
    }).add({
      targets: '.ml5 .ampersand',
      opacity: [0,1],
      scaleY: [0.5, 1],
      easing: "easeOutExpo",
      duration: 600,
      offset: '-=600'
    }).add({
      targets: '.ml5 .letters-left',
      opacity: [0,1],
      translateX: ["0.5em", 0],
      easing: "easeOutExpo",
      duration: 600,
      offset: '-=300'
    }).add({
      targets: '.ml5 .letters-right',
      opacity: [0,1],
      translateX: ["-0.5em", 0],
      easing: "easeOutExpo",
      duration: 600,
      offset: '-=600'
    }).add({
      targets: '.ml5',
      opacity: 0,
      duration: 1000,
      easing: "easeOutExpo",
      delay: 1000
    });
  }, []);

  return (
    <>
      <Navbar/>
      <div style={{position: "relative"}}>
        <div className="home-page m-0">
          <section id="introduction">
            <div id="hero">
              <video loop muted autoPlay preload="auto" style={{ width: "100%" }}>
                <source src={video} type="video/mp4" />
              </video>
            </div>
          </section>
        </div>

        
        <h1 class="ml5">
          <span class="text-wrapper">
            <span class="line line1"></span>
            <span class="letters letters-left">Airport </span>
            <span class="letters ampersand"> ✈︎ </span>
            <span class="letters letters-right">Management</span>
            <span class="line line2"></span>
          </span>
        </h1>
      </div>
    </>
  );
};

export default Home;
