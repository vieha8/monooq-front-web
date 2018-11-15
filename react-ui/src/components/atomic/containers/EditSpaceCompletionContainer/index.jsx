// @flow

import React, { Component } from 'react';
import Path from 'config/path';

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

    const { space, history, dispatch, isEdit } = this.props;

    return (
      <EditSpaceTemplate
        header={<Header />}
        leftContent={
          <EditSpaceCompletion
            edit={isEdit}
            space={{
              userId: space.UserID,
            }}
            onClickViewSpace={() => {
              dispatch(spaceActions.clearSpace());
              history.push(Path.space(space.ID));
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
    space: state.space.created || state.space.space || {},
    isEdit: !state.space.created,
  });

export default connect(
  EditSpaceCompletionContainer,
  mapStateToProps,
);
