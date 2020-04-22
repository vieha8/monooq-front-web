import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import LoadingPage from 'components/LV3/LoadingPage';
import withAuthRequire from 'components/hooks/withAuthRequire';

const BosyuPage = () => {
  const match = useRouteMatch('/bosyu/:hash');
  const hash = match.params.hash;
  console.log(hash);

  return <LoadingPage />;
};

const mapStateToProps = () => ({});
export default withAuthRequire(connect(mapStateToProps)(BosyuPage));
