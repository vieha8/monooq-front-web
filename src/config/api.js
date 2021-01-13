export default () => {
  const configDevelopment = {
    baseURL: 'https://dev-api.monooq.com/v1',
    // baseURL: 'http://localhost:5000/v1',
  };

  const configProduction = {
    baseURL: 'https://prod-api.monooq.com/v1',
  };

  if (process.env.REACT_APP_ENV && process.env.REACT_APP_ENV === 'production') {
    return configProduction;
  }

  return configDevelopment;
};
