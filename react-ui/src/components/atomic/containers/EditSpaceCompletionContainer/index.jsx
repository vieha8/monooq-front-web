// @flow

import React, { Component } from 'react';
import Path from 'config/path';
import { Redirect } from 'react-router-dom';

import MenuPageTemplate from 'components/atomic/templates/MenuPageTemplate';
import ServiceMenu from 'components/atomic/containers/ServiceMenuContainer';
import Header from 'components/atomic/containers/Header';
import EditSpaceCompletion from 'components/atomic/LV3/EditSpace/Completion';
import { spaceActions } from 'redux/modules/space';

import { checkLogin, checkAuthState, mergeAuthProps } from '../AuthRequired';
import connect from '../connect';

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

    checkLogin(this.props);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const auth = checkAuthState(this.props);
    if (auth) {
      return auth;
    }

    const { editedSpace, history, dispatch } = this.props;

    if (!editedSpace.Title) {
      return <Redirect to={Path.createSpaceInfo()} />;
    }

    return (
      <MenuPageTemplate
        header={<Header />}
        headline={`${editedSpace.Host.ID === 0 ? '登録' : '編集'}が完了しました`}
        caption="お客様とはメッセージ機能にてやりとりしていただき、ご成約までお進みください。"
        leftContent={
          <EditSpaceCompletion
            edit={editedSpace.Host.ID}
            space={{
              userId: (editedSpace || {}).UserID,
            }}
            onClickViewSpace={() => {
              dispatch(spaceActions.clearSpace());
              history.push(Path.space(editedSpace.ID));
            }}
            onClickBackTop={() => {
              dispatch(spaceActions.clearSpace());
              history.push(Path.top());
            }}
            onClickCreateSpace={() => {
              dispatch(spaceActions.clearSpace());
              history.push(Path.createSpaceInfo());
            }}
          />
        }
        rightContent={<ServiceMenu />}
      />
    );
  }
}

const mapStateToProps = state =>
  mergeAuthProps(state, {
    editedSpace: state.space.created || state.space.space || {},
  });

export default connect(
  EditSpaceCompletionContainer,
  mapStateToProps,
);
