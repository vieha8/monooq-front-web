export const isLogin = () => {
  if (localStorage.getItem('sessionId')) {
    return true;
  } else {
    return false;
  }
};
