import React from "react";
import "./css/Preview-page.css";

const SpecialityPreviewArticle = ({ Specialities, requiredSpeciality }) => {
  return (
    <div className="card">
      <h1 className="material-icons card-header ">
        Read This before You start...
      </h1>
      <hr />
      {Specialities &&
        Specialities.map((item) => {
          if (item.Name === requiredSpeciality) {
            return (
              <div className="ql-snow" key={item.id}>
                <div
                  key={item.id}
                  className="card-no-body ql-editor"
                  dangerouslySetInnerHTML={{
                    __html: item.ArticleContent,
                  }}
                ></div>
              </div>
            );
          }
          return null;
        })}
    </div>
  );
};

export default SpecialityPreviewArticle;