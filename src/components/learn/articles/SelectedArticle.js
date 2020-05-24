/* eslint-disable */
import React, { useState, useContext } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Row, Col, Tooltip, OverlayTrigger } from "react-bootstrap";
import { Redirect } from "react-router-dom";

import { ArticlesContext } from "../../../contexts/articleContext";
import { TopicsContext } from "../../../contexts/topicContext";
import { AuthContext } from "../../../contexts/authContext";

import "./css/article.css";
import "react-quill/dist/quill.snow.css";
import $ from "jquery";

const SelectedArticle = (props) => {
  const [value, setValue] = useState(window.location.href);
  const [copied, setCopied] = useState(false);
  const [show, setShow] = useState(false);
  const [locked, setLocked] = useState(false);

  const { articles } = useContext(ArticlesContext);
  const { dispatch, authState, authData } = useContext(AuthContext);
  const { topics } = useContext(TopicsContext);

  const Articles = articles && articles.articles;
  const { specialityId, topicId, Id } = props.match.params;
  const url = window.location.href;

  const goToTop = () => {
    $("html, body").animate({ scrollTop: 10 }, 200);
  };

  topics.topics &&
    authData.userProfile &&
    topics.topics.map((item) => {
      if (item.id == topicId && item.locked) {
        setLocked(true);
        authState.uid == null ? (
          <Redirect to="/signup" />
        ) : (
          authData.userProfile.UnlockedTopicId.map((idItem) => {
            if (idItem == topicId) setShow(true);
          })
        );
      }
    });

  // Add React Helmet Regardless of locked since its already taken care of

  return !locked || (locked && show) ? (
    <div>
      <div className="selected-article">
        {Articles &&
          Articles.map((article) => {
            if (
              article.id === Id &&
              article.SpecialityId === specialityId &&
              article.TopicId === topicId
            ) {
              return (
                <Row key={article.id} className="full-view-article p-2">
                  <div className="share-icons">
                    <OverlayTrigger
                      placement="right"
                      overlay={
                        copied ? (
                          <Tooltip id={"tooltip-right"}>
                            Link Copied to ClipBoard
                          </Tooltip>
                        ) : (
                          <Tooltip id={"tooltip-right"}>
                            Copy link to clipboard
                          </Tooltip>
                        )
                      }
                    >
                      <div id="link" className="link-icon">
                        <CopyToClipboard
                          text={value}
                          onCopy={() => setCopied(true)}
                        >
                          <img
                            style={{ width: "25px" }}
                            src="https://www.svgrepo.com/show/47491/link.svg"
                            alt={"copy link of " + article.ArticleName}
                          />
                        </CopyToClipboard>
                      </div>
                    </OverlayTrigger>
                    <div></div>

                    <br />
                    <OverlayTrigger
                      placement="right"
                      overlay={
                        <Tooltip id={"tooltip-right"}>Share via mail</Tooltip>
                      }
                    >
                      <div className="mail-icon">
                        <a
                          className="mail-icon"
                          href={`mailto:?Subject=${
                            "Article on " + article.ArticleName
                          }&Body=Hey look i just found out this Amazing article on "${
                            article.ArticleName
                          }",Check it out : ${url}`}
                          target="_top"
                          rel="nofollow"
                        >
                          <img
                            style={{ width: "25px" }}
                            src="https://www.svgrepo.com/show/303161/gmail-icon-logo.svg"
                            alt={"share " + article.ArticleName + " on Gmail"}
                          />
                        </a>
                      </div>
                    </OverlayTrigger>
                    <br />
                    <OverlayTrigger
                      placement="right"
                      overlay={
                        <Tooltip id={"tooltip-right"}>
                          Share on WhatsApp
                        </Tooltip>
                      }
                    >
                      <div>
                        <a
                          className="whatsapp-icon"
                          rel="noopener noreferrer"
                          href={`https://api.whatsapp.com/send?text=Hey look i just found out this Amazing article on "${article.ArticleName}",Check it out : ${url}`}
                          target="_blank"
                        >
                          <img
                            style={{ width: "30px" }}
                            src="https://www.svgrepo.com/show/303150/whatsapp-symbol-logo.svg"
                            alt={
                              "share " + article.ArticleName + " on Whatsapp"
                            }
                          />
                        </a>
                      </div>
                    </OverlayTrigger>
                  </div>

                  <Col sm={2}>
                    {/* ads here
                    <br />
                    ads here
                    <br />
                    ads here
                    <br />
                    ads here
                    <br />
                    ads here
                    <br />
                    ads here
                    <br /> */}
                  </Col>

                  <Col id="top" style={{ padding: "0px" }} sm={8}>
                    <div className="ql-snow">
                      <div
                        className="full-article ql-editor"
                        dangerouslySetInnerHTML={{
                          __html: article.ArticleContent,
                        }}
                      ></div>
                    </div>
                    <a rel="nofollow" href="#">
                      <img
                        onClick={goToTop}
                        className="top-icon"
                        id="go-to-top"
                        style={{ width: "30px" }}
                        src="https://www.svgrepo.com/show/247787/up-arrow-upload.svg"
                        alt={"Go on Top of " + article.ArticleName}
                      />
                    </a>
                  </Col>

                  <Col sm={2}>
                    {/* ads here
                    <br />
                    ads here
                    <br />
                    ads here
                    <br />
                    ads here
                    <br />
                    ads here
                    <br />
                    ads here
                    <br /> */}
                  </Col>
                </Row>
              );
            }
            return null;
          })}
      </div>
    </div>
  ) : (
    <Redirect to="/signup" />
  );
};

export default SelectedArticle;
