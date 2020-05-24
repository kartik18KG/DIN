/* eslint-disable */
import React, { useContext, useState } from "react";
import { Accordion, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import AddTopicName from "./AddTopicName";
import DeleteButton from "../../layout/Button/DeleteButton";
import UpdateTopicName from "./UpdateTopicName";

import LockedUnlockedTopic from "../../referralSystem/lockedUnlockedTopics";
import { AuthContext } from "../../../contexts/authContext";

import "./css/Article-names.css";
import $ from "jquery";
import Plus from "./DisplayTopicNamesComp/add";
import Article from "./DisplayTopicNamesComp/article";

const DisplayTopicNames = (props) => {
  const { isAdmin, authData } = useContext(AuthContext);

  const [firstRender, setFirstRender] = useState(true);
  const [unhideToggleId, setUnhideToggleId] = useState({});

  const {
    SpecialityId,
    TopicNames,
    Articles,
    displayArticle,
    referralArticle,
  } = props;

  const checkLocked = (topic) => {
    //Check if the article is locked and show referral article. Unhide toggle is a condition to check if it is unlocked by user.
    if (topic.locked === true && unhideToggleId[topic.id] == null) {
      referralArticle(topic.id);
    }
  };

  console.log(authData);

  const UnhideToggle = (id) => {
    setUnhideToggleId({
      ...unhideToggleId,
      [id]: true,
    });
  };

  if (firstRender) {
    authData.userProfile &&
      authData.userProfile.UnlockedTopicId &&
      authData.userProfile.UnlockedTopicId.map((id) => {
        setUnhideToggleId({
          ...unhideToggleId,
          [id.id]: true,
        });
      });
    setFirstRender(false);
  }

  const readArticle = (article) => {
    displayArticle(article);

    if (window.innerWidth <= 569) {
      console.log($(".card-container").position());
      $("html, body").animate({ ScrollTop: 585 }, 100);
    }
  };

  return (
    <div>
      {TopicNames &&
        TopicNames.map((item) => {
          if (SpecialityId === item.SpecialityId) {
            return (
              <div
                className="p-0 speciality-topic-container m-1"
                key={item.id}
                onClick={() => checkLocked(item)}
              >
                {/* When user clicked on the locked topic box referral article shows*/}
                <h4 className="float-left topicName">{item.Name}</h4>

                <Accordion>
                  {item.locked != true || unhideToggleId[item.id] != null ? (
                    <Accordion.Toggle
                      as={Button}
                      variant="link"
                      className="float-right arrow-down"
                      eventKey={item.Name.split(/\s/).join("")} // to remove spaces
                      onClick={() => {
                        $(
                          `.fa-angle-down#${item.Name.split(/\s/).join("")}`
                        ).toggleClass("rotate");
                      }}
                    >
                      <img
                        src="https://www.svgrepo.com/show/60060/down-arrow.svg"
                        className="article-dwn article-toggle fa-angle-down"
                        id={item.Name.split(/\s/).join("")}
                        style={{ width: "20px" }}
                        alt={"show articles realted to" + item.Name}
                      />
                    </Accordion.Toggle>
                  ) : (
                    <LockedUnlockedTopic
                      topic={item}
                      unhideToggle={UnhideToggle}
                    />
                  )}
                  <div>
                    <div className="clearflex"></div>

                    <div className="float-right">
                      {isAdmin
                        ? $(
                            <DeleteButton
                              key={"del" + item.id}
                              collectionName="TopicNames"
                              DocId={item.id}
                              size="small"
                            />
                          )
                        : null}
                    </div>
                    <div className="clearflex"></div>
                    {isAdmin ? (
                      <div className="float-right">
                        <UpdateTopicName Topic={item} />
                      </div>
                    ) : null}
                    <div className="clearflex"></div>
                    <div className="float-right">
                      {isAdmin ? (
                        <Plus
                          SpecialityId={item.SpecialityId}
                          id={item.id}
                          Name={item.Name}
                        />
                      ) : null}
                    </div>
                  </div>
                  <br />
                  <hr />
                  <Accordion.Collapse eventKey={item.Name.split(/\s/).join("")}>
                    <div>
                      <ol>
                        {Articles &&
                          Articles.map((article) => {
                            if (item.id == article.TopicId) {
                              return (
                                <div className="read-icon" key={article.id}>
                                  <br />
                                  <br />
                                  <Article
                                    readArticle={readArticle}
                                    article={article}
                                    item={item}
                                    isAdmin={isAdmin}
                                  />
                                </div>
                              );
                            } else {
                              return null;
                            }
                          })}
                      </ol>
                    </div>
                  </Accordion.Collapse>
                </Accordion>
                <br />
              </div>
            );
          }
        })}
      <AddTopicName SpecialityId={SpecialityId} />
    </div>
  );
};

export default DisplayTopicNames;
