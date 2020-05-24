/* eslint-disable */
import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Helmet } from "react-helmet"
import { AuthContext } from "../../contexts/authContext";
import { signUp } from "../../crudFunctions/authFunctions";

const SignUp = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState();
  const [codeReferred, setCodeReferred] = useState("");
  const { authState, dispatch } = useContext(AuthContext);
  
  const uid = authState && authState.uid;

  const handleSubmit = (e) => {
    e.preventDefault();

    signUp(
      { email, password, firstName, lastName, age, codeReferred },
      dispatch
    );
  };

  const { authError, auth } = props;
  const { referCode } = props.match.params;

  if (uid) return <Redirect to="/" />;

  return (
    <div className="container">
      <Helmet>
        <title>DoItNow - SignUp</title>
        <meta name="description" content="DoItNow SignUp page." />
      </Helmet>
      <form onSubmit={handleSubmit}>
        <h5>Sign Up</h5>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            required
            className="form-control"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            className="form-control"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            required
            className="form-control"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            required
            className="form-control"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            required
            min="1"
            max="100"
            className="form-control"
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="codeReferred">Refer Code</label>
          {referCode != null ? (
            <input
              type="text"
              id="codeReferred"
              defaultValue={referCode}
              className="form-control"
              onChange={(e) => {
                setCodeReferred(e.target.value);
              }}
            />
          ) : (
            <input
              type="text"
              id="codeReferred"
              className="form-control"
              onChange={(e) => {
                setCodeReferred(e.target.value);
              }}
            />
          )}
          <span className="help-block">Optional</span>
        </div>
        <div>
          <button type="submit" className="btn btn-danger">
            SignUp
          </button>
        </div>
        <div className="text-danger text-center text-uppercase">
          {authError ? <p>{authError}</p> : null}
        </div>
      </form>
    </div>
  );
};

export default SignUp;
