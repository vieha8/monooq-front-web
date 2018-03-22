import React from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { CircularProgress } from 'material-ui/Progress';
import { withRouter } from "react-router-dom";

import { searchActions } from 'redux/modules/search';
import { uiActions } from 'redux/modules/ui';
import { isMobileWindow, media } from 'helpers/style/media-query';
import { Footer } from 'components/Shared';
import { ResultList } from 'components/Search';
import { Colors, Dimens, FontSizes } from 'variables/';

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
    dispatch(searchActions.fetchStartSearch(query.location || ''));
  }

  showSpaceList = () => (
    !this.props.search.isLoading ? (
      <ResultList spaces={this.props.spaces} history={this.props.history} />
    ) : (
      <ProgressContainer>
        <CircularProgress size={50} />
      </ProgressContainer>
    )
  )

  render() {
    const { ui } = this.props;
    if (!ui.query) return null;

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
  search: state.search,
  spaces: state.search.spaces,
  ui: state.ui,
});

export default withRouter(connect(mapStateToProps)(Search));
