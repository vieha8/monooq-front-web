export const firebaseConfig = () => {
  if (process.env.NODE_ENV === 'production') {
    // TODO return production conf
  } else {
    return {
      apiKey: 'AIzaSyC9htXu8mTlahcjjia1qZ0UevLuKhk_QqU',
      authDomain: 'monooq-dev.firebaseapp.com',
      databaseURL: 'https://monooq-dev.firebaseio.com',
      projectId: 'monooq-dev',
      storageBucket: '',
      messagingSenderId: '752653028012',
    };
  }
};
