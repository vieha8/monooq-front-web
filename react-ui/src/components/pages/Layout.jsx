import React, { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import Header from 'components/LV3/Header';
import Footer from 'components/LV3/Footer';
import Path from 'config/path';

const isNoFooterPath = path => {
  return (
    path === Path.login() ||
    path === Path.signUp() ||
    path === Path.signUpProfile() ||
    path === Path.spaceCreate1() ||
    path === Path.spaceCreate2() ||
    path === Path.spaceCreate3() ||
    path === Path.createSpaceConfirm() ||
    path === Path.spaceEdit1() ||
    path === Path.spaceEdit2() ||
    path === Path.spaceEdit3() ||
    path === Path.spaceEditConfirm()
  );
};

const BaseLayout = ({ children }) => {
  const [isNoFooter, setIsNoFooter] = useState(false);
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    setIsNoFooter(isNoFooterPath(pathname));
  }, [pathname]);

  return (
    <Fragment>
      <Header />
      {children}
      {!isNoFooter && <Footer />}
    </Fragment>
  );
};

export default BaseLayout;
