import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

firebase.initializeApp({
    apiKey: "AIzaSyDl9CCjfQhHq8tsyNtXtbBpd8jwtwQjArg",
    authDomain: "pseuddogram.firebaseapp.com",
    databaseURL: "https://pseuddogram.firebaseio.com",
    projectId: "pseuddogram",
    storageBucket: "pseuddogram.appspot.com",
    messagingSenderId: "379196110907"
})

ReactDOM.render(
    <App />, 
    document.getElementById('root'));
registerServiceWorker();
