import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';

import { searchActions } from 'redux/modules/search';
import { isMobileWindow, media } from 'helpers/style/media-query';
import { Footer } from 'components/Shared';
import { ResultList } from 'components/Search';
import { Colors, Dimens, FontSizes } from 'variables/';

import { spaceList } from './mock';

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

const SelectContainer = styled.div`
  text-align: right;
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

    const { match, dispatch } = props;

    dispatch(searchActions.fetchStartSearch(match.params.location));
  }

  showSpaceList = () =>
    !this.props.search.isLoading ? (
      <ResultList spaces={spaceList} />
    ) : (
      <ProgressContainer>
        <CircularProgress className={this.props.classes.progress} size={50} />
      </ProgressContainer>
    );

  render() {
    const { match } = this.props;
    return (
      <SearchPageContainer>
        <ContentContainer>
          <Title>{match.params.location}の場所</Title>
          <Caption>
            預ける荷物の量と期間によって最適な料金をホストが提示してくれます。数日などの短い期間で預ける場合でも同じ料金目安です。
          </Caption>
          <SelectContainer>
            <select>
              <option>価格の安い順</option>
              <option>家具・家電OK</option>
            </select>
          </SelectContainer>
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
});

export default connect(mapStateToProps)(withStyles(styles)(Search));
