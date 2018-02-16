import firebase from 'firebase';

export const checkLogin = () => {
  return new Promise(resolve => {
    console.log('checkLogin Start');
    firebase.auth().onAuthStateChanged(user => {
      console.log('checkLogin End');
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};
