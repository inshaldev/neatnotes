import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDb2SWoZD61pdjz1d6b58vl9_77KrboCAc',
  authDomain: 'todo-app-f6106.firebaseapp.com',
  projectId: 'todo-app-f6106',
  storageBucket: 'todo-app-f6106.appspot.com',
  messagingSenderId: '189212848389',
  appId: '1:189212848389:web:302c1b8362d96c3f35076c',
  measurementId: 'G-4WWXNWV4BZ',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const tasksRef = collection(db, 'tasks');
