// @flow

import React, { Component } from 'react';
import Path from 'config/path';

import { uiActions } from 'redux/modules/ui';
import { spaceActions } from 'redux/modules/space';

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

    const { dispatch, space, history } = this.props;

    this.state = {
      About: space.About || '',
      IsFurniture: space.IsFurniture || false,
      error: {},
    };

    if (Object.keys(space).length === 0 && sessionStorage['editSpace']) {
      // リロードされた場合
      const saveSpace = JSON.parse(sessionStorage.getItem('editSpace'));

      dispatch(spaceActions.setSpace({ saveSpace }));
      dispatch(uiActions.setUiState({ saveSpace }));
      history.push(Path.editSpaceBaggage(saveSpace.ID));

      this.state = {
        About: saveSpace.About || '',
        IsFurniture: saveSpace.IsFurniture || false,
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
      if ((this.state.error.about || []).length === 0) {
        const { dispatch, history, space } = this.props;
        const { About, IsFurniture } = this.state;

        var tmpSpace = {};
        if (Object.keys(space).length === 0 && sessionStorage['editSpace']) {
          tmpSpace = JSON.parse(sessionStorage.getItem('editSpace'));
        } else {
          tmpSpace = space;
        }

        dispatch(
          uiActions.setUiState({
            space: Object.assign(tmpSpace, {
              About,
              IsFurniture,
            }),
          }),
        );

        const nextPath = tmpSpace.ID
          ? Path.editSpaceReceive(tmpSpace.ID)
          : Path.createSpaceReceive();
        history.push(nextPath);
      }
    });
  };

  onClickBack: Function;
  onClickBack = () => {
    const { dispatch, history, space } = this.props;
    const { About, IsFurniture } = this.state;

    var tmpSpace = {};
    if (Object.keys(space).length === 0 && sessionStorage['editSpace']) {
      tmpSpace = JSON.parse(sessionStorage.getItem('editSpace'));
    } else {
      tmpSpace = space;
    }

    dispatch(
      uiActions.setUiState({
        space: Object.assign(tmpSpace, {
          About,
          IsFurniture,
        }),
      }),
    );

    const nextPath = tmpSpace.ID ? Path.editSpaceInfo(tmpSpace.ID) : Path.createSpaceInfo();
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
    if (aboutErrors.length > 5000) {
      aboutErrors.push(ErrorMessage.LengthMax('説明', 5000));
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

export default connect(
  EditSpaceBaggageContainer,
  mapStateToProps,
);
