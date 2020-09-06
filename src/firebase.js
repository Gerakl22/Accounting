import { initializeApp } from "firebase";

const app = initializeApp({
  apiKey: "AIzaSyAhlK7mXZpDKxag6jKWK9bUWtIUzmsFaNg",
  authDomain: "accounting-08-09-20.firebaseapp.com",
  databaseURL: "https://accounting-08-09-20.firebaseio.com",
  projectId: "accounting-08-09-20",
  storageBucket: "accounting-08-09-20.appspot.com",
  messagingSenderId: "899485089253",
  appId: "1:899485089253:web:7ac4a206845b809b85430c",
  measurementId: "G-7T19VPZMH3",
});

export const firestore = app.firestore();

export function docToObject(doc) {
  return {
    id: doc.id,
    ...doc.data(),
  };
}

export function collectionToObject(collection) {
  return collection.docs.map(docToObject);
}
