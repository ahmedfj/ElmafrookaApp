import firebase from 'firebase/app';
import 'firebase/storage'

 // Your web app's Firebase configuration
 let firebaseConfig = {
  apiKey: "AIzaSyDfnxODeMRdsy4C9fQkxVyWKnuI01ZDh0A",
  authDomain: "elmafrookaapp.firebaseapp.com",
  databaseURL: "https://elmafrookaapp.firebaseio.com",
  projectId: "elmafrookaapp",
  storageBucket: "elmafrookaapp.appspot.com",
  messagingSenderId: "392496178679",
  appId: "1:392496178679:web:bb34c76f06cbea787e3af2"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

  export {
      storage,firebase as default
  } 

// firebaseConfig = {
//     apiKey: "AIzaSyADSwngJrBq6f3Pe2LlF6BDNPrAOEXC6GU",
//     authDomain: "elmafrooka.firebaseapp.com",
//     databaseURL: "https://elmafrooka.firebaseio.com",
//     projectId: "elmafrooka",
//     storageBucket: "elmafrooka.appspot.com",
//     messagingSenderId: "664026218955",
//     appId: "1:664026218955:web:70f83bcfb2b3cd7b06f64e",
//     measurementId: "G-9P15DT6QWZ"
  
//     }