import React, { Fragment, useEffect, useState } from 'react';
import Header from 'components/LV3/Header';
import Footer from 'components/LV3/Footer';
import Path from 'config/path';
import { useRouter } from 'next/router';

const getSpaceIdEdit = path => {
  const pathMatchFirstLevel = path.match(RegExp('/.*?/(.*?)(?=/)/'));
  return (pathMatchFirstLevel && pathMatchFirstLevel[1]) || '';
};

const isNoFooterPath = path => {
  const spaceIdEdit = getSpaceIdEdit(path);
  return (
    path === Path.login() ||
    path === Path.signUp() ||
    path === Path.signUpProfile() ||
    path === Path.spaceCreate1() ||
    path === Path.spaceCreate2() ||
    path === Path.spaceCreate3() ||
    path === Path.createSpaceConfirm() ||
    path === Path.spaceEdit1(spaceIdEdit) ||
    path === Path.spaceEdit2(spaceIdEdit) ||
    path === Path.spaceEdit3(spaceIdEdit) ||
    path === Path.spaceEditConfirm(spaceIdEdit)
  );
};

const isLpPath = path => {
  return (
    path === Path.lp1Host() ||
    path === Path.lp1Guest() ||
    path === Path.lp1Guest2() ||
    path === Path.lp1Guest3() ||
    path === Path.lp2Guest() ||
    path === Path.lp2Guest2() ||
    path === Path.lp2Guest3() ||
    path === Path.lp3Guest() ||
    path === Path.lp3Guest3() ||
    path === `${Path.lp1Host()}/` ||
    path === `${Path.lp1Guest()}/` ||
    path === `${Path.lp1Guest2()}/` ||
    path === `${Path.lp1Guest3()}/` ||
    path === `${Path.lp2Guest()}/` ||
    path === `${Path.lp2Guest2()}/` ||
    path === `${Path.lp2Guest3()}/` ||
    path === `${Path.lp3Guest()}/` ||
    path === `${Path.lp3Guest3()}/`
  );
};

const isBottomMarginSpPath = path => {
  return path === Path.spaces() || path === Path.search();
};

const BaseLayout = ({ children }) => {
  const [isNoFooter, setIsNoFooter] = useState(false);
  const [isLP, setIsLP] = useState(false);
  const [isBottomMarginSp, setIsBottomMarginSp] = useState(false);
  const { pathname } = useRouter();

  useEffect(() => {
    setIsNoFooter(isNoFooterPath(pathname));
    setIsLP(isLpPath(pathname));
    setIsBottomMarginSp(isBottomMarginSpPath(pathname));
  }, [pathname]);

  return (
    <Fragment>
      {!isLP && <Header />}
      {children}
      {!isNoFooter && <Footer bottomMargin={isLP} bottomMarginOnlySP={isBottomMarginSp} />}
    </Fragment>
  );
};

export default BaseLayout;
