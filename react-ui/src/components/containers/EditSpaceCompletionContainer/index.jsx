// @flow

import React, { Component } from 'react';
import Path from 'config/path';

import MenuPageTemplate from 'components/templates/MenuPageTemplate';
import ServiceMenu from 'components/containers/ServiceMenuContainer';
import Header from 'components/containers/Header';
import EditSpaceCompletion from 'components/LV3/EditSpace/Completion';

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
    ID: number,
  },
};

class EditSpaceCompletionContainer extends Component<PropTypes> {
  constructor(props) {
    super(props);

    const spaceId = props.match.params.space_id;
    const isEdit = !!spaceId;
    this.state = { spaceId, isEdit };
  }

  render() {
    const { history, user } = this.props;
    const { spaceId, isEdit } = this.state;

    return (
      <MenuPageTemplate
        header={<Header />}
        headline={`${!isEdit ? '登録' : '編集'}が完了しました`}
        caption="お客様とはメッセージ機能にてやりとりしていただき、ご成約までお進みください。"
        leftContent={
          <EditSpaceCompletion
            edit={isEdit}
            userId={user.ID}
            onClickViewSpace={() => {
              history.push(Path.space(spaceId));
            }}
            onClickBackHome={() => {
              history.push(Path.home());
            }}
            onClickCreateSpace={() => {
              history.push(Path.createSpaceInfo());
            }}
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
