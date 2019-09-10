// @flow

import React, { Component } from 'react';
import Path from 'config/path';
import ReactGA from 'react-ga';
import MenuPageTemplate from 'components/templates/MenuPageTemplate';
import ServiceMenu from 'components/containers/ServiceMenuContainer';
import Header from 'components/containers/Header';
import SearchCondition from 'components/LV3/SearchCondition';
import { spaceActions } from 'redux/modules/space';
import { isAvailableLocalStorage } from 'helpers/storage';
import { iskeyDownEnter, iskeyDownSpace } from 'helpers/keydown';
import connect from '../connect';

type PropTypes = {
  history: {
    push: Function,
  },
  space: {
    id: number,
  },
};

class SearchConditionContainer extends Component<PropTypes> {
  constructor(props) {
    super(props);

    if (isAvailableLocalStorage() && localStorage.getItem('searchCondition')) {
      const savedConditions = JSON.parse(localStorage.getItem('searchCondition'));
      const { keyword, prefCode, type, isFurniture, receiptType } = savedConditions;
      this.state = {
        keyword: keyword || '',
        prefCode: prefCode || 0,
        type: type || 0,
        isFurniture,
        receiptType: receiptType || 0,
        error: {},
      };
    } else {
      this.state = {
        keyword: '',
        prefCode: 0,
        type: 0,
        isFurniture: false,
        receiptType: 0,
        error: {},
      };
    }
  }

  onKeyDownFurniture = e => {
    if (iskeyDownSpace(e)) {
      const { isFurniture } = this.state;
      this.handleChangeUI('isFurniture', !isFurniture);
    }
  };

  onKeyDownButtonSearch = e => {
    if (iskeyDownEnter(e) && this.validate()) {
      this.onClickSearch();
    }
  };

  onClickSearch = () => {
    const { history, dispatch } = this.props;
    dispatch(spaceActions.resetSearch());

    const { keyword, prefCode, type, isFurniture, receiptType } = this.state;
    const searchPath = Path.search();
    let query = `?keyword=${keyword}`;
    query += `&prefCode=${prefCode}`;
    query += `&type=${type}`;
    query += `&isFurniture=${isFurniture}`;
    query += `&receiptType=${receiptType}`;

    ReactGA.event({
      category: 'Search',
      action: 'Submit Condition Search Form',
      label: query,
    });

    if (isAvailableLocalStorage()) {
      const params = { keyword, prefCode, type, isFurniture, receiptType };
      localStorage.setItem('searchCondition', JSON.stringify(params));
    }

    history.push(`${searchPath}${query}`);
  };

  handleChangeUI = (propName: string, value: any) => {
    const { state } = this;
    const { error } = state;
    const errors = [];
    state[propName] = value;
    error[propName] = errors;
    this.setState({ ...state, error });
  };

  validate = () => {
    return true;
  };

  leftContent = () => {
    const { keyword, prefCode, type, isFurniture, receiptType, error } = this.state;
    return (
      <SearchCondition
        errors={error}
        keyword={keyword}
        onChangeKeyword={v => this.handleChangeUI('keyword', v)}
        prefCode={prefCode}
        onChangePrefCode={v => this.handleChangeUI('prefCode', v)}
        type={type}
        onChangeType={v => this.handleChangeUI('type', v)}
        checkedFurniture={isFurniture}
        onClickFurniture={() => this.handleChangeUI('isFurniture', !isFurniture)}
        onKeyDownFurniture={this.onKeyDownFurniture}
        receive={receiptType}
        onChangeReceive={v => this.handleChangeUI('receiptType', v)}
        buttonDisabled={!this.validate()}
        onClickSearch={this.onClickSearch}
        onKeyDownButtonSearch={this.onKeyDownButtonSearch}
      />
    );
  };

  render() {
    return (
      <MenuPageTemplate
        header={<Header />}
        headline="スペース検索"
        leftContent={this.leftContent()}
        rightContent={<ServiceMenu />}
      />
    );
  }
}

export default connect(SearchConditionContainer);
