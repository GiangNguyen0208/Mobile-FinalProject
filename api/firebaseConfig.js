// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyACwrf1u_faBO5tu638xZLjrF3fvoRO_CQ",
  authDomain: "mobilefinal-2379a.firebaseapp.com",
  databaseURL: "https://mobilefinal-2379a-default-rtdb.firebaseio.com",
  projectId: "mobilefinal-2379a",
  storageBucket: "mobilefinal-2379a.appspot.com",
  messagingSenderId: "630209279855",
  appId: "1:630209279855:android:a24157b41b9a98953f5a9a",
};

const app = initializeApp(firebaseConfig);

// Export Firebase services
export const storage = getStorage(app);
export default app;
