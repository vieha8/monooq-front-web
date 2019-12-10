import React, { Component } from 'react';
import Path from 'config/path';
import { Redirect } from 'react-router-dom';
import ContentPageMenu from 'components/hocs/ContentPageMenu';
import handleBeforeUnload from 'components/hocs/HandleBeforeUnload';
import SpaceEditAddressMethod from 'components/LV3/SpaceEdit/AddressMethod';

import { uiActions } from 'redux/modules/ui';
import { ErrorMessages } from 'variables';
import { connect } from 'react-redux';
import authRequired from 'components/containers/AuthRequired';
import { iskeyDownEnter } from 'helpers/keydown';
import { spaceActions } from '../../../redux/modules/space';

const Validate = {
  Address: `(...??[都道府県])((?:旭川|伊達|石狩|盛岡|奥州|田村|南相馬|那須塩原|東村山|武蔵村山|羽村|十日町|上越|富山|野々市|大町|蒲郡|四日市|姫路|大和郡山|廿日市|下松|岩国|田川|大村)市|.+?郡(?:玉村|大町|.+?)[町村]|.+?市.+?区|.+?[市区町村郡])(\\D+)(.*)`,
  About: {
    Max: 5000,
  },
};

class SpaceEditAddressMethodContainer extends Component {
  constructor(props) {
    super(props);

    const { space, dispatch } = this.props;

    this.state = {
      address: space.address || '',
      receiveType: space.receve || 1,
      error: {},
      isUpdate: false,
    };

    const spaceId = props.match.params.space_id;
    if (spaceId) {
      dispatch(spaceActions.prepareUpdateSpace(spaceId));
      this.state.isUpdate = true;
    }
  }

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
      const { id } = space;
      return { id };
    }
    return null;
  }

  onClickNext = () => {
    const { dispatch, history, space } = this.props;
    const { address, receiveType, isUpdate } = this.state;

    dispatch(
      uiActions.setUiState({
        space: Object.assign(space, {
          address,
          receiveType: parseInt(receiveType, 10) || 0,
        }),
      }),
    );

    const nextPath = isUpdate
      ? Path.spaceEditPrice(space.id, 'about')
      : Path.createSpacePrice('about');
    history.push(nextPath);
  };

  onClickBack = () => {
    const { dispatch, history, space } = this.props;
    const { address, receiveType, isUpdate } = this.state;

    dispatch(
      uiActions.setUiState({
        space: Object.assign(space, {
          address,
          receiveType: parseInt(receiveType, 10),
        }),
      }),
    );

    const nextPath = isUpdate ? Path.spaceEditInfo(space.id) : Path.createSpaceInfo();
    history.push(nextPath);
  };

  handleChangeUI = (propName, value) => {
    const { state } = this;
    const { error } = state;
    const errors = [];

    switch (propName) {
      case 'address':
        if (!value || value.trim().length === 0) {
          errors.push(ErrorMessages.PleaseInput);
        } else {
          const match = value ? value.match(Validate.Address) : '';
          if (!match || (match && match[4] === '')) {
            errors.push(ErrorMessages.InvalidAddress);
          }
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
    const { address } = this.state;
    const AddressMatch = address ? address.match(Validate.Address) : '';
    return (
      address &&
      (address === undefined ? false : address.trim().length > 0) &&
      (AddressMatch ? AddressMatch[4] !== '' : false)
    );
  };

  render() {
    const { space } = this.props;
    const { isUpdate, address, receiveType, error } = this.state;

    if (!isUpdate && Object.keys(space).length === 0) {
      // 新規登録画面でリロードされた場合、登録TOP画面にリダイレクト
      return <Redirect to={Path.createSpaceInfo()} />;
    }

    return (
      <SpaceEditAddressMethod
        edit={isUpdate}
        errors={error}
        address={address}
        onChangeAddress={v => this.handleChangeUI('address', v)}
        receiveType={receiveType}
        onChangeReceiveType={v => this.handleChangeUI('receiveType', v)}
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
    ContentPageMenu(connect(mapStateToProps)(SpaceEditAddressMethodContainer), {
      noFooter: true,
      maxWidth: 540,
    }),
  ),
);
