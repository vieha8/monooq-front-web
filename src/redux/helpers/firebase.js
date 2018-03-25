import firebase from 'firebase';

export const uploadImage = (path, file) => {
  const storageRef = firebase.storage().ref();
  const imageRef = storageRef.child(path);
  return new Promise((resolve, reject) => {
    const task = imageRef.put(file);
    task.on(
      'state_changed',
      snapshot => {
        // const progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
        // console.log('Upload is ' + progress + '% done');
      },
      error => {
        console.error(error);
        reject(error);
      },
      () => {
        const url = task.snapshot.downloadURL;
        resolve(url);
      },
    );
  });
};
