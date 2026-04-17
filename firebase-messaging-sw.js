importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAdRnQQ-ZlZnZLEqbH0rNc5CExwWxMkVdE",
  authDomain: "puerta-a-puerta-dc67c.firebaseapp.com",
  projectId: "puerta-a-puerta-dc67c",
  storageBucket: "puerta-a-puerta-dc67c.firebasestorage.app",
  messagingSenderId: "685654039640",
  appId: "1:685654039640:web:28f9f623c7642a4ef87e2d"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Notificación en background:', payload);
  const { title, body, icon } = payload.notification;
  self.registration.showNotification(title, {
    body,
    icon: icon || '/icono.png'
  });
});
