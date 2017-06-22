import Rebase from 're-base';
import firebase from 'firebase/app';
import database from 'firebase/database';

var app = firebase.initializeApp({
  apiKey: "AIzaSyAQaVUro8ZvgnLQzypuwezpILhDAdM9aNY",
  authDomain: "reading-list-4c03c.firebaseapp.com",
  databaseURL: "https://reading-list-4c03c.firebaseio.com",
});

var db = database(app);
var base = Rebase.createClass(db);

export default base;