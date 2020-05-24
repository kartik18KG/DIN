import React from "react";
import { NavLink } from "react-router-dom";

const Plus = ({ SpecialityId, id, Name }) => {
  return (
    <NavLink to={"/article/add/" + SpecialityId + "/" + id} rel="nofollow">
      <img
        src="https://www.svgrepo.com/show/2087/plus.svg"
        alt={"add Article to " + Name}
        style={{ width: "20px" }}
      />
    </NavLink>
  );
};

export default Plus;
