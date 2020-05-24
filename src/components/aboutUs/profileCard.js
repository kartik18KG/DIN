import React from "react";

const ProfileCard = ({ data }) => {
  return (
    <aside className="profile-card">
      <header>
        <img src="" alt="" />
        <h1>{data.name}</h1>
        <h2>Hello!</h2>
      </header>
      <div className="profile-bio">
        <p>{data.bio}</p>
        <ul className="social-icons list-unstyled list-inline">
          <li>
            <a target="__blank" href={data.instaUrl}>
              <i className="fa fa-instagram"></i>
            </a>
          </li>
          <li>
            <a target="__blank" href={data.twitterUrl}>
              <i className="fa fa-twitter"></i>
            </a>
          </li>
          <li>
            <a target="__blank" href={data.githubUrl}>
              <i className="fa fa-github"></i>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default ProfileCard;
