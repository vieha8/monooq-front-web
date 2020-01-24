import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Path from 'config/path';

import ContentPageMenu from 'components/hocs/ContentPageMenu';
import HostGuideList from 'components/LV2/Lists/HostGuideList';
import SpaceEditCompletion from 'components/LV3/SpaceEdit/Completion';
import { H1 } from 'components/LV1/Texts/Headline';
import InlineText from 'components/LV1/Texts/InlineText';
import { iskeyDownEnter } from 'helpers/keydown';

import { connect } from 'react-redux';
import { uiActions } from 'redux/modules/ui';
import { Dimens } from 'variables';
import withAuthRequire from 'components/hooks/withAuthRequire';

const Caption = styled.div`
  margin: ${Dimens.medium_20}px 0;
`;

class SpaceEditCompletionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spaceId: props.match.params.space_id,
      isUpdate: !!props.match.params.space_id,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(uiActions.setUiState({ space: {} }));
  }

  // TODO: イベント処理を共通化したい

  onClickViewSpace = () => {
    const { history } = this.props;
    const { spaceId } = this.state;
    history.push(Path.space(spaceId));
  };

  onKeyDownViewSpace = e => {
    if (iskeyDownEnter(e)) {
      this.onClickViewSpace();
    }
  };

  onClickBackTop = () => {
    const { history } = this.props;
    history.push(Path.top());
  };

  onKeyDownTop = e => {
    if (iskeyDownEnter(e)) {
      this.onClickBackTop();
    }
  };

  onClickCreateSpace = () => {
    const { history } = this.props;
    history.push(Path.spaceCreate1());
  };

  onKeyDownCreateSpace = e => {
    if (iskeyDownEnter(e)) {
      this.onClickCreateSpace();
    }
  };

  leftContent = isUpdate => {
    const { user } = this.props;
    return (
      <Fragment>
        <HostGuideList
          header="ご成約までの流れ"
          guideList={[
            {
              text:
                'リクエストが届いてから24時間以内に返信しましょう。早めに返信をすると成約率が高くなります！',
            },
            {
              text:
                '荷物の内容や量・利用期間などゲストの要望を確認し、引き受ける場合は見積もりを提出しましょう。',
            },
            {
              text: (
                <Fragment>
                  ゲストの決済が完了すると取引が成立し、スペースの住所がメッセージページに公開されます。
                  <br />
                  利用開始日になったら荷物を受け取りましょう。
                </Fragment>
              ),
            },
          ]}
        />
        <SpaceEditCompletion
          edit={isUpdate}
          userId={user.id}
          onClickBackTop={this.onClickBackTop}
          onKeyDownTop={this.onKeyDownTop}
          onClickCreateSpace={this.onClickCreateSpace}
          onKeyDownCreateSpace={this.onKeyDownCreateSpace}
          onClickViewSpace={this.onClickViewSpace}
          onKeyDownViewSpace={this.onKeyDownViewSpace}
        />
      </Fragment>
    );
  };

  render() {
    const { isUpdate } = this.state;
    return (
      <Fragment>
        <H1 bold>{`${!isUpdate ? '登録' : '編集'}が完了しました`}</H1>
        <Caption>
          <InlineText.Base>
            {!isUpdate ? 'スペースが掲載されました！' : 'スペースの情報を更新しました！'}
            <br />
            利用リクエストがあると、メッセージページでゲストとのやり取りがはじまります。
            <br />
            ご登録のメールアドレスにメッセージ通知が届きますので、随時メールをご確認ください。
          </InlineText.Base>
        </Caption>
        {this.leftContent(isUpdate)}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default withAuthRequire(
  ContentPageMenu(connect(mapStateToProps)(SpaceEditCompletionPage), {}),
);
