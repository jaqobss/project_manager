import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
apiKey: "AIzaSyAsYIrPOzwA-kO8w-5Jkdg9Ue8tdsKaAjI",
authDomain: "vuetify-first-b7328.firebaseapp.com",
databaseURL: "https://vuetify-first-b7328.firebaseio.com",
projectId: "vuetify-first-b7328",
storageBucket: "vuetify-first-b7328.appspot.com",
messagingSenderId: "953887959113",
appId: "1:953887959113:web:b8f3a7e2fdb1a924483798",
measurementId: "G-QDJ1PXV53J"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;