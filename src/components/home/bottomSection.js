import React, { useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import $ from "jquery";
import { HomeContext } from "../../contexts/homeContext";

const BottomSection = () => {
  const { home } = useContext(HomeContext);
  const homeArray = home && home.home;

  const left = homeArray && homeArray[0].left;
  const middle = homeArray && homeArray[0].middle;
  const right = homeArray && homeArray[0].right;

  useEffect(() => {
    // const navbarOpen = $(".navbar-toggler").attr("aria-expanded");

    if (window.innerWidth < 600) {
      $(window).scroll(() => {
        var scroll = window.scrollY;
        if (scroll < 150) {
          $(".hero-box__circle--blue").removeClass("one");
          $(".hero-box__circle--orange").removeClass("three");
          $(".hero-box__circle--green").removeClass("two");
        }
        if (scroll > 150 && scroll < 450) {
          $(".hero-box__circle--blue").addClass("one");
          $(".hero-box__circle--orange").removeClass("three");
          $(".hero-box__circle--green").removeClass("two");
        }
        if (scroll > 450 && scroll < 650) {
          $(".hero-box__circle--green").addClass("two");
          $(".hero-box__circle--blue").removeClass("one");
          $(".hero-box__circle--orange").removeClass("three");
        }
        if (scroll > 650) {
          $(".hero-box__circle--orange").addClass("three");
          $(".hero-box__circle--green").removeClass("two");
          $(".hero-box__circle--blue").removeClass("one");
        }
      });
    }
  }, []);

  return (
    <section className="hero">
      <div className="hero-box-container">
        <NavLink to="/about" className="hero-box">
          <span className="hero-box__circle hero-box__circle--blue"></span>
          <h2 className="hero-box__title">What is DoItNow?</h2>
          <p className="hero-box__body">{left && left}</p>
        </NavLink>
        <NavLink to="/about/#aboutus" className="hero-box">
          <span className="hero-box__circle hero-box__circle--green"></span>
          <h2 className="hero-box__title">Who are We ?</h2>
          <p className="hero-box__body">{middle && middle}</p>
        </NavLink>
        <NavLink to="/learn" className="hero-box">
          <span className="hero-box__circle hero-box__circle--orange"></span>
          <h2 className="hero-box__title">Start Learning ..</h2>
          <p className="hero-box__body">{right && right}</p>
        </NavLink>
      </div>
    </section>
  );
};

export default BottomSection;
