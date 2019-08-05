// @flow

import React, { Component, Fragment } from 'react';
import Path from 'config/path';

import MenuPageTemplate from 'components/templates/MenuPageTemplate';
import ServiceMenu from 'components/containers/ServiceMenuContainer';
import Header from 'components/containers/Header';
import HostGuide from 'components/LV2/HostGuide';
import EditSpaceCompletion from 'components/LV3/EditSpace/Completion';
import { iskeyDownEnter } from 'helpers/keydown';

import { connect } from 'react-redux';
import { uiActions } from 'redux/modules/ui';
import authRequired from 'components/containers/AuthRequired';

type PropTypes = {
  history: {
    push: Function,
  },
  space: {
    Title: string,
  },
  editedSpace: {
    id: number,
  },
};

class EditSpaceCompletionContainer extends Component<PropTypes> {
  constructor(props) {
    super(props);

    this.state = {
      spaceId: '',
      isUpdate: false,
    };

    const spaceId = props.match.params.space_id;
    this.state.spaceId = spaceId;
    if (spaceId) {
      this.state.isUpdate = true;
    }
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

  onClickBackHome = () => {
    const { history } = this.props;
    history.push(Path.home());
  };

  onKeyDownHome = e => {
    if (iskeyDownEnter(e)) {
      this.onClickBackHome();
    }
  };

  onClickCreateSpace = () => {
    const { history, dispatch } = this.props;
    dispatch(uiActions.setUiState({ space: {} }));
    history.push(Path.createSpaceInfo());
  };

  onKeyDownCreateSpace = e => {
    if (iskeyDownEnter(e)) {
      this.onClickCreateSpace();
    }
  };

  captionContent = isUpdate => {
    return (
      <Fragment>
        {!isUpdate ? 'モノオクにスペースが掲載されました！' : 'スペースの情報を更新しました！'}
        <br />
        利用希望のリクエストが届くと、メッセージページにてユーザーとのやり取りが可能になります。
        <br />
        利用期間や価格等を調整し、取引を進めましょう！
      </Fragment>
    );
  };

  leftContent = isUpdate => {
    const { user } = this.props;
    return (
      <Fragment>
        <HostGuide
          header="ご成約までの流れ"
          data1="リクエストが届いてから24時間以内に返信しましょう。早めに返信した方が、成約率が高くなります！"
          data2="荷物の内容や量・利用期間などユーザーの要望を確認し、引き受けられる場合は見積もりを提出しましょう。"
          data3="ユーザーからの決済が完了すると取引が成立し、スペースの住所がメッセージルームに公開されます。利用開始日になったら荷物を受け取りましょう。"
        />
        <EditSpaceCompletion
          edit={isUpdate}
          userId={user.id}
          onClickBackHome={this.onClickBackHome}
          onKeyDownHome={this.onKeyDownHome}
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
      <MenuPageTemplate
        header={<Header />}
        headline={`${!isUpdate ? '登録' : '編集'}が完了しました`}
        caption={this.captionContent(isUpdate)}
        leftContent={this.leftContent(isUpdate)}
        rightContent={<ServiceMenu />}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default authRequired(connect(mapStateToProps)(EditSpaceCompletionContainer));
