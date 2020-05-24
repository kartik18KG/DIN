import React, { useContext, useState } from "react";
import "./css/adminPanel.css";
import { Button } from "react-bootstrap";
import MakeAdminForm from "./makeAdminForm";
import UserTable from "./userTable";
import { AuthContext } from "../../contexts/authContext";

const firebase = require("firebase");
require("firebase/functions");

const AdminPanel = () => {
  const { isAdmin } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  // Function to display all users
  const displayUsers = () => {
    const functions = firebase.functions();
    const userList = functions.httpsCallable("userList");
    userList().then((res) => {
      const message = res.data.message;
      setMessage(message);
      setUsers(res.data.users);
    });
  };

  return (
    <div>
      {isAdmin ? (
        <div className="adminpanel-container">
          <div className="make-admin-form">
            <MakeAdminForm />
          </div>

          <div className="users-table">
            <br />
            <Button variant="primary" onClick={displayUsers}>
              get users
            </Button>{" "}
            {message ? <div>{message}</div> : null}
            <br />
            <UserTable users={users} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AdminPanel;
