// @flow

import React, { Component } from 'react';
import Path from 'config/path';

import { uiActions } from 'redux/modules/ui';

import MenuPageTemplate from 'components/templates/MenuPageTemplate';
import ServiceMenu from 'components/containers/ServiceMenuContainer';
import Header from 'components/containers/Header';
import EditSpaceBaggage from 'components/LV3/EditSpace/Baggage';

import ErrorMessage from 'strings';

import { checkLogin, checkAuthState, mergeAuthProps } from '../AuthRequired';
import connect from '../connect';
import { spaceActions } from '../../../../redux/modules/space';

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

    const { space, dispatch } = this.props;

    const spaceId = props.match.params.space_id;
    if (spaceId) {
      dispatch(spaceActions.prepareUpdateSpace(spaceId));
    }

    this.state = {
      About: space.About || '',
      IsFurniture: space.IsFurniture || false,
      error: {},
    };
  }

  handleBeforeUnload(e) {
    e.preventDefault();
    e.returnValue = 'データが保存されませんが、よろしいですか?';
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    window.addEventListener('beforeunload', this.handleBeforeUnload);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
  }

  onKeyDownFurniture = e => {
    if (e && e.keyCode === 32) {
      const { IsFurniture } = this.state;
      this.handleChangeUI('IsFurniture', !IsFurniture);
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { space } = nextProps;
    if (space.ID && prevState.About === '') {
      const { About, IsFurniture } = space;
      return { About, IsFurniture };
    }
    return null;
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

    const { About, IsFurniture, error } = this.state;

    return (
      <MenuPageTemplate
        header={<Header />}
        headline="預かれる荷物について"
        bottomButtonMargin={130}
        leftContent={
          <EditSpaceBaggage
            baggage={About}
            baggageErrors={error.about}
            onChangeBaggage={v => this.handleChangeUI('About', v)}
            checkedFurniture={IsFurniture}
            onClickFurniture={() => this.handleChangeUI('IsFurniture', !IsFurniture)}
            onKeyDownFurniture={this.onKeyDownFurniture}
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
  EditSpaceBaggageContainer,
  mapStateToProps,
);
