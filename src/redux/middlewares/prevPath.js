let prevPath = '';

export default () => next => action => {
  if (action.type === '@@router/LOCATION_CHANGE') {
    const newAction = {
      ...action,
      payload: {
        ...action.payload,
        prevPath,
      },
    };
    prevPath = action.payload.location.pathname;
    return next(newAction);
  }
  return next(action);
};
