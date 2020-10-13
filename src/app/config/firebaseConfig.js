import firebase from 'firebase';

// Initialize Firebase
export const config = {
  apiKey: "AIzaSyAuvieSJ0nrsJDifOEPC8fC0-YSydmeFxs",
  authDomain: "dev-firebase-934d7.firebaseapp.com",
  databaseURL: "https://dev-firebase-934d7.firebaseio.com",
  projectId: "dev-firebase-934d7",
  storageBucket: "dev-firebase-934d7.appspot.com",
  messagingSenderId: "749196370251",
  appId: "1:749196370251:web:80aff0763b5a86695088ce",
  measurementId: "G-102CBMV1H8"
}

firebase.initializeApp(config);

export default firebase;