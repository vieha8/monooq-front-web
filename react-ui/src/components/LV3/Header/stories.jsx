// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';
import styled from 'styled-components';
import Path from 'config/path';

import Header from './index';
import ServiceMenu from '../ServiceMenu';

Header.displayName = 'Header';

const BodyMock = styled.div`
  background-image: url('http://placehold.jp/1000x500.png');
`;

const ServiceMenuSP = () => {
  return (
    <ServiceMenu
      home={{ to: Path.home() }}
      message={{ to: Path.messageList(), notificationCount: 0 }}
      schedule={{ to: Path.schedule(), notificationCount: 0 }}
      spaces={{ to: Path.spaces() }}
      addSpace={{ to: Path.createSpaceInfo() }}
      sales={{ to: Path.sales() }}
      paymentHistory={{ to: Path.paid() }}
      profileEdit={{ to: Path.profileEdit() }}
      help={{ href: 'https://help.monooq.com/' }}
      inquiry={{ to: Path.inquiry() }}
      howToUse={{ to: Path.howToUse() }}
      service={{ to: Path.service() }}
      userName="name"
      userImage="http://placehold.jp/500x500.png"
      isPhone
    />
  );
};

storiesOf('Organisms(LV3)/Header', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Logged In',
    withInfo(`
        ### コンポーネント概要
        共通ヘッダ(ログイン中)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <BodyMock>
          <Header
            topUrl={Path.top()}
            homeUrl={Path.home()}
            searchConditionUrl={Path.searchCondition()}
            messageUrl={Path.messageList()}
            messageCount={4}
            user={{
              image: 'http://placehold.jp/500x500.png',
              name: 'name',
            }}
            loginUrl="#"
            signupUrl="#"
            onClickAvatar={() => this.setState()}
            spMenu={ServiceMenuSP()}
            stories
          />
        </BodyMock>
      </div>
    )),
  )
  .add(
    'Anonymouse',
    withInfo(`
        ### コンポーネント概要
        共通ヘッダ(未ログイン)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <BodyMock>
          <Header
            topUrl={Path.top()}
            homeUrl={Path.home()}
            searchConditionUrl={Path.searchCondition()}
            messageUrl={Path.messageList()}
            messageCount={0}
            user={null}
            loginUrl="#"
            signupUrl="#"
            stories
          />
        </BodyMock>
      </div>
    )),
  )
  .add(
    'Logged In Top',
    withInfo(`
        ### コンポーネント概要
        共通ヘッダ(トップ)(ログイン中)(ロゴ白文字)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <BodyMock>
          <Header
            topUrl={Path.top()}
            homeUrl={Path.home()}
            searchConditionUrl={Path.searchCondition()}
            messageUrl={Path.messageList()}
            messageCount={4}
            user={{
              image: 'http://placehold.jp/500x500.png',
              name: 'name',
            }}
            loginUrl="#"
            signupUrl="#"
            onClickAvatar={() => this.setState()}
            top
            spMenu={ServiceMenuSP()}
            stories
          />
        </BodyMock>
      </div>
    )),
  )
  .add(
    'Anonymouse Top',
    withInfo(`
        ### コンポーネント概要
        共通ヘッダ(トップ)(未ログイン)(ロゴ白文字)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <BodyMock>
          <Header
            topUrl={Path.top()}
            homeUrl={Path.home()}
            searchConditionUrl={Path.searchCondition()}
            messageUrl={Path.messageList()}
            messageCount={0}
            user={null}
            loginUrl="#"
            signupUrl="#"
            top
            stories
          />
        </BodyMock>
      </div>
    )),
  );
