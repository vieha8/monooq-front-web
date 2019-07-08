// @flow

import React, { Component } from 'react';
import Path from 'config/path';

import MenuPageTemplate from 'components/templates/MenuPageTemplate';
import ServiceMenu from 'components/containers/ServiceMenuContainer';
import Header from 'components/containers/Header';
import EditSpaceCompletion from 'components/LV3/EditSpace/Completion';
import { iskeyDownEnter } from 'helpers/keydown';

import { connect } from 'react-redux';
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

    const spaceId = props.match.params.space_id;
    const isEdit = !!spaceId;
    this.state = { spaceId, isEdit };
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
    const { history } = this.props;
    history.push(Path.createSpaceInfo());
  };

  onKeyDownCreateSpace = e => {
    if (iskeyDownEnter(e)) {
      this.onClickCreateSpace();
    }
  };

  render() {
    const { user } = this.props;
    const { isEdit } = this.state;

    return (
      <MenuPageTemplate
        header={<Header />}
        headline={`${!isEdit ? '登録' : '編集'}が完了しました`}
        caption="お客様とはメッセージ機能にてやりとりしていただき、ご成約までお進みください。"
        leftContent={
          <EditSpaceCompletion
            edit={isEdit}
            userId={user.id}
            onClickBackHome={this.onClickBackHome}
            onKeyDownHome={this.onKeyDownHome}
            onClickCreateSpace={this.onClickCreateSpace}
            onKeyDownCreateSpace={this.onKeyDownCreateSpace}
            onClickViewSpace={this.onClickViewSpace}
            onKeyDownViewSpace={this.onKeyDownViewSpace}
          />
        }
        rightContent={<ServiceMenu />}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default authRequired(connect(mapStateToProps)(EditSpaceCompletionContainer));
