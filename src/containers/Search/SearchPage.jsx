import React from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';

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
  line-height: 1.6;
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
      <ResultList spaces={this.props.spaces} />
    ) : (
      <ProgressContainer>
        <CircularProgress className={this.props.classes.progress} size={50} />
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
            預ける荷物の量と期間によって最適な料金をホストが提示してくれます。数日などの短い期間で預ける場合でも同じ料金目安です。
          </Caption>
          {this.showSpaceList()}
        </ContentContainer>
        {!isMobileWindow() && <Footer />}
      </SearchPageContainer>
    );
  }
}

const styles = theme => ({
  progress: {
    margin: `0 ${theme.spacing.unit * 2}px`,
  },
});

const mapStateToProps = state => ({
  search: state.search,
  spaces: state.search.spaces,
  ui: state.ui,
});

export default connect(mapStateToProps)(withStyles(styles)(Search));
