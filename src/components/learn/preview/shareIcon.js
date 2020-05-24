import React, { useState, useEffect, useContext } from "react";
import { OverlayTrigger, Popover, Button, Tooltip } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./css/shre.css";
import { HomeContext } from "../../../contexts/homeContext";
import $ from "jquery";

const ShareIcon = ({ specaility, profile }) => {
  const width = window.innerWidth;
  const url = window.location.href;

  var position;
  if (width < 500) {
    position = "bottom";
  } else {
    position = "left";
  }
  const [copied, setCopied] = useState(false);

  const { home } = useContext(HomeContext);
  // For dark mode
  // made a function that updates the state to re render the component
  useEffect(() => {
    if ($("body").hasClass("dark")) {
      $(".share-speciality-btn").attr(
        "src",
        "https://www.svgrepo.com/show/242504/share.svg"
      );
    } else {
      $(".share-speciality-btn").attr(
        "src",
        "https://www.svgrepo.com/show/149246/share.svg"
      );
    }
  }, [home]);

  return (
    <div className="share-overlay">
      <OverlayTrigger
        trigger="click"
        key={position}
        placement={position}
        overlay={
          <Popover id={`popover-positioned-${position}`}>
            <Popover.Content bsPrefix="popover-body1">
              <div className="share-overlay-icons">
                <div className="icon">
                  <a
                    href={`https://api.whatsapp.com/send?text=Hey look i just found out this AmazingGuide on "${specaility} and use my referral code '${
                      profile && profile.referCode
                    }' to SignUp ",Check it out : ${url}`}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    <img
                      src="https://www.svgrepo.com/show/303147/whatsapp-icon-logo.svg"
                      alt={"share " + specaility + " on whatsapp"}
                    />
                  </a>
                </div>

                <div className="icon">
                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      copied ? (
                        <Tooltip id={"tooltip-bottom"}>
                          Link Copied to ClipBoard
                        </Tooltip>
                      ) : (
                        <Tooltip id={"tooltip-right"}>
                          Copy link to clipboard
                        </Tooltip>
                      )
                    }
                  >
                    <div id="link">
                      <CopyToClipboard
                        text={url}
                        onCopy={() => setCopied({ copied: true })}
                      >
                        <img
                          src="https://www.svgrepo.com/show/200099/link.svg"
                          alt={"copy " + specaility + " url"}
                        />
                      </CopyToClipboard>
                    </div>
                  </OverlayTrigger>
                </div>
                <div className="icon">
                  <a
                    href={`mailto:?Subject=${
                      "Learn" + specaility
                    }&Body=Hey look i just found out this Amazing guide on "${specaility}", use my referral code '${
                      profile && profile.referCode
                    }' to SignUp , check it out  ${url}`}
                    target="_top"
                    rel="nofollow"
                  >
                    <img
                      src="https://www.svgrepo.com/show/303161/gmail-icon-logo.svg"
                      alt={"share " + specaility + " on gmail"}
                    />
                  </a>
                </div>
                <div className="icon">
                  <a
                    href="https://twitter.com/share?ref_src=twsrc%5Etfw"
                    className="twitter-share-button"
                    data-text="Hey look I just found out this amazing Website to learn WebDevelopment, check it out"
                    data-show-count="false"
                    rel="nofollow"
                  >
                    <img
                      src="https://www.svgrepo.com/show/20626/twitter.svg"
                      alt={"share " + specaility + " on twitter"}
                    />
                  </a>
                  <script
                    async
                    src="https://platform.twitter.com/widgets.js"
                    charset="utf-8"
                  ></script>
                </div>
              </div>
            </Popover.Content>
          </Popover>
        }
      >
        <Button variant="link">
          <img
            className="share-speciality-btn"
            alt={"share Articles on" + specaility}
          />
        </Button>
      </OverlayTrigger>
    </div>
  );
};

export default ShareIcon;
