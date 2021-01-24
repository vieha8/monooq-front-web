import React, { Fragment, useEffect, useState } from 'react';
import Head from 'next/head';
import Path from 'config/path';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Fonts from 'helpers/style/load-fonts';

const Header = dynamic(() => import('components/LV3/Header'));
const Footer = dynamic(() => import('components/LV3/Footer'));

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

const BaseLayout = ({ children, title }) => {
  const [isNoFooter, setIsNoFooter] = useState(false);
  const [isLP, setIsLP] = useState(false);
  const [isBottomMarginSp, setIsBottomMarginSp] = useState(false);
  const { pathname } = useRouter();
  const DEFAULT_TITLE = 'モノオク｜荷物の困ったを解決する、あたらしい物置きのかたち';

  useEffect(() => {
    setIsNoFooter(isNoFooterPath(pathname));
    setIsLP(isLpPath(pathname));
    setIsBottomMarginSp(isBottomMarginSpPath(pathname));
    Fonts();
  }, [pathname]);

  return (
    <Fragment>
      <Head>
        <title>{title || DEFAULT_TITLE}</title>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,shrink-to-fit=no,minimum-scale=1,maximum-scale=1"
        />
        <meta property="og:title" content={title || DEFAULT_TITLE} />
        <link rel="canonical" href="https://monooq.com" />
      </Head>

      {!isLP && <Header />}
      {children}
      {!isNoFooter && <Footer bottomMargin={isLP} bottomMarginOnlySP={isBottomMarginSp} />}
    </Fragment>
  );
};

export default BaseLayout;
