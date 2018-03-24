// @flow

import React, { Fragment } from 'react';
import MenuPage from 'components/atomic/templates/MenuPageTemplate';
import Header from 'containers/Header';
import Footer from 'components/atomic/molecules/Footer';
import HelpMenu from 'components/atomic/organisms/HelpMenu';
import CommonHelp from 'components/atomic/molecules/Help/CommonHelp';
import Path from 'config/path';

type PropTypes = {
  openHowToUser: boolean,
  onClickHowToUser: Function,
  openHowToBeHost: boolean,
  onClickHowToBeHost: Function,
}

export default (props: PropTypes) => {
  const { openHowToUser, openHowToBeHost } = props;

  return (
    <MenuPage
      header={<Header help />}
      headline="何かお困りですか？"
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
        <Fragment>
          <CommonHelp
            headline="物置きスペースを利用したい方へ"
            buttons={[
              { title: 'サービスについて', href: Path.helpService() },
              { title: '取引について', onClick: () => console.log('onClick2') },
            ]}
            helpTitle="スペースにはどれくらいのサイズ・量の荷物を置くことができますか？"
            helpLink="#"
          />
          <CommonHelp
            headline="ホストになりたい方へ"
            buttons={[
              { title: 'ホストについて', onClick: () => console.log('onClick1') },
              { title: 'スペース登録について', onClick: () => console.log('onClick2') },
              { title: '取引について', onClick: () => console.log('onClick3') },
              { title: '売上や振込について', onClick: () => console.log('onClick4') },
            ]}
            helpTitle="モノオクのホストになる方法は？"
            helpLink="#"
          />
          <CommonHelp
            headline="登録・ログインについて"
            buttons={[
              { title: '一覧を見る', onClick: () => console.log('onClick1') },
            ]}
            helpTitle="パスワードを忘れてしまいました。"
            helpLink="#"
          />
          <CommonHelp
            headline="その他"
            buttons={[
              { title: '一覧を見る', onClick: () => console.log('onClick1') },
            ]}
            helpTitle="レビューはどこから投稿するのですか？"
            helpLink="#"
          />
        </Fragment>
      )}
      footer={<Footer />}
    />
  );
};
