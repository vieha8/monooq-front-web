// @flow

import React from 'react';
import MenuPage from 'components/templates/MenuPageTemplate';
import Header from 'containers/Header';
import Footer from 'components/molecules/Footer';
import HelpMenu from 'components/organisms/HelpMenu';
import AboutService from 'components/organisms/HelpContent/AboutService';

type PropTypes = {
  openHowToUser: boolean,
  onClickHowToUser: Function,
  openHowToBeHost: boolean,
  onClickHowToBeHost: Function,
  onClickList: Function,
  openFlagList: Array<boolean>,
  onClickBack: Function,
}

export default (props: PropTypes) => {
  const { openHowToUser, openHowToBeHost } = props;

  return (
    <MenuPage
      header={<Header help />}
      headline="物置きスペースを利用したい方へ"
      leftContent={(
        <HelpMenu
          howToUser={{ open: openHowToUser }}
          onClickHowToUser={props.onClickHowToUser}
          aboutService={{ show: openHowToUser }}
          aboutUserTransaction={{ show: openHowToUser }}
          howToBeHost={{ open: openHowToBeHost }}
          onClickHowToBeHost={props.onClickHowToBeHost}
          aboutHost={{ show: openHowToBeHost }}
          aboutRegisterSpace={{ show: openHowToBeHost }}
          aboutHostTransaction={{ show: openHowToBeHost }}
          aboutSalesTransfer={{ show: openHowToBeHost }}
        />
      )}
      rightContent={(
        <AboutService
          onClickList={props.onClickList}
          openFlagList={props.openFlagList}
          onClickBack={props.onClickBack}
        />
      )}
      footer={<Footer />}
    />
  );
};
