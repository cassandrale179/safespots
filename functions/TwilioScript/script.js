const twilio = require('twilio');
const path = require('path')

var admin = require('firebase-admin');
var serviceAccount = require(path.join(__dirname, "serviceAccountKey.json"));


const accountSid = "ACa25b9e68025c8db22bb5d85e4e930cc5";
const authToken = "b3914f78318a81ab0603b02b2256ff93";
const client = new twilio(accountSid, authToken);



admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://firehydrant-6dcc5.firebaseio.com"
});

var db = admin.database();
db.ref('buildings').on("child_added", (snap) => {
    console.log(snap.val());
    client.messages.create({
        body: `${snap.val().name} is now safe! The address is ${snap.val().address}.`,
        to: '+15516661231',  // Text this number
        from: '+15595408466' // From a valid Twilio number
    })    
    .then((message) => console.log(message.sid))
    .catch((err) => console.log('Error', err));
});

db.ref('buildings').on("value", (snap) => {
    console.log(snap.val());
    client.messages.create({
        body: `${snap.val().name} is now safe! The address is ${snap.val().address}.`,
        to: '+15516661231',  // Text this number
        from: '+15595408466' // From a valid Twilio number
    })    
    .then((message) => console.log(message.sid))
    .catch((err) => console.log('Error', err));
})


