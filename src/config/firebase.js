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

  console.log('ENV:' + process.env);

  if (process.env.NODE_ENV === 'production') {
    return configDevelopment;
  }

  return configDevelopment;
};
