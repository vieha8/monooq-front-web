// @flow

import React, { Component } from 'react';
import Path from 'config/path';

import MenuPageTemplate from 'components/templates/MenuPageTemplate';
import ServiceMenu from 'components/containers/ServiceMenuContainer';
import Header from 'components/containers/Header';
import SpaceEditCompletion from 'components/LV3/SpaceEdit/Completion';
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

class SpaceEditCompletionContainer extends Component<PropTypes> {
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

  leftContent = isUpdate => {
    const { user } = this.props;
    return (
      <SpaceEditCompletion
        edit={isUpdate}
        userId={user.id}
        onClickBackHome={this.onClickBackHome}
        onKeyDownHome={this.onKeyDownHome}
        onClickCreateSpace={this.onClickCreateSpace}
        onKeyDownCreateSpace={this.onKeyDownCreateSpace}
        onClickViewSpace={this.onClickViewSpace}
        onKeyDownViewSpace={this.onKeyDownViewSpace}
      />
    );
  };

  render() {
    const { isUpdate } = this.state;
    return (
      <MenuPageTemplate
        header={<Header />}
        headline={`${!isUpdate ? '登録' : '編集'}が完了しました`}
        caption="お客様とはメッセージ機能にてやりとりしていただき、ご成約までお進みください。"
        leftContent={this.leftContent(isUpdate)}
        rightContent={<ServiceMenu />}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default authRequired(connect(mapStateToProps)(SpaceEditCompletionContainer));
