const functions = require('firebase-functions');
const admin = require('firebase-admin');
const twilio = require('twilio');
admin.initializeApp(functions.config().firebase);


//-------------- INTEGRATING TWILIO API ------------
// const accountSid = "ACa25b9e68025c8db22bb5d85e4e930cc5";
// const authToken = "b3914f78318a81ab0603b02b2256ff93";
const accountSid = functions.config().twilio.sid;
const authToken  = functions.config().twilio.token;
const client = new twilio(accountSid, authToken);


exports.sendMessageNotificaton = functions.database
    .ref('/buildings/{buildingID}').onCreate((snapshot, context) => {
    console.log('Snapshot', snapshot.val());
    console.log('Params', context.params);


    var building_name = snapshot.val().name;
    var body_str = building_name + " is now safe!";
    console.log('Client', client);
    console.log('account', accountSid);
    console.log('authtoken', authToken);


    return client.messages.create({
        body: body_str,
        to: '+15516661231',  // Text this number
        from: '+15595408466' // From a valid Twilio number
    })
    .then((message) => console.log('Message sid', message.sid))
    .catch((err) => console.log('Error', err));
});
