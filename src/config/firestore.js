import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
	apiKey: "AIzaSyCdMobKMaCxvX9aTrGUYwMoBCutCLLz2NU",
	authDomain: "group9-5eae1.firebaseapp.com",
	projectId: "group9-5eae1",
	storageBucket: "group9-5eae1.firebasestorage.app",
	messagingSenderId: "1082898088772",
	appId: "1:1082898088772:web:c4a06b4215368e519d8d11",
	measurementId: "G-RBXRE7V0XJ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// export const database = getFirestore(app);

export const database = initializeFirestore(app, {
	experimentalAutoDetectLongPolling: true,
});
