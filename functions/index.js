const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const gmailEmail = "marketingacad.help@gmail.com";
const gmailPassword = "abcd9876";
const admin = require("firebase-admin");
admin.initializeApp();

exports.notification = functions.firestore
  .document("Articles/{articleId}")
  .onCreate(async (snap, context) => {
    admin.auth().listUsers();
  });

exports.addAdminRole = functions.https.onCall((data, context) => {
  console.log("request recieved");
  console.log(data);
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then((user) => {
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: true,
      });
    })
    .then(() => {
      console.log("it is working");
      return {
        message: "it is working",
      };
    })
    .catch((err) => {
      return err;
    });
});

exports.sendEmail = functions.https.onCall(async (data) => {
  console.log("trying to send email");

  const mailTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailEmail,
      pass: gmailPassword,
    },
  });
  const mailOptions = {
    from: '"DoItNow" <noreply@firebase.com>',
    to: data.email,
  };
  mailOptions.subject = data.subject;
  mailOptions.text = data.text;
  try {
    await mailTransport.sendMail(mailOptions);
    return { errorCode: 200 };
  } catch (error) {
    console.error("There was an error while sending the email", error);
    return { errorCode: 100 };
  }
});

exports.userList = functions.https.onCall((nextPageToken) => {
  console.log("req recieved to retreive user");

  return admin
    .auth()
    .listUsers()
    .then((listUserResult) => {
      console.log("its time to work");
      return {
        users: listUserResult.users,
        message: "Users Fetched successfully",
      };
    })
    .catch((err) => {
      console.log(err);
      return {
        err: errr,
        message: "Error Fetching users",
      };
    });
});

exports.addAdminRole = functions.https.onCall((email) => {
  //get user and add custom claims (admin)
  console.log("request recieved");
  console.log(email);
  return admin
    .auth()
    .getUserByEmail(email)
    .then((user) => {
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: true,
      });
    })
    .then(() => {
      console.log("it is working");
      return {
        message: "Made Admin successfully",
      };
    })
    .catch((err) => {
      return {
        err: err,
        message: "Error making admin",
      };
    });
});

exports.blockUser = functions.https.onCall((uid) => {
  console.log("req recieved to disable user");
  return admin
    .auth()
    .updateUser(uid, {
      disabled: true,
    })
    .then((userRecord) => {
      console.log(userRecord);
      return { userRecord, message: "Blocked Succesfully !!!" };
    })
    .catch((err) => {
      console.log(err);
      return { userRecord, message: "Not Blocked !!! ERROR !!!!" };
    });
});

exports.unblockUser = functions.https.onCall((uid) => {
  console.log("req recieved to enable user");
  return admin
    .auth()
    .updateUser(uid, {
      disabled: false,
    })
    .then((userRecord) => {
      console.log(userRecord);
      return { userRecord, message: "Unblocked Successfully " };
    })
    .catch((err) => {
      console.log(err);
      return { userRecord, message: "Not Unblocked !!! ERROR !!!" };
    });
});

exports.deleteUser = functions.https.onCall((uid) => {
  console.log("request recieved for deleting the user");
  return admin
    .auth()
    .deleteUser(uid)
    .then(() => {
      return { message: "Deleted Successfully " };
    })
    .catch((err) => {
      console.log(err);
      return { message: "Not Deleted !!! ERROR !!!" };
    });
});
