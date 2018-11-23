// @flow

import React, { Component } from 'react';
import Path from 'config/path';

import { messagesActions } from 'redux/modules/messages';

import ServiceMenu from 'components/atomic/containers/ServiceMenuContainer';
import MenuPageTemplate from 'components/atomic/templates/MenuPageTemplate';
import Header from 'components/atomic/containers/Header';
import Loading from 'components/atomic/LV1/Loading';
import InboxList from 'components/atomic/LV3/InboxList';
import NoDataView from 'components/atomic/LV3/NoDataView';

import { checkLogin, checkAuthState, mergeAuthProps } from '../AuthRequired';
import connect from '../connect';

type PropTypes = {
  dispatch: Function,
  rooms: Array<{
    id: string,
    user: {
      ID: number,
      ImageUrl: string,
      Name: string,
    },
    lastMessageDt: string,
  }>,
  isLoading: boolean,
};

class InboxContainer extends Component<PropTypes> {
  constructor(props: PropTypes) {
    super(props);

    checkLogin(this.props);

    const { dispatch } = this.props;
    dispatch(messagesActions.fetchRoomsStart());
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  leftContent = () => {
    const { isLoading, rooms, history } = this.props;

    if (isLoading) {
      return <Loading size="large" />;
    }

    return Array.isArray(rooms) && rooms.length > 0 ? (
      <InboxList
        messages={rooms.filter(room => room.user).map(message => ({
          link: Path.message(message.id),
          image: (message.user || {}).ImageUrl,
          name: (message.user || {}).Name,
          receivedAt: message.lastMessageDt,
        }))}
      />
    ) : (
      <NoDataView
        captionHead="メッセージのやり取りがありません"
        caption="メッセージがありません。ご希望のスペースを見つけて連絡を取ってみましょう。"
        buttonText="ホームへ戻る"
        onClick={() => history.push(Path.top())}
      />
    );
  };

  render() {
    const auth = checkAuthState(this.props);
    if (auth) {
      return auth;
    }

    return (
      <MenuPageTemplate
        header={<Header />}
        headline="メッセージ一覧"
        leftContent={this.leftContent()}
        rightContent={<ServiceMenu />}
      />
    );
  }
}

const mapStateToProps = state =>
  mergeAuthProps(state, {
    rooms: state.messages.rooms,
    isLoading: state.messages.isLoading,
  });

export default connect(
  InboxContainer,
  mapStateToProps,
);
