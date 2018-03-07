export default () => {
  const configDevelopment = {
    baseURI: 'http://13.113.136.46:9090/v1',
  };
  // TODO return production conf
  const configProduction = configDevelopment;

  if (process.env.NODE_ENV === 'production') {
    return configProduction;
  }

  return configDevelopment;
};
