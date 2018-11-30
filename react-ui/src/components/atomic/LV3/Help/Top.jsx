// @flow

import React, { Fragment } from 'react';
import MenuPage from 'components/atomic/templates/MenuPageTemplate';
import Header from 'components/atomic/containers/Header';
import HelpMenu from 'components/atomic/LV3/HelpMenu';
import CommonHelp from 'components/atomic/LV2/Help/CommonHelp';
import Path from 'config/path';

type PropTypes = {
  openHowToUser: boolean,
  onClickHowToUser: Function,
  openHowToBeHost: boolean,
  onClickHowToBeHost: Function,
};

export default (props: PropTypes) => {
  const { openHowToUser, openHowToBeHost } = props;

  return (
    <MenuPage
      header={<Header help />}
      headline="何かお困りですか？"
      rightContent={
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
      }
      leftContent={
        <Fragment>
          <CommonHelp
            headline="物置きスペースを利用したい方へ"
            buttons={[
              { title: 'サービスについて', href: Path.helpService() },
              { title: '取引について', href: Path.helpUserTransaction() },
            ]}
            helpTitle="スペースにはどれくらいのサイズ・量の荷物を置くことができますか？"
            helpLink={`${Path.helpService()}#common1`}
          />
          <CommonHelp
            headline="ホストになりたい方へ"
            buttons={[
              { title: 'ホストについて', href: Path.helpHost() },
              { title: 'スペース登録について', href: Path.helpSpace() },
              { title: '取引について', href: Path.helpHostTransaction() },
              // { title: '売上や振込について', href: Path.helpSalesTransfer() },
            ]}
            helpTitle="モノオクのホストになる方法は？"
            helpLink={`${Path.helpHost()}#common2`}
          />
          <CommonHelp
            headline="登録・ログインについて"
            buttons={[{ title: '一覧を見る', href: Path.helpSignIn() }]}
            helpTitle="パスワードを忘れてしまいました。"
            helpLink={`${Path.helpSignIn()}#common3`}
          />
          <CommonHelp
            headline="その他"
            buttons={[{ title: '一覧を見る', href: Path.helpOther() }]}
            helpTitle="PickGoとはなんですか?"
            helpLink={`${Path.helpOther()}#common4`}
          />
        </Fragment>
      }
    />
  );
};
