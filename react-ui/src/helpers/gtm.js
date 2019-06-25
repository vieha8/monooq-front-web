import { captureException } from '@sentry/browser';

export const handleGTM = (event, eventValue) => {
  try {
    window.dataLayer.push({ event, eventValue });
  } catch (e) {
    captureException(e);
  }
};

export default handleGTM;
