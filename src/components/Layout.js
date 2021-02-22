import React, { Fragment, useEffect, useState } from 'react';
import Path from 'config/path';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Fonts from 'helpers/style/load-fonts';

const Header = dynamic(() => import('components/LV3/Header'), { loading: () => <p>...</p> });
// const Footer = dynamic(() => import('components/LV3/Footer'), { loading: () => <p>...</p> });

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
  const { asPath: path } = useRouter();

  useEffect(() => {
    setIsNoFooter(isNoFooterPath(path));
    setIsLP(isLpPath(path));
    setIsBottomMarginSp(isBottomMarginSpPath(path));
    Fonts();
  }, [path]);

  return (
    <Fragment>
      {!isLP && <Header />}
      {children}
      {/* {!isNoFooter && <Footer bottomMargin={isLP} bottomMarginOnlySP={isBottomMarginSp} />} */}
    </Fragment>
  );
};

export default BaseLayout;
