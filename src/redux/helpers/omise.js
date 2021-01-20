export const createOmiseToken = async data => {
  const { Omise } = window;
  Omise.setPublicKey(process.env.NEXT_PUBLIC_OMISE_KEY);
  return new Promise(resolve => {
    Omise.createToken('card', data.card, async (status, response) => {
      resolve(response);
    });
  });
};

export default createOmiseToken;
