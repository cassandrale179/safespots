const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.sendMessageNotificaton = functions.database
    .ref('/buildings/{buildingID}').onWrite(event => {

    }); 
