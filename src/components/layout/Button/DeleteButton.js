/* eslint-disable */
import React, { useState, useContext } from "react";
import { Spinner } from "react-bootstrap";
import { DeleteTopicFunction } from "../../../crudFunctions/topicFunctions";
import { TopicsContext } from "../../../contexts/topicContext";

const DeleteButton = (props) => {
  const [Deleting, setDeleting] = useState(false);
  const [Deleted, setDeleted] = useState(false);
  const { collectionName, DocId, size } = props;

  const { dispatch } = useContext(TopicsContext);

  const handleDelete = (e) => {
    setDeleting(true);
    DeleteTopicFunction(collectionName, DocId, dispatch);
  };

  const width = window.innerWidth;
  var position;
  if (width < 500) {
    position = "bottom";
  } else {
    position = "right";
  }

  return (
    <span>
      {size === "small" ? (
        <button className="btn text-danger " onClick={handleDelete}>
          {Deleting && !Deleted ? (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          ) : (
          
            <img src= "https://www.svgrepo.com/show/92817/delete.svg" 
                 alt={"delete in " + collectionName}
                 style={{ width: "20px" }}/>
            
          )}
        </button>
      ) : (
        <button
          className="btn btn-outline-danger btn-lg btn-block mr-3 mb-2 mt-2"
          onClick={handleDelete}
        >
          Delete
        </button>
      )}
    </span>
  );
};

export default DeleteButton;
