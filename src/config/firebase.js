export default () => {
  const configDevelopment = {
    apiKey: 'AIzaSyAi3A3gJonR9pyB0HARfbmnCXgM3tmIgUI',
    authDomain: 'monooq-dev.firebaseapp.com',
    databaseURL: 'https://monooq-dev.firebaseio.com',
    projectId: 'monooq-dev',
    storageBucket: 'gs://monooq-dev.appspot.com/',
    messagingSenderId: '752653028012',
  };
  // TODO return production conf
  const configProduction = configDevelopment;

  if (process.env.NODE_ENV === 'production') {
    return configProduction;
  }

  return configDevelopment;
};
