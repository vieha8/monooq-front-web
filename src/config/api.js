export default () => {
  const configDevelopment = {
    baseURI: 'https://monooq-api-dev.ap-northeast-1.elasticbeanstalk.com/v1',
  };
  // TODO return production conf
  const configProduction = configDevelopment;

  if (process.env.NODE_ENV === 'production') {
    return configProduction;
  }

  return configDevelopment;
};
