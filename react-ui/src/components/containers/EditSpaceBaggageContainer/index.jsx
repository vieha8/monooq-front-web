// @flow

import React, { Component } from 'react';
import Path from 'config/path';
import { Redirect } from 'react-router-dom';
import handleBeforeUnload from 'components/hocs/handleBeforeUnload';

import { uiActions } from 'redux/modules/ui';

import MenuPageTemplate from 'components/templates/MenuPageTemplate';
import ServiceMenu from 'components/containers/ServiceMenuContainer';
import Header from 'components/containers/Header';
import EditSpaceBaggage from 'components/LV3/EditSpace/Baggage';

import { ErrorMessages } from 'variables';

import { connect } from 'react-redux';
import authRequired from 'components/containers/AuthRequired';
import { iskeyDownEnter, iskeyDownSpace } from 'helpers/keydown';
import { spaceActions } from '../../../redux/modules/space';

type PropTypes = {
  dispatch: Function,
  history: {
    push: Function,
  },
  space: {
    ID: number,
  },
};

const Validate = {
  About: {
    Max: 5000,
  },
};

class EditSpaceBaggageContainer extends Component<PropTypes> {
  constructor(props) {
    super(props);

    const { space, dispatch } = this.props;

    this.state = {
      About: space.About || '',
      IsFurniture: space.IsFurniture || false,
      error: {},
      isUpdate: false,
    };

    const spaceId = props.match.params.space_id;
    if (spaceId) {
      dispatch(spaceActions.prepareUpdateSpace(spaceId));
      this.state.isUpdate = true;
    }
  }

  onKeyDownFurniture = e => {
    if (iskeyDownSpace(e)) {
      const { IsFurniture } = this.state;
      this.handleChangeUI('IsFurniture', !IsFurniture);
    }
  };

  onKeyDownButtonNext: Function;

  onKeyDownButtonNext = e => {
    if (iskeyDownEnter(e) && this.validate()) {
      this.onClickNext();
    }
  };

  onKeyDownButtonBack: Function;

  onKeyDownButtonBack = e => {
    if (iskeyDownEnter(e)) {
      this.onClickBack();
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { space } = nextProps;
    if (space.ID && !prevState.ID) {
      const { About, IsFurniture, ID } = space;
      return { About, IsFurniture, ID };
    }
    return null;
  }

  onClickNext: Function;

  onClickNext = () => {
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
    const { state } = this;
    const { error } = state;
    const errors = [];

    switch (propName) {
      case 'About':
        if (value === undefined ? true : value.trim().length === 0) {
          errors.push(ErrorMessages.PleaseInput);
        } else if (value.length > Validate.About.Max) {
          errors.push(ErrorMessages.LengthMax('説明', Validate.About.Max));
        }
        break;
      default:
        break;
    }

    state[propName] = value;
    error[propName] = errors;
    this.setState({ ...state, error });
  };

  validate: Function;

  validate = () => {
    const { About } = this.state;
    return (
      About &&
      (About === undefined ? false : About.trim().length > 0) &&
      About.trim().length <= Validate.About.Max
    );
  };

  render() {
    const { space } = this.props;
    const { About, IsFurniture, error, isUpdate } = this.state;

    if (!isUpdate) {
      if (Object.keys(space).length === 0) {
        // 新規登録画面でリロードされた場合、登録TOP画面にリダイレクト
        return <Redirect to={Path.createSpaceInfo()} />;
      }
    }

    return (
      <MenuPageTemplate
        header={<Header />}
        headline="預かれる荷物について"
        bottomButtonMargin={130}
        leftContent={
          <EditSpaceBaggage
            baggage={About}
            baggageErrors={error.About}
            onChangeBaggage={v => this.handleChangeUI('About', v)}
            checkedFurniture={IsFurniture}
            onClickFurniture={() => this.handleChangeUI('IsFurniture', !IsFurniture)}
            onKeyDownFurniture={this.onKeyDownFurniture}
            onClickBack={this.onClickBack}
            onClickNext={this.onClickNext}
            onKeyDownButtonBack={this.onKeyDownButtonBack}
            onKeyDownButtonNext={this.onKeyDownButtonNext}
            buttonNextDisabled={!this.validate()}
          />
        }
        rightContent={<ServiceMenu />}
      />
    );
  }
}

const mapStateToProps = state => ({
  space: state.ui.space || {},
});

export default authRequired(
  handleBeforeUnload(connect(mapStateToProps)(EditSpaceBaggageContainer)),
);
