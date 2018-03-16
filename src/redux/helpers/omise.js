import base64 from 'base-64';

const publicKey = 'pkey_test_58fhk9rco4won6yvve5';
const apiVersion = '2015-11-17';
const tokenEndPoint = 'https://vault.omise.co/tokens';

export const createOmiseToken = async data => {
  const headers = new Headers();
  headers.append('Authorization', 'Basic ' + base64.encode(publicKey + ':'));
  headers.append('Content-Type', 'application/json');
  headers.append('Omise-Version', apiVersion);

  const res = await fetch(tokenEndPoint, {
    method: 'POST',
    cache: 'no-cache',
    headers,
    body: JSON.stringify(data),
  });
  if (res.ok && res.status === 200) {
    return await res.json();
  } else {
    console.error(res);
    return null;
  }
};
