import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCWNXxyQXW9w2IYjsGMRCjy0dHIMaHlykw",
  authDomain: "videoyy-6fbc1.firebaseapp.com",
  projectId: "videoyy-6fbc1",
  storageBucket: "videoyy-6fbc1.firebasestorage.app",
  messagingSenderId: "414930156563",
  appId: "1:414930156563:web:ee75acc75e1471514c93e6"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
