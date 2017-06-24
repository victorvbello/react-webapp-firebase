import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

firebase.initializeApp({
    apiKey: "AIzaSyC5Ywepz-pGw0UZg4oLOQLaE2rYPf-liWQ",
    authDomain: "family-photo-reactjs.firebaseapp.com",
    databaseURL: "https://family-photo-reactjs.firebaseio.com",
    projectId: "family-photo-reactjs",
    storageBucket: "family-photo-reactjs.appspot.com",
    messagingSenderId: "21088527912"
})

ReactDOM.render(
    <App />, 
    document.getElementById('root'));
registerServiceWorker();
