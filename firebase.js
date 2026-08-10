import { initializeApp }
  from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import { getFirestore }
  from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import {
  getAuth
}
  from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA875xNUT4RqJYr_gNk0znP0rmYGOSwjBQ",
  authDomain: "team-sor.firebaseapp.com",
  projectId: "team-sor",
  storageBucket: "team-sor.firebasestorage.app",
  messagingSenderId: "288340410141",
  appId: "1:288340410141:web:ed40180f3a445c7187abf4"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);