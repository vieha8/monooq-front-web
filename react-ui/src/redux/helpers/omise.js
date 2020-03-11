const publicKey =
  process.env.REACT_APP_ENV === 'production'
    ? 'pkey_592yt9505djymotwq66'
    : 'pkey_test_58fhk9rco4won6yvve5';

export const createOmiseToken = async data => {
  const { Omise } = window;
  Omise.setPublicKey(publicKey);
  return new Promise(resolve => {
    Omise.createToken('card', data.card, async (status, response) => {
      resolve(response);
    });
  });
};

export default createOmiseToken;
