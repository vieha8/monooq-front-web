export default () => {
  const configDevelopment = {
    baseURI: 'https://dev-api.monooq.com/v1',
    // baseURI: 'http://localhost:5000/v1',
  };
  // TODO return production conf
  const configProduction = configDevelopment;

  if (process.env.NODE_ENV === 'production') {
    return configProduction;
  }

  return configDevelopment;
};
