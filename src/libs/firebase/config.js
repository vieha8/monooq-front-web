export default () => {
  if (process.env.NODE_ENV === 'production') {
    // TODO return production conf
  } else {
    return {
      apiKey: 'AIzaSyAi3A3gJonR9pyB0HARfbmnCXgM3tmIgUI',
      authDomain: 'monooq-dev.firebaseapp.com',
      databaseURL: 'https://monooq-dev.firebaseio.com',
      projectId: 'monooq-dev',
      storageBucket: '',
      messagingSenderId: '752653028012',
    };
  }
};
