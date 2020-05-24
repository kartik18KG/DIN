import firebase from "../config/fbConfig";

export const getSpecialities = async (dispatch) => {
  const specialitiesArray = [];
  const specialitiesArraySnapshot = await firebase
    .firestore()
    .collection("Specialities")
    .get();

  specialitiesArraySnapshot.docs.map((doc) => {
    specialitiesArray.push({
      id: doc.id,
      ...doc.data(),
    });
    return null;
  });

  dispatch({ type: "FETCH_SPECIALITIES", specialitites: specialitiesArray });
};

export const UpdateCard = (state, dispatch) => {
  firebase
    .firestore()
    .collection("Specialities")
    .doc(state.id)
    .update({
      ...state,
    })
    .then(() => {
      dispatch({
        type: "UPDATE_CARD",
        message: "Article updated successfully",
        color: "success",
        complete: true,
      });
    })
    .catch(() => {
      dispatch({
        type: "UPDATE_CARD",
        message: "Error updating article",
        color: "danger",
        complete: true,
      });
    });
};

export const AddCardFunction = (state, dispatch) => {
  firebase
    .firestore()
    .collection("Specialities")
    .add({
      ...state,
    })
    .then(() => {
      dispatch({
        type: "ADD_CARD",
        message: "Article added successfully",
        color: "success",
        complete: true,
      });
    })
    .catch(() => {
      dispatch({
        type: "UPDATE_CARD",
        message: "Error adding article",
        color: "danger",
        complete: true,
      });
    });
};
