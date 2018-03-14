// @flow

import React from 'react';

import Header from '../index';
import Menu from '../../Menu';

export default class HeaderMock extends React.Component {
  constructor(props: Object) {
    super(props);
    this.state = { showMenu: false };
  }

  render() {
    const { showMenu } = this.state;
    return (
      <Header
        homeUri="#"
        searchUri="#"
        messageUri="#"
        messageCount={4}
        user={{
          image: 'http://placehold.jp/500x500.png',
          name: 'name',
        }}
        loginUri="#"
        signupUri="#"
        onClickAvatar={() => this.setState({ showMenu: !showMenu })}
        onClickCloseMenu={() => this.setState({ showMenu: false })}
        showMenu={showMenu}
        top={this.props.top}
        menu={(
          <Menu
            message={{ href: '#', notificationCount: 10 }}
            schedule={{ href: '#', notificationCount: 2 }}
            spaces={{ href: '#', notificationCount: 0 }}
            addSpace={{ href: '#', notificationCount: 0 }}
            salesTransfer={{ href: '#', notificationCount: 0 }}
            paymentHistory={{ href: '#', notificationCount: 0 }}
            becomeHost={{ href: '#', notificationCount: 0 }}
            editProfile={{ href: '#', notificationCount: 0 }}
            inquiry={{ href: '#', notificationCount: 0 }}
            logout={{ href: '#', notificationCount: 0 }}
            hasSpace
          />
        )}
      />
    );
  }
}
