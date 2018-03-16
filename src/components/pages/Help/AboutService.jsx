// @flow

import React, { Fragment } from 'react';
import MenuPage from 'components/templates/MenuPageTemplate';
import Header from 'containers/Header';
import { H2 } from 'components/atoms/Headline';
import Footer from 'components/molecules/Footer';
import HelpMenu from 'components/organisms/HelpMenu';
import CommonHelp from 'components/molecules/Help/CommonHelp';
import HelpList from 'components/molecules/Help/ListItem';

type PropTypes = {
  openHowToUser: boolean,
  onClickHowToUser: Function,
  openHowToBeHost: boolean,
  onClickHowToBeHost: Function,
  onClickList: Function,
  openFlagList: Array<boolean>,
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
          aboutService={{ href: '#', show: openHowToUser }}
          aboutUserTransaction={{ href: '#', show: openHowToUser }}
          howToBeHost={{ open: openHowToBeHost }}
          onClickHowToBeHost={props.onClickHowToBeHost}
          aboutHost={{ href: '#', show: openHowToBeHost }}
          aboutRegisterSpace={{ href: '#', show: openHowToBeHost }}
          aboutHostTransaction={{ href: '#', show: openHowToBeHost }}
          aboutSalesTransfer={{ href: '#', show: openHowToBeHost }}
          aboutLogin={{ href: '#' }}
          other={{ href: '#' }}
        />
      )}
      rightContent={(
        <Fragment>
          <H2>サービスについて</H2>
          <HelpList
            title="荷物を置く場所を探しています！モノオクの使い方を教えてください。"
            onClick={() => props.onClickList(0)}
            open={props.openFlagList[0]}
            circleDown
          />
        </Fragment>
      )}
      footer={<Footer />}
    />
  );
};
