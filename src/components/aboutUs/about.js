import React from "react";
import "./css/lightMode/about.css";
import TopSlide from "./TopSlide";
import AboutDin from "./aboutDin";
import AboutUs from "./aboutUs";
import Footer from "../layout/Footer/Footer";
import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {" "}
      <div className="about-page">
        <div className="scroller">
          <section className="about-header">
            <TopSlide />
          </section>
          <section className="main">
            <AboutDin />
          </section>
          <section id="aboutus">
            <AboutUs />
          </section>
        </div>
        <Footer />
      </div>
    </motion.div>
  );
};

export default About;
