// @flow

import React, { Component } from 'react';
import Path from 'config/path';
import { Redirect } from 'react-router-dom';

import { uiActions } from 'redux/modules/ui';

import EditSpaceTemplate from 'components/atomic/templates/EditSpaceTemplate';
import Header from 'components/atomic/containers/Header';
import EditSpaceSize from 'components/atomic/LV3/EditSpace/Size';
import EditStatus from 'components/atomic/LV3/EditSpace/Status';

import { ErrorMessage } from 'strings';

import { checkLogin, checkAuthState, mergeAuthProps } from '../AuthRequired';
import connect from '../connect';

type PropTypes = {
  dispatch: Function,
  history: {
    push: Function,
  },
  space: {
    ID: number,
  },
};

class EditSpaceBaggageContainer extends Component<PropTypes> {
  constructor(props) {
    super(props);

    checkLogin(this.props);

    const { space } = this.props;

    this.state = {
      sizeType: space.sizeType || 0,
      error: {},
    };
  }

  onClickNext: Function;
  onClickNext = () => {
    this.validate(() => {
      if ((this.state.error.sizeType || []).length === 0) {
        const { dispatch, history, space } = this.props;
        const { sizeType } = this.state;

        dispatch(
          uiActions.setUiState({
            space: Object.assign(space, {
              sizeType,
            }),
          }),
        );

        let nextPath = '';
        if (space.ID) {
          nextPath =
            sizeType === 1
              ? Path.editSpacePrice(space.ID, 'all')
              : Path.editSpacePrice(space.ID, 'about');
        } else {
          nextPath = sizeType === 1 ? Path.createSpacePrice('all') : Path.createSpacePrice('about');
        }

        if (nextPath) {
          history.push(nextPath);
        }
      }
    });
  };

  onClickBack: Function;
  onClickBack = () => {
    const { dispatch, history, space } = this.props;
    const { sizeType } = this.state;

    dispatch(
      uiActions.setUiState({
        space: Object.assign(space, {
          sizeType,
        }),
      }),
    );

    const nextPath = space.ID ? Path.editSpaceReceive(space.ID) : Path.createSpaceReceive();
    history.push(nextPath);
  };

  handleChangeUI: Function;
  handleChangeUI = (propName: string, value: any) => {
    const state = this.state;
    const error = state.error;
    const errors = [];

    state[propName] = value;
    error[propName] = errors;
    this.setState({ ...state, error });
  };

  validate: Function;
  validate = (valid: Function) => {
    const { sizeType, error } = this.state;

    const sizeTypeErrors = [];
    if (`${sizeType}` === '0') {
      sizeTypeErrors.push(ErrorMessage.PleaseSelect);
    }
    error.sizeType = sizeTypeErrors;

    this.setState({ error }, valid);
  };

  render() {
    const auth = checkAuthState(this.props);
    if (auth) {
      return auth;
    }

    const { space } = this.props;
    const { sizeType, error } = this.state;

    if (!space.title) {
      return <Redirect to={Path.createSpaceInfo()} />;
    }

    return (
      <EditSpaceTemplate
        header={<Header />}
        leftContent={
          <EditSpaceSize
            size={sizeType}
            sizeErrors={error.sizeType}
            onChangeSize={v => this.handleChangeUI('sizeType', v)}
            onClickBack={this.onClickBack}
            onClickNext={this.onClickNext}
          />
        }
        rightContent={
          <EditStatus
            edit={space.ID}
            step={3}
            hintTitle="荷物受け取りのヒント"
            hintContent={[
              'お部屋がまるごと余っている場合は「複数料金」でスペースを区分けして料金設定が可能です。',
            ]}
          />
        }
      />
    );
  }
}

const mapStateToProps = state =>
  mergeAuthProps(state, {
    space: state.ui.space || {},
  });

export default connect(EditSpaceBaggageContainer, mapStateToProps);
