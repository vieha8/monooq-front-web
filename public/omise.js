Omise.setPublicKey('pkey_test_58fhk9rco4won6yvve5');

const checkoutForm = document.getElementById('checkout-form');
checkoutForm.addEventListener('submit', submitHandler, false);

function submitHandler(event) {
  event.preventDefault();

  const cardObject = {
    name: document.querySelector('[id="nameOnCard"]').value,
    number: document.querySelector('[id="cardNumber"]').value,
    expiration_month: document.querySelector('[id="expiryMonth"]').value,
    expiration_year: document.querySelector('[id="expiryYear"]').value,
    security_code: document.querySelector('[id="securityCode"]').value,
  };

  Omise.createToken('card', cardObject, function(statusCode, response) {
    console.log(statusCode);
    console.log(response);
    if (statusCode === 200) {
      checkoutForm.omiseToken.value = response.id;
      // checkoutForm.submit();
    } else {
      console.error(response.message);
    }
  });
}
