// @flow

import React from 'react';
import MenuPage from 'components/atomic/templates/MenuPageTemplate';
import Header from 'containers/Header';
import Footer from 'components/atomic/molecules/Footer';
import HelpMenu from 'components/atomic/organisms/HelpMenu';
import AboutService from 'components/atomic/organisms/HelpContent/AboutService';
import Transaction from 'components/atomic/organisms/HelpContent/Transaction';

type PropTypes = {
  openHowToUser: boolean,
  onClickHowToUser: Function,
  openHowToBeHost: boolean,
  onClickHowToBeHost: Function,
  onClickList: Function,
  openFlagList: Array<boolean>,
  onClickBack: Function,
  content: 'service' | 'transaction' | 'host' | 'space' | 'salesTransfer' | 'signin' | 'other',
}

function getContent(props: PropTypes) {
  const Contents = {
    service: AboutService,
    transaction: Transaction,
  };
  const Content = Contents[props.content] || AboutService;

  return (
    <Content
      onClickList={props.onClickList}
      openFlagList={props.openFlagList}
      onClickBack={props.onClickBack}
    />
  );
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
      rightContent={getContent(props)}
      footer={<Footer />}
    />
  );
};
