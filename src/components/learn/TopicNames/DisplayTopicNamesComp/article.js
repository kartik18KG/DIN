/* eslint-disable */
import React, { useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import DeleteArticle from "../../../layout/Button/DeleteButton";
import $ from "jquery";
import { HomeContext } from "../../../../contexts/homeContext";

const Article = ({ readArticle, article, item, isAdmin }) => {
  const { home } = useContext(HomeContext);
  // For dark mode
  // made a function that updates the state to re render the component
  useEffect(() => {
    if ($("body").hasClass("dark")) {
      $(".read-book-svg").attr(
        "src",
        "https://www.svgrepo.com/show/1110/reader.svg"
      );
    } else {
      $(".read-book-svg").attr(
        "src",
        "https://www.svgrepo.com/show/21266/open-book.svg"
      );
    }
  }, [home]);

  return (
    <div className="row">
      <div className=" read col-10">
        <div className="item">
          <a
            type="button"
            onClick={() => {
              readArticle(article);
              const pos = $(".card-container").offset().top;
              if (window.innerWidth <= 500) {
                $("html, body").animate({ scrollTop: pos }, 69);
              }
            }}
            className="display-article"
          >
            <li className="article-name m-0">{article.ArticleName}</li>
          </a>
          <a
            type="button"
            onClick={() => {
              readArticle(article);
              const pos = $(".card-container").offset().top;
              if (window.innerWidth <= 500) {
                $("html, body").animate({ scrollTop: pos }, 69);
              }
            }}
          >
            <span>
              <img
                className="read-book-svg"
                style={{ width: "20px" }}
                alt={"read " + article.ArticleName}
              />
            </span>
          </a>
        </div>
      </div>
      <div className=" col-2">
        <div className="update-delete float-right">
          {isAdmin ? (
            <DeleteArticle
              collectionName="Articles"
              DocId={article.id}
              size="small"
            />
          ) : null}
          <div>
            {isAdmin ? (
              <NavLink
                className="pr-4"
                to={
                  "/article/update/" +
                  item.SpecialityId +
                  "/" +
                  item.id +
                  "/" +
                  article.id
                }
              >
                <img
                  src="https://www.svgrepo.com/show/241804/edit.svg"
                  style={{ width: "20px" }}
                  alt={"edit" + article.Name}
                />
              </NavLink>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
