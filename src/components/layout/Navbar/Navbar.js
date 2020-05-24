/* eslint-disable */
import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Accordion, Button, Col, Row } from "react-bootstrap";
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
import SignedOutLinks from "./SignedOutLinks";
import SignedInLinks from "./SignedInLinks";
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "../css/darkMode/navbarDark.css";
import "../css/lightMode/navbar.css";
// jQuery-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
import $ from "jquery";
import { AuthContext } from "../../../contexts/authContext";
import { getProfile } from "../../../crudFunctions/authFunctions";
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

const Navbar = (props) => {
  const { authData, authState, dispatch } = useContext(AuthContext);
  useEffect(() => {
    getProfile(dispatch);
  }, [authState]);

  useEffect(() => {
    // night mode toggle =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    $(".switch").on("click", () => {

      if ($("body").hasClass("dark")) {
        $("body").removeClass("dark");
        $(".switch").removeClass("switched");
      } else {
        $("body").addClass("dark");
        $(".switch").addClass("switched");
      }
    });
    //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

    //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

    // show and hide vo 3 line vala =-=-=-=-=-=-=-=-=
    if (window.innerWidth >= 767) {
      $("body .logo").css({ "font-size": "2rem" });
      $(".dropdown-accordion").removeClass("dropdown-accordion");
    }

    $(window).resize(function () {
      if (window.innerWidth >= 767) {
        $("body .logo").css({ "font-size": "2rem" });
        $(".dropdown-accordion").removeClass("dropdown-accordion");
      } else {
        $("body .logo").css({ "font-size": "1.2rem" });
      }
    });

    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  }, []);

  useEffect(() => {
    // Cross to vo 3 horizontal lines wala
    $(".nav-btn").click(() => {
      // $(".collapse").toggleClass("show");
      if ($(".navbar-toggler").attr("aria-expanded") == "false") {
        $(".navbar-toggler").attr("aria-expanded", "true");
      } else {
        $(".navbar-toggler").attr("aria-expanded", "false");
      }
    });
  }, []);

  const credentials = authData.userProfile;

  const userUid = authState && authState.uid;

  const links = userUid ? <SignedInLinks /> : <SignedOutLinks />;
  return (
    <div className="navigation-wrap bg-light start-header start-style">
      <div className="container">
        <Accordion className="dropdown-accordion">
          <Row>
            <Col>
              <nav className="navbar navbar-expand-md navbar-light">
                <Link to="/">
                  <span className="navbar-brand logo  nav-link">DoItNow</span>
                </Link>
                <div id="switch" className="switch float-right">
                  <div id="circle"></div>
                </div>

                {authState ? (
                  <div className="points-box ">
                    <span className="points-text"> Points </span>
                    <span>
                      <img
                        src="https://image.flaticon.com/icons/svg/715/715709.svg"
                        className="points-img"
                      />
                    </span>
                    <span> {credentials && credentials.points} </span>
                  </div>
                ) : null}

                <div className="signed-links">{links}</div>

                <Accordion.Toggle
                  className="nav-btn"
                  as={Button}
                  variant="link"
                  eventKey="5">

                  <a
                    className="navbar-toggler"
                    type="button"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation">

                    <span className="navbar-toggler-icon"></span>
                  </a>
                </Accordion.Toggle>
                <Accordion.Collapse
                  className=" "
                  id="navbarSupportedContent"
                  eventKey="5">
                  
                  <div>{links}</div>
                </Accordion.Collapse>
              </nav>
            </Col>
          </Row>
        </Accordion>
      </div>
    </div>
  );
};

export default Navbar;
