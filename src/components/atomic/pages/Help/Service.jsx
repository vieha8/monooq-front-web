// @flow

import React from 'react';
import MenuPage from 'components/atomic/templates/MenuPageTemplate';
import Header from 'containers/Header';
import Footer from 'components/atomic/molecules/Footer';
import HelpMenu from 'components/atomic/organisms/HelpMenu';
import AboutService from 'components/atomic/organisms/HelpContent/AboutService';
import UserTransaction from 'components/atomic/organisms/HelpContent/UserTransaction';
import Host from 'components/atomic/organisms/HelpContent/Host';
import Space from 'components/atomic/organisms/HelpContent/Space';
import HostTransaction from 'components/atomic/organisms/HelpContent/HostTransaction';
import SalesTransfer from 'components/atomic/organisms/HelpContent/SalesTransfer';
import Signin from 'components/atomic/organisms/HelpContent/Signin';
import Other from 'components/atomic/organisms/HelpContent/Other';

type PropTypes = {
  openHowToUser: boolean,
  onClickHowToUser: Function,
  openHowToBeHost: boolean,
  onClickHowToBeHost: Function,
  onClickList: Function,
  openFlagList: Array<boolean>,
  onClickBack: Function,
  content: string,
}

function getContent(props: PropTypes) {
  const Contents = {
    service: AboutService,
    usertransaction: UserTransaction,
    host: Host,
    space: Space,
    hosttransaction: HostTransaction,
    salestransfer: SalesTransfer,
    signin: Signin,
    other: Other,
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
