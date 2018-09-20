export default () => {
  const configDevelopment = {
    apiKey: 'AIzaSyAi3A3gJonR9pyB0HARfbmnCXgM3tmIgUI',
    authDomain: 'monooq-dev.firebaseapp.com',
    databaseURL: 'https://monooq-dev.firebaseio.com',
    projectId: 'monooq-dev',
    storageBucket: 'gs://monooq-dev.appspot.com/',
    messagingSenderId: '752653028012',
  };

  const configProduction = {
    apiKey: 'AIzaSyAOzkRrYFUdzQ2kuwMyTjrjcsbhKOfuQVo',
    authDomain: 'monooq-prod.firebaseapp.com',
    databaseURL: 'https://monooq-prod.firebaseio.com',
    projectId: 'monooq-prod',
    storageBucket: 'monooq-prod.appspot.com',
    messagingSenderId: '569699475393',
  };

  if (process.env.REACT_APP_ENV && process.env.REACT_APP_ENV === 'production') {
    return configProduction;
  }

  return configDevelopment;
};
