import { captureException } from '@sentry/browser';

export const uploadImage = async (path, file) => {
  const firebase = await import('firebase/app');
  await import('firebase/storage');

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
        captureException(error);
        reject(error);
      },
      () => {
        task.snapshot.ref.getDownloadURL().then(url => resolve(url));
      },
    );
  });
};

export default uploadImage;
