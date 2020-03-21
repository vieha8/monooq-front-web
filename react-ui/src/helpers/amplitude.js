import amplitude from 'amplitude-js/amplitude';

export const initAmplitude = () => {
  const key =
    process.env.REACT_APP_ENV && process.env.REACT_APP_ENV === 'production'
      ? 'f476a02df26492b1e96c72caea78fafe'
      : 'ddda257c0f722b4899f4e6b7a594cd18';

  amplitude.getInstance().init(key);
};

export const setAmplitudeUserDevice = installationToken => {
  amplitude.getInstance().setDeviceId(installationToken);
};

export const setAmplitudeUserId = userId => {
  amplitude.getInstance().setUserId(userId);
};

export const setAmplitudeUserProperties = properties => {
  amplitude.getInstance().setUserProperties(properties);
};

export const sendAmplitudeData = (eventType, eventProperties) => {
  amplitude.getInstance().logEvent(eventType, eventProperties);
};
