import firebase from 'firebase';

// Initialize Firebase
export const config = {
  apiKey: "AIzaSyDaFz8jtAF8agLZqDr962s8WaEFVgWy9M4",
  authDomain: "yeha-72ab6.firebaseapp.com",
  databaseURL: "https://yeha-72ab6.firebaseio.com",
  projectId: "yeha-72ab6",
  storageBucket: "yeha-72ab6.appspot.com",
  messagingSenderId: "850899216115",
  appId: "1:850899216115:web:093f2783e13d80fe1a7986"
}

firebase.initializeApp(config);

export default firebase;