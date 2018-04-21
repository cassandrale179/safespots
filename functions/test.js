const twilio = require('twilio');
const accountSid = "ACa25b9e68025c8db22bb5d85e4e930cc5";
const authToken = "b3914f78318a81ab0603b02b2256ff93";
const client = new twilio(accountSid, authToken);

client.messages.create({
    body: 'lsdhfkshfs',
    to: '+15516661231',  // Text this number
    from: '+15595408466' // From a valid Twilio number
})
.then((message) => console.log(message.sid))
.catch((err) => console.log('Error', err));
