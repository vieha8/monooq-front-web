// @flow

import React, { Component } from 'react';
import Path from 'config/path';
import { Redirect } from 'react-router-dom';

import { uiActions } from 'redux/modules/ui';

import EditSpaceTemplate from 'components/atomic/templates/EditSpaceTemplate';
import Header from 'components/atomic/containers/Header';
import EditSpaceBaggage from 'components/atomic/LV3/EditSpace/Baggage';
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
      About: space.About || '',
      IsFurniture: space.IsFurniture || false,
      error: {},
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  onClickNext: Function;
  onClickNext = () => {
    this.validate(() => {
      if ((this.state.error.about || []).length === 0) {
        const { dispatch, history, space } = this.props;
        const { About, IsFurniture } = this.state;

        dispatch(
          uiActions.setUiState({
            space: Object.assign(space, {
              About,
              IsFurniture,
            }),
          }),
        );

        const nextPath = space.ID ? Path.editSpaceReceive(space.ID) : Path.createSpaceReceive();
        history.push(nextPath);
      }
    });
  };

  onClickBack: Function;
  onClickBack = () => {
    const { dispatch, history, space } = this.props;
    const { About, IsFurniture } = this.state;

    dispatch(
      uiActions.setUiState({
        space: Object.assign(space, {
          About,
          IsFurniture,
        }),
      }),
    );

    const nextPath = space.ID ? Path.editSpaceInfo(space.ID) : Path.createSpaceInfo();
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
    const { About, error } = this.state;

    const aboutErrors = [];
    if (About.length === 0) {
      aboutErrors.push(ErrorMessage.PleaseInput);
    }
    error.about = aboutErrors;

    this.setState({ error }, valid);
  };

  render() {
    const auth = checkAuthState(this.props);
    if (auth) {
      return auth;
    }

    const { space } = this.props;
    const { About, IsFurniture, error } = this.state;

    if (!space.Title) {
      return <Redirect to={Path.createSpaceInfo()} />;
    }

    return (
      <EditSpaceTemplate
        header={<Header />}
        leftContent={
          <EditSpaceBaggage
            baggage={About}
            baggageErrors={error.about}
            onChangeBaggage={v => this.handleChangeUI('About', v)}
            checkedFurniture={IsFurniture}
            onClickFurniture={() => this.handleChangeUI('IsFurniture', !IsFurniture)}
            onClickBack={this.onClickBack}
            onClickNext={this.onClickNext}
          />
        }
        rightContent={
          <EditStatus
            edit={space.ID}
            step={1}
            hintTitle="ヒント"
            hintContent={[
              'ユーザーが自分の荷物が入るかイメージできるようにスペースの情報やアピールポイントを掲載しましょう！',
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
