import React, { useEffect } from 'react';

const withHandleBeforeUnload = Component => props => {
  useEffect(() => {
    const handleBeforeUnload = e => {
      e.preventDefault();
      e.returnValue = 'データが保存されませんが、よろしいですか?';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  });
  return <Component {...props} />;
};

export default withHandleBeforeUnload;
