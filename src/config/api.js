export default () => {
  const configDevelopment = {
    baseURI: 'https://dev-api.monooq.com/v1',
    // baseURI: 'http://localhost:5000/v1',
  };

  const configProduction = {
    baseURI: 'https://dev-api.monooq.com/v1',
  };

  if (process.env.NODE_ENV === 'production') {
    return configProduction;
  }

  return configDevelopment;
};
