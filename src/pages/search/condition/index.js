import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactGA from 'react-ga';
import Path from 'config/path';
import { iskeyDownEnter } from 'helpers/keydown';
import { isAvailableLocalStorage } from 'helpers/storage';
import { spaceActions } from 'redux/modules/space';
import BaseTemplate from 'components/templates/BaseTemplate';
import SearchCondition from 'components/LV3/SearchCondition';
import BaseLayout from 'components/Layout';

class SearchConditionPage extends Component {
  constructor(props) {
    super(props);
    let savedConditions = {
      keyword: '',
      prefCode: 0,
    };
    if (isAvailableLocalStorage() && localStorage.getItem('searchCondition')) {
      savedConditions = JSON.parse(localStorage.getItem('searchCondition'));
    }
    const { keyword, prefCode } = savedConditions;
    this.state = {
      keyword,
      prefCode,
      error: {},
    };
  }

  onKeyDownButtonSearch = e => {
    if (iskeyDownEnter(e) && this.validate()) {
      this.onClickSearch();
    }
  };

  onClickSearch = () => {
    const { router, dispatch } = this.props;
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

    router.push(`${searchPath}${query}`);
  };

  handleChangeUI = (propName, value) => {
    const { error } = this.state;
    this.setState({
      [propName]: value,
      [error[propName]]: [],
    });
  };

  validate = () => {
    const { prefCode, keyword } = this.state;
    return keyword !== '' || prefCode !== 0;
  };

  render() {
    const { keyword, prefCode, error } = this.state;

    return (
      <BaseLayout>
        <BaseTemplate>
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
        </BaseTemplate>
      </BaseLayout>
    );
  }
}

export default connect()(SearchConditionPage);
