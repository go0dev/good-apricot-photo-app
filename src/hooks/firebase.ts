import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const config = process.env.REACT_APP_FIREBASE_CONFIG;
if (config) {
  firebase.initializeApp(JSON.parse(config));
}
export { firebase };
