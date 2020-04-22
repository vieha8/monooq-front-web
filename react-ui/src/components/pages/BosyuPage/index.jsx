import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import LoadingPage from 'components/LV3/LoadingPage';
import withAuthRequire from 'components/hooks/withAuthRequire';
import { messagesActions } from 'redux/modules/messages';

const BosyuPage = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch('/bosyu/:hash');
  const hash = match.params.hash;

  useEffect(() => {
    dispatch(messagesActions.makeBosyuRoom(hash));
  }, []);

  return <LoadingPage />;
};

const mapStateToProps = () => ({});
export default withAuthRequire(connect(mapStateToProps)(BosyuPage));
