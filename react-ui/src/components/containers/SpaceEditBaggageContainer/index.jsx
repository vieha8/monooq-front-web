// @flow

import React, { Component } from 'react';
import Path from 'config/path';
import { Redirect } from 'react-router-dom';
import ContentPageMenu from 'components/hocs/ContentPageMenu';
import handleBeforeUnload from 'components/hocs/HandleBeforeUnload';
import SpaceEditBaggage from 'components/LV3/SpaceEdit/Baggage';

import { uiActions } from 'redux/modules/ui';
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
    id: number,
  },
};

const Validate = {
  About: {
    Max: 5000,
  },
};

class SpaceEditBaggageContainer extends Component<PropTypes> {
  constructor(props) {
    super(props);

    const { space, dispatch } = this.props;

    this.state = {
      about: space.about || '',
      isFurniture: space.isFurniture || false,
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
      const { isFurniture } = this.state;
      this.handleChangeUI('isFurniture', !isFurniture);
    }
  };

  onKeyDownButtonNext = e => {
    if (iskeyDownEnter(e) && this.validate()) {
      this.onClickNext();
    }
  };

  onKeyDownButtonBack = e => {
    if (iskeyDownEnter(e)) {
      this.onClickBack();
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { space } = nextProps;
    if (space.id && !prevState.id) {
      const { about, isFurniture, id } = space;
      return { about, isFurniture, id };
    }
    return null;
  }

  onClickNext = () => {
    const { dispatch, history, space } = this.props;
    const { about, isFurniture, isUpdate } = this.state;

    dispatch(
      uiActions.setUiState({
        space: Object.assign(space, {
          about,
          isFurniture,
        }),
      }),
    );

    const nextPath = isUpdate ? Path.spaceEditReceive(space.id) : Path.createSpaceReceive();
    history.push(nextPath);
  };

  onClickBack = () => {
    const { dispatch, history, space } = this.props;
    const { about, isFurniture, isUpdate } = this.state;

    dispatch(
      uiActions.setUiState({
        space: Object.assign(space, {
          about,
          isFurniture,
        }),
      }),
    );

    const nextPath = isUpdate ? Path.spaceEditInfo(space.id) : Path.createSpaceInfo();
    history.push(nextPath);
  };

  handleChangeUI = (propName: string, value: any) => {
    const { state } = this;
    const { error } = state;
    const errors = [];

    switch (propName) {
      case 'about':
        if (!value || value.trim().length === 0) {
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

  validate = () => {
    const { about } = this.state;
    return (
      about &&
      (about === undefined ? false : about.trim().length > 0) &&
      about.trim().length <= Validate.About.Max
    );
  };

  render() {
    const { space } = this.props;
    const { isUpdate, about, isFurniture, error } = this.state;

    if (!isUpdate && Object.keys(space).length === 0) {
      // 新規登録画面でリロードされた場合、登録TOP画面にリダイレクト
      return <Redirect to={Path.createSpaceInfo()} />;
    }

    return (
      <SpaceEditBaggage
        errors={error}
        baggage={about}
        onChangeBaggage={v => this.handleChangeUI('about', v)}
        checkedFurniture={isFurniture}
        onClickFurniture={() => this.handleChangeUI('isFurniture', !isFurniture)}
        onKeyDownFurniture={this.onKeyDownFurniture}
        onClickBack={this.onClickBack}
        onKeyDownButtonBack={this.onKeyDownButtonBack}
        onClickNext={this.onClickNext}
        onKeyDownButtonNext={this.onKeyDownButtonNext}
        buttonNextDisabled={!this.validate()}
      />
    );
  }
}

const mapStateToProps = state => ({
  space: state.ui.space || {},
});

export default authRequired(
  handleBeforeUnload(
    ContentPageMenu(connect(mapStateToProps)(SpaceEditBaggageContainer), {
      headline: '預かれる荷物について',
    }),
  ),
);
