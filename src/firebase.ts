import firebase from 'firebase/app';

const config = process.env.REACT_APP_FIREBASE_CONFIG;
if (!config) {
  throw new Error('Not found firebase config...');
}
console.info('Initialize firebase app.');
firebase.initializeApp(JSON.parse(config));

export { firebase };
