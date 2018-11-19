// @flow

import React, { Component } from 'react';
import Path from 'config/path';

import { uiActions } from 'redux/modules/ui';
import { spaceActions } from 'redux/modules/space';

import MenuPageTemplate from 'components/atomic/templates/MenuPageTemplate';
import ServiceMenu from 'components/atomic/containers/ServiceMenuContainer';
import Header from 'components/atomic/containers/Header';
import EditSpaceSize from 'components/atomic/LV3/EditSpace/Size';

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

class EditSpaceSizeContainer extends Component<PropTypes> {
  constructor(props) {
    super(props);

    checkLogin(this.props);

    const { dispatch, space, history } = this.props;

    this.state = {
      SizeType: space.SizeType || 0,
      error: {},
    };

    if (Object.keys(space).length === 0 && sessionStorage['editSpace']) {
      // リロードされた場合
      const saveSpace = JSON.parse(sessionStorage.getItem('editSpace'));

      dispatch(spaceActions.setSpace({ saveSpace }));
      dispatch(uiActions.setUiState({ saveSpace }));
      history.push(Path.editSpaceAreaSize(saveSpace.ID));

      this.state = {
        SizeType: saveSpace.SizeType || 0,
        error: {},
      };
    } else {
      // 通常更新の場合
      sessionStorage.setItem('editSpace', JSON.stringify(space));
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  onClickNext: Function;
  onClickNext = () => {
    this.validate(() => {
      if ((this.state.error.sizeType || []).length === 0) {
        const { dispatch, history, space } = this.props;
        const { SizeType } = this.state;

        var tmpSpace = {};
        if (Object.keys(space).length === 0 && sessionStorage['editSpace']) {
          tmpSpace = JSON.parse(sessionStorage.getItem('editSpace'));
        } else {
          tmpSpace = space;
        }

        dispatch(
          uiActions.setUiState({
            space: Object.assign(tmpSpace, {
              SizeType,
            }),
          }),
        );

        let nextPath = '';
        if (tmpSpace.ID) {
          nextPath =
            SizeType === 1
              ? Path.editSpacePrice(tmpSpace.ID, 'all')
              : Path.editSpacePrice(tmpSpace.ID, 'about');
        } else {
          nextPath = SizeType === 1 ? Path.createSpacePrice('all') : Path.createSpacePrice('about');
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
    const { SizeType } = this.state;

    var tmpSpace = {};
    if (Object.keys(space).length === 0 && sessionStorage['editSpace']) {
      tmpSpace = JSON.parse(sessionStorage.getItem('editSpace'));
    } else {
      tmpSpace = space;
    }

    dispatch(
      uiActions.setUiState({
        space: Object.assign(tmpSpace, {
          SizeType,
        }),
      }),
    );

    const nextPath = tmpSpace.ID ? Path.editSpaceReceive(tmpSpace.ID) : Path.createSpaceReceive();
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
    const { SizeType, error } = this.state;

    const sizeTypeErrors = [];
    if (`${SizeType}` === '0') {
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
    const { SizeType, error } = this.state;

    return (
      <MenuPageTemplate
        header={<Header />}
        headline="広さから料金を設定する"
        leftContent={
          <EditSpaceSize
            size={SizeType}
            sizeErrors={error.sizeType}
            onChangeSize={v => this.handleChangeUI('SizeType', v)}
            onClickBack={this.onClickBack}
            onClickNext={this.onClickNext}
          />
        }
        rightContent={<ServiceMenu />}
      />
    );
  }
}

const mapStateToProps = state =>
  mergeAuthProps(state, {
    space: state.ui.space || {},
  });

export default connect(
  EditSpaceSizeContainer,
  mapStateToProps,
);
