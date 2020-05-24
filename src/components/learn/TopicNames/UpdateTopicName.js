/* eslint-disable */
import React, { useContext, useState } from "react";
import { Spinner } from "react-bootstrap";
import { TopicsContext } from "../../../contexts/topicContext";
import { UpdateTopic } from "../../../crudFunctions/topicFunctions";

const UpdateTopicName = (props) => {
  const [Name, setName] = useState("");
  const [Loading, setLoading] = useState(false);
  const { dispatch } = useContext(TopicsContext);
  const { topics } = useContext(TopicsContext);

  const message = topics && topics.message;
  const color = topics && topics.color;
  const complete = topics && topics.complete;

  if (complete) {
    setTimeout(function () {
      window.location.reload();
    }, 3000);
  }

  const handleInput = (e) => {
    setName(e.target.value);
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    setLoading(true);
    UpdateTopic(
      {
        Name,
        id: props.Topic.id,
      },
      dispatch
    );

    // this.props.updateTopicName("TopicNames", {
    // ...this.state,
    // id: this.props.Topic.id
    // });
  };
  const { Topic } = props;
  // console.log(Topic)
  return (
    <div className="container m-0 p-0 ">
      <button
        type="button"
        className="btn text-primary text-"
        data-toggle="modal"
        data-target={"#" + Topic.id}
      >
      <img  src="https://www.svgrepo.com/show/241804/edit.svg" 
            style={{ width: "20px" }}
            alt="edit" />
      </button>

      <div
        className="modal fade"
        id={Topic.id}
        tabIndex="-1"
        role="dialog"
        aria-labelledby={Topic.id + "label"}
        aria-hidden="true"
      >
        <div className="modal-dialog " role="document">
          <div className="modal-content newsletter">
            <div className="modal-header">
              <h4 className="modal-title title" id={Topic.id + "label"}>
                Update Topic Name
              </h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body content">
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    id="Name"
                    className="form-control"
                    defaultValue={Topic.Name}
                    onChange={handleInput}
                  />
                  <br />
                  <button
                    className="btn btn-outline-primary float-right m-3"
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                  {Loading && !complete ? (
                    <div className="text-center">
                      <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                      </Spinner>
                    </div>
                  ) : (
                    <div className={"text-center " + "text-" + color}>
                      {message}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTopicName;
