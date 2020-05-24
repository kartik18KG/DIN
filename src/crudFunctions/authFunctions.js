const firebase = require("firebase");
var provider = new firebase.auth.GoogleAuthProvider();
require("firebase/functions");

// export const getAuth = (dispatch) => {
//     const uid = firebase.auth().currentUser && firebase.auth().currentUser.uid;
//     if (uid != null) {
//         dispatch({
//             type: "LOGIN",
//             loginCode: 200,
//         });
//     } else {
//         dispatch({
//             type: "LOGIN",
//             loginCode: 100,
//         });
//     }
// };

export const signIn = (email, password, dispatch) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      dispatch({
        type: "LOGIN",
        loginCode: 200,
        errorMessage: null,
      });
    })
    .catch((err) => {
      dispatch({
        type: "LOGIN",
        loginCode: 100,
        errorMessage: "Error Logging In",
      });
    });
};

export const getProfile = async (dispatch) => {
  const uid = firebase.auth().currentUser && firebase.auth().currentUser.uid;
  if (uid) {
    var docRef = firebase.firestore().collection("Users").doc(uid);

    docRef
      .get()
      .then(function (doc) {
        dispatch({
          type: "GET_PROFILE",
          profile: doc.data(),
        });
      })
      .catch(function (error) {
        // console.log("Error getting document:", error);
      });
  }
};

export const signUp = async (newUser, dispatch) => {

  const initials = newUser.firstName[0] + newUser.lastName[0];
  const randomNumber = Math.floor(Math.random() * (90 - 65 + 1) + 65);
  const notSoRandom = randomNumber + newUser.lastName.length
  const referCode = initials + newUser.age + newUser.firstName[1] + newUser.firstName.length 
                    + newUser.lastName[1] + notSoRandom + String.fromCharCode(randomNumber);

  // Checking and updating score according to the refercode entered by user
  if (newUser.codeReferred != null) {
    const userArraySnapshot = await firebase
      .firestore()
      .collection("Users")
      .get();

    userArraySnapshot.docs.map(async (doc) => {
      const data = doc.data();
      const points = data.points + 2;

      if (data.referCode === newUser.codeReferred) {
        console.log("match");
        await firebase.firestore().collection("Users").doc(doc.id).update({
          points: points,
        });
      }
    });
  }

  firebase
    .auth()
    .createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then((res) => {
      return firebase.firestore().collection("Users").doc(res.user.uid).set({
        UnlockedTopicId: [],
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        initials: initials,
        age: newUser.age,
        points: 0,
        referCode: referCode,
      });
    })
    .then(() => {
      var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: newUser.firstName + " " + newUser.lastName,
      });

      dispatch({
        type: "SIGN_UP",
        loginCode: 200,
        errorMessage: null,
      });
    })
    .catch((err) => {
      dispatch({
        type: "SIGN_UP",
        loginCode: 200,
        errorMessage: err,
      });
    });
};

export const signOut = (dispatch) => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch({
        type: "LOGOUT",
        loginCode: 100,
      });
    })
    .catch((err) => {
      dispatch({
        type: "LOGOUT",
        loginError: "Error Logging In",
      });
    });
};

export const LoginWithGoogle = (dispatch) => {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      const functions = firebase.functions();
      const sendEmail = functions.httpsCallable("sendEmail");
      const data = {
        email: result.user.email,
        subject: "Hey There !!!",
        text: "You are now Logged in to Marketing Acad ",
      };
      sendEmail(data)
        .then((res) => {})
        .catch((err) => {});

      dispatch({
        type: "LOGIN",
        loginCode: 200,
        errorMessage: null,
      });
    })
    .catch(function (error) {
      dispatch({
        type: "LOGIN",
        loginCode: 100,
        errorMessage: "Error Logging In",
      });
    });
};

export const addSubscriber = (state) => {
  firebase
    .firestore()
    .collection("Subscribers")
    .add({
      ...state,
    })
    .then(() => {
      console.log("added");
    })
    .catch((err) => {
      console.log(err);
    });
};
