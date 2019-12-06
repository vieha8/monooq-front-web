// eslint-disable-next-line import/prefer-default-export
export const handleAccessTrade = (resultId, verify) => {
  const script = document.createElement('script');

  script.innerHTML = `var __atw = __atw || [];
    __atw.push({ "merchant" : "monooq", "param" : {
        "result_id" : "${resultId}",
        "verify" : "${verify}",
    }});
(function(a){var b=a.createElement("script");b.src="https://h.accesstrade.net/js/nct/cv.min.js";b.async=!0;
a=a.getElementsByTagName("script")[0];a.parentNode.insertBefore(b,a)})(document);`;

  document.body.appendChild(script);
};

export const handleCircuitX = (campaignId, oid) => {
  const img = document.createElement('img');
  img.setAttribute('style', 'display:none;');
  img.setAttribute(
    'src',
    `https://x-api.cir.io/postback/circuit_x_beacon?oid=${oid}&ma_campaign_id=${campaignId}`,
  );
  img.setAttribute('height', 1);
  img.setAttribute('width', 1);
  document.body.appendChild(img);
};
