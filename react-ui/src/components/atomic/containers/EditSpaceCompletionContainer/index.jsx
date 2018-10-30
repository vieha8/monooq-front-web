// @flow

import React, { Component } from 'react';
import Path from 'config/path';
import { Redirect } from 'react-router-dom';

import EditSpaceTemplate from 'components/atomic/templates/EditSpaceTemplate';
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

    const { space, history, editedSpace, dispatch } = this.props;
    var editedTmpSpace = {};

    if (Object.keys(editedSpace).length === 0 && sessionStorage['editSpace']) {
      editedTmpSpace = JSON.parse(sessionStorage.getItem('editSpace'));
    } else {
      editedTmpSpace = editedSpace;
    }

    sessionStorage.removeItem('editSpace');

    if (!space.Title) {
      return <Redirect to={Path.createSpaceInfo()} />;
    }

    return (
      <EditSpaceTemplate
        header={<Header />}
        leftContent={
          <EditSpaceCompletion
            edit={space.ID}
            space={{
              userId: (editedTmpSpace || {}).UserID,
            }}
            onClickViewSpace={() => {
              dispatch(spaceActions.clearSpace());
              history.push(Path.space(editedTmpSpace.ID));
            }}
          />
        }
        rightContent={<div />}
      />
    );
  }
}

const mapStateToProps = state =>
  mergeAuthProps(state, {
    editedSpace: state.space.created || state.space.space || {},
    space: state.ui.space || {},
  });

export default connect(
  EditSpaceCompletionContainer,
  mapStateToProps,
);
