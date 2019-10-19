// @flow

import React, { Component } from 'react';
import Path from 'config/path';
import ReactGA from 'react-ga';
import ContentPageMenu from 'components/hocs/ContentPageMenu';
import SearchCondition from 'components/LV3/SearchCondition';
import { spaceActions } from 'redux/modules/space';
import { isAvailableLocalStorage } from 'helpers/storage';
import { iskeyDownEnter } from 'helpers/keydown';
import connect from '../connect';

class SearchConditionContainer extends Component {
  constructor(props) {
    super(props);

    if (isAvailableLocalStorage() && localStorage.getItem('searchCondition')) {
      const savedConditions = JSON.parse(localStorage.getItem('searchCondition'));
      const { keyword, prefCode } = savedConditions;
      this.state = {
        keyword: keyword || '',
        prefCode: prefCode || 0,
        error: {},
      };
    } else {
      this.state = {
        keyword: '',
        prefCode: 0,
        error: {},
      };
    }
  }

  onKeyDownButtonSearch = e => {
    if (iskeyDownEnter(e) && this.validate()) {
      this.onClickSearch();
    }
  };

  onClickSearch = () => {
    const { history, dispatch } = this.props;
    dispatch(spaceActions.resetSearch());

    const { keyword, prefCode } = this.state;
    const searchPath = Path.search();
    let query = `?keyword=${keyword}`;
    if (prefCode !== 0) {
      query += `&pref=${prefCode}`;
    }

    ReactGA.event({
      category: 'Search',
      action: 'Submit Condition Search Form',
      label: query,
    });

    if (isAvailableLocalStorage()) {
      const params = { keyword, prefCode };
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
    const { prefCode, keyword } = this.state;
    if (keyword !== '' || prefCode !== 0) {
      return true;
    }
    return false;
  };

  render() {
    const { keyword, prefCode, error } = this.state;

    return (
      <SearchCondition
        errors={error}
        keyword={keyword}
        onChangeKeyword={v => this.handleChangeUI('keyword', v)}
        prefCode={prefCode}
        onChangePrefCode={v => this.handleChangeUI('prefCode', v)}
        buttonDisabled={!this.validate()}
        onClickSearch={this.onClickSearch}
        onKeyDownButtonSearch={this.onKeyDownButtonSearch}
      />
    );
  }
}

export default ContentPageMenu(connect(SearchConditionContainer), {
  headline: 'スペース検索',
});
