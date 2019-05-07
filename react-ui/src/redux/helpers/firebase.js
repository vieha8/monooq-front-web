import firebase from 'firebase/app';
import 'firebase/storage';

export const uploadImage = (path, file) => {
  const storageRef = firebase.storage().ref();
  const imageRef = storageRef.child(path);
  return new Promise((resolve, reject) => {
    const task = imageRef.put(file);
    task.on(
      'state_changed',
      () => {
        // const progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
        // console.log('Upload is ' + progress + '% done');
      },
      error => {
        reject(error);
      },
      () => {
        task.snapshot.ref.getDownloadURL().then(url => resolve(url));
      },
    );
  });
};

export default uploadImage;
