import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCX5BYlPAWewj8aN4mNWmYW4pJ7Y9ddwFc",
  authDomain: "fire-b5d94.firebaseapp.com",
  databaseURL: "https://fire-b5d94.firebaseio.com",
  projectId: "fire-b5d94",
  storageBucket: "fire-b5d94.appspot.com",
  messagingSenderId: "189296595974",
  appId: "1:189296595974:web:a3db337532e38e446d9f87",
  measurementId: "G-3WRF1J71WM"
};

var firebaseConnect = firebase.initializeApp(firebaseConfig);
export default firebaseConnect;