import React, { useContext, useState } from "react";

import { Helmet } from "react-helmet";
import { Accordion, Row, Col, Button } from "react-bootstrap";

import PreviewArticle from "./PreviewArticle";
import SpecialityPreviewArticle from "./SpecialityPreviewArticle";
import ReferralArticle from "../../referralSystem/referralArticle";

import DisplayTopicNames from "../TopicNames/DisplayTopicNames";
import { ArticlesContext } from "../../../contexts/articleContext";
import { SpecialityContext } from "../../../contexts/specialityContext";
import { TopicsContext } from "../../../contexts/topicContext";
import { AuthContext } from "../../../contexts/authContext";

import Footer from "../../layout/Footer/Footer";
import ShareIcon from "./shareIcon";
import Preloader from "../../Preloader/preloader";

import $ from "jquery";
import "./css/Preview-page.css";
import "./css/Preview-page-dark.css";

const PreviewPage = (props) => {
  const { articles } = useContext(ArticlesContext);
  const { specialities } = useContext(SpecialityContext);
  const { topics } = useContext(TopicsContext);
  const { authData } = useContext(AuthContext);

  //These are here to define the right side of preview page as only 3 type of articles can be seen there referral article, selected article and speciality article
  const [selected, setSelected] = useState(false);
  const [SelectedArticle, setSelectedArticle] = useState();
  const [showReferralArticle, setshowReferralArticle] = useState(false);
  const [referralTopicId, setreferralTopicId] = useState("");

  const topicsData = topics && topics;
  const UnlockComplete = topicsData && topicsData.UnlockComplete;

  if (UnlockComplete) {
    window.location.reload();
  }

  const Articles = articles && articles.articles;
  const TopicNames = topics && topics.topics;
  const Specialities = specialities && specialities.specialities;
  const requiredSpeciality = props.match.params.specialityName;

  //To show the selected article
  const displayArticle = (article) => {
    setSelectedArticle(article);
    setSelected(true);
  };

  //To show referral article
  const referralArticle = (id) => {
    setshowReferralArticle(true);
    setreferralTopicId(id);
    setSelected(false); //When user comes from reading another article this is necessary.
  };

  const hideReferralArticle = () => {
    setshowReferralArticle(false);
    setreferralTopicId("");
    setSelected(false);
  };

  const profile = authData && authData.userProfile;

  let descriptionString = "";

  TopicNames &&
    TopicNames.map((item) => {
      descriptionString = descriptionString.concat(item.Name + " ");
      return descriptionString;
    });

  return (
    <div className="topics-ovr-cont">
      <Helmet>
        <meta
          name="description"
          content={
            "Learn these Web development topics free" + descriptionString
          }
        />
        <meta name="robots" content="index follow" />
      </Helmet>
      {TopicNames ? (
        <div className="speciality-container">
          <div className="speciality-heading">
            <h2>{requiredSpeciality}</h2>
            <ShareIcon profile={profile} specaility={requiredSpeciality} />
          </div>
          <Row>
            <Col className="topic-ovr-container" lg={4}>
              {/* Yeh pehla accordian deekhta kyun nahi h desktop mode mein */}
              <Accordion
                defaultActiveKey={window.innerWidth <= 500 ? "1" : "0"}
              >
                <div className="topics-overview">
                  <h3 style={{ fontSize: "1rem" }} className="overview">
                    {window.innerWidth <= 500 ? (
                      <span>In this Module...</span>
                    ) : (
                      <span>Topics Overview</span>
                    )}
                  </h3>
                  <Accordion.Toggle
                    as={Button}
                    variant="link"
                    onClick={() => {
                      $(".arrow-down.overview").toggleClass("down");
                    }}
                    className="float-right speciality-dropdown overview arrow-down"
                    eventKey="0"
                  >
                    <img
                      src="https://www.svgrepo.com/show/156660/down-arrow.svg"
                      className="article-dwn topics-overview-toggle fa-angle-down"
                      style={{ width: "20px" }}
                      alt={"show articles realted to" + descriptionString}
                    />
                  </Accordion.Toggle>
                </div>
                <br />

                <Accordion.Collapse eventKey="0">
                  <div id="specialities" className="Topic-names ">
                    {Specialities &&
                      Specialities.map((item) => {
                        if (item.Name === requiredSpeciality) {
                          return (
                            <div key={item.id}>
                              <br />

                              <DisplayTopicNames
                                SpecialityId={item.id}
                                TopicNames={TopicNames}
                                SpecialityName={requiredSpeciality}
                                Articles={Articles}
                                displayArticle={displayArticle}
                                referralArticle={referralArticle}
                              />

                              <br />
                            </div>
                          );
                        }
                        return null;
                      })}
                  </div>
                </Accordion.Collapse>
              </Accordion>
            </Col>

            <Col style={{ paddingLeft: 0, paddingRight: 0 }} l={8}>
              <div className="card-container ">
                {selected ? (
                  <PreviewArticle
                    TopicNames={TopicNames}
                    SelectedArticle={SelectedArticle}
                  />
                ) : showReferralArticle ? (
                  <ReferralArticle
                    topicId={referralTopicId}
                    hideReferralArticle={hideReferralArticle}
                  />
                ) : (
                  <SpecialityPreviewArticle
                    Specialities={Specialities}
                    requiredSpeciality={requiredSpeciality}
                  />
                )}
              </div>
            </Col>
          </Row>
        </div>
      ) : (
        <Preloader />
      )}
      <Footer />
    </div>
  );
};

export default PreviewPage;
