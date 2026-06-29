// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Config kamu
const firebaseConfig = {
  apiKey: "AIzaSyCWNXxyQWw2IYjsGMRCjy0dHIMaHlykw",
  authDomain: "videoyy-6fbc1.firebaseapp.com",
  projectId: "videoyy-6fbc1",
  storageBucket: "videoyy-6fbc1.firebasestorage.app",
  messagingSenderId: "414930156563",
  appId: "1:414930156563:web:ee75acc75e1471514c93e6"
};

// Init Firebase
const app = initializeApp(firebaseConfig);

// Init Firestore
const db = getFirestore(app);

// export biar bisa dipakai file lain
export { db };
