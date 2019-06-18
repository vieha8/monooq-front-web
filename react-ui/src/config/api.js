export default () => {
  const configDevelopment = {
    baseURI: 'http://monooq-api-dev3.ap-northeast-1.elasticbeanstalk.com/v1',
    // baseURI: 'http://localhost:5000/v1',
  };

  const configProduction = {
    baseURI: 'https://prod-api.monooq.com/v1',
  };

  if (process.env.REACT_APP_ENV && process.env.REACT_APP_ENV === 'production') {
    return configProduction;
  }

  return configDevelopment;
};
