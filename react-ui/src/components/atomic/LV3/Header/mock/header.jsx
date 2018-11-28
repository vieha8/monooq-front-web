// @flow

import React from 'react';
import Path from 'config/path';
import Header from '../index';
import ServiceMenu from '../../ServiceMenu';

export default class HeaderMock extends React.Component {
  constructor(props: Object) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Header
        topUri={Path.top()}
        homeUri={Path.home()}
        editProfileUri={Path.editProfile()}
        searchUri={Path.search()}
        searchConditionUri={Path.searchCondition()}
        scheduleUri={Path.schedule()}
        createSpaceInfoUri={Path.createSpaceInfo()}
        spacesUri={Path.spaces()}
        salesUri={Path.sales()}
        helpUri="https://help.monooq.com/"
        inquiryUri={Path.inquiry()}
        howToUseUri={Path.howToUse()}
        otherUri={Path.other()}
        tidyUri="https://tidy.monooq.com/"
        messageUri={Path.messages()}
        messageCount={4}
        user={{
          image: 'http://placehold.jp/500x500.png',
          name: 'name',
        }}
        loginUri="#"
        signupUri="#"
        onClickAvatar={() => this.setState()}
        top={this.props.top}
        help={this.props.help}
        spMenu={
          <ServiceMenu
            home={{ to: Path.home() }}
            message={{ to: Path.messages(), notificationCount: 0 }}
            schedule={{ to: Path.schedule(), notificationCount: 0 }}
            spaces={{ to: Path.spaces() }}
            addSpace={{ to: Path.createSpaceInfo() }}
            sales={{ to: Path.sales() }}
            paymentHistory={{ to: Path.paid() }}
            editProfile={{ to: Path.editProfile() }}
            help={{ href: 'https://help.monooq.com/' }}
            inquiry={{ to: Path.inquiry() }}
            howToUse={{ to: Path.howToUse() }}
            other={{ to: Path.other() }}
            userName="name"
            userImage="http://placehold.jp/500x500.png"
            isPhone
          />
        }
        storys
      />
    );
  }
}
