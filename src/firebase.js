import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCzNzb6zmDRFavZftQfbNcqNvkGPMEPsWY",
  authDomain: "project-cost-tracker-6866f.firebaseapp.com",
  projectId: "project-cost-tracker-6866f",
  storageBucket: "project-cost-tracker-6866f.firebasestorage.app",
  messagingSenderId: "496444063910",
  appId: "1:496444063910:web:54b21374ae7bbd4b837467",
  measurementId: "G-QHM05J4NLP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };