importScripts('https://www.gstatic.com/firebasejs/4.1.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.1.1/firebase-messaging.js');
importScripts('https://www.gstatic.com/firebasejs/4.1.1/firebase.js');


var config = {
    apiKey: "AIzaSyBKbuAZewGkhTx9tpCW3rPAfVfYN2oW0Vo",
    authDomain: "firehydrant-6dcc5.firebaseapp.com",
    databaseURL: "https://firehydrant-6dcc5.firebaseio.com",
    projectId: "firehydrant-6dcc5",
    storageBucket: "firehydrant-6dcc5.appspot.com",
    messagingSenderId: "560832838956"
};


firebase.initializeApp(config);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(payload => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
    };

return self.registration.showNotification(notificationTitle,
    notificationOptions);
});
