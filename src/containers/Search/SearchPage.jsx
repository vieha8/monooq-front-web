import React from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { CircularProgress } from 'material-ui/Progress';
import { withRouter } from 'react-router-dom';

import { searchActions } from 'redux/modules/search';
import { uiActions } from 'redux/modules/ui';
import { isMobileWindow, media } from 'helpers/style/media-query';
import { Footer } from 'components/Shared';
import { ResultList } from 'components/Search';
import SearchNotFound from 'components/Search/SearchNotFound';
import { Colors, Dimens, FontSizes } from 'variables/';
import Path from 'config/path';

const SearchPageContainer = styled.div``;

const ContentContainer = styled.div`
  padding: ${Dimens.medium3}px 8%;
  padding-bottom: 80px;

  ${media.phone`
    padding-left: 0;
    padding-right: 0;
    padding-top: ${Dimens.medium3}px;
  `};
`;

const Title = styled.h1`
  font-size: ${FontSizes.large}px;
  color: ${Colors.darkGray1};
  padding: 0 4%;
`;

const Caption = styled.h2`
  font-size: ${FontSizes.medium}px;
  color: ${Colors.darkGray1};
  padding: 0 4%;
  margin-top: ${Dimens.medium}px;
  line-height: 1.5;
`;

const ProgressContainer = styled.div`
  text-align: center;
  padding: ${Dimens.medium}px; 0;
`;

class Search extends React.Component {
  constructor(props) {
    super(props);

    const { location, dispatch } = props;

    const query = queryString.parse(location.search);
    dispatch(uiActions.setUiState({ query }));

    dispatch(searchActions.fetchStartSearch({ location: query.location || '' }));
  }

  onChangeSearchField = (e) => {
    const { dispatch } = this.props;
    dispatch(uiActions.setUiState({ researchText: e.target.value }));
  }

  onClickSearchButton = (e) => {
    e.preventDefault();
    this.search();
  }

  showSpaceList = () => {
    const { search, spaces, history } = this.props;

    if (search.isLoading) {
      return (
        <ProgressContainer>
          <CircularProgress size={50} />
        </ProgressContainer>
      );
    }

    return (
      <ResultList spaces={spaces} history={history} />
    );
  }

  handleKeyDownSearch = (e) => {
    if (e && e.keyCode === 13 && e.target.value) {
      this.search();
    }
  }

  search = () => {
    const { ui } = this.props;
    window.location.href = `${Path.search()}?location=${ui.researchText}`;
  }

  renderNotFound = () => {
    const { ui, isLogin } = this.props;
    return (
      <SearchNotFound
        locationText={ui.researchText}
        onChangeLocation={this.onChangeSearchField}
        onKeyDownSearchField={this.handleKeyDownSearch}
        searchButtonDisabled={!ui.researchText}
        onClickSearchButton={this.onClickSearchButton}
        isLogin={isLogin}
      />
    );
  }

  render() {
    const { search, spaces, ui } = this.props;
    if (!ui.query) return null;

    if (!search.isLoading && spaces.length === 0) {
      return this.renderNotFound();
    }

    return (
      <SearchPageContainer>
        <ContentContainer>
          <Title>{ui.query.location}のスペース</Title>
          <Caption>
            荷物の量と期間によって最適な料金をホストが提示してくれます。長期間の物置きとして便利です。
          </Caption>
          {this.showSpaceList()}
        </ContentContainer>
        {!isMobileWindow() && <Footer />}
      </SearchPageContainer>
    );
  }
}

const mapStateToProps = state => ({
  isLogin: state.auth.isLogin,
  search: state.search,
  spaces: state.search.spaces,
  ui: state.ui,
});

export default withRouter(connect(mapStateToProps)(Search));
