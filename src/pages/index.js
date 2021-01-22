import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Path from 'config/path';
import { makeConditionTitle } from 'helpers/search';
import { isAvailableLocalStorage } from 'helpers/storage';
import { sectionActions } from 'redux/modules/section';
import { spaceActions } from 'redux/modules/space';
import Top from 'components/LV3/Top';
import LoadingPage from 'components/LV3/LoadingPage';

// import RecommendedSpace from './StaticRecommendedSpace';

// TODO: アクセス増が想定される場合、おすすめ一覧が固定のものになるよう事前に修正しておく。
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 8,
      offset: 0,
    };

    const { dispatch } = this.props;

    dispatch(sectionActions.getRegion());
    // dispatch(sectionActions.fetchSections());

    // 非ログイン状態ならAction内で検索をやめてくれるのでここで分岐はしない
    dispatch(spaceActions.doSearchMyArea());
  }

  componentDidMount() {
    const { referrer } = document;
    if (isAvailableLocalStorage()) {
      if (!localStorage.getItem('referrer')) {
        localStorage.setItem('referrer', referrer);
      }
    }

    const { dispatch } = this.props;
    const { limit, offset } = this.state;
    const params = {
      limit,
      offset,
      refresh: true,
    };
    dispatch(spaceActions.getSpaceAccessLog(params));
    const newOffset = offset + limit;
    this.setState({ offset: newOffset });
  }

  onClickSpace = spaceId => {
    const { history } = this.props;
    history.push(Path.space(spaceId));
  };

  render() {
    const {
      // sections,
      regionId,
      // isChecking,
      user,
      spaces,
      spacesHistory,
      conditions,
      maxCount,
      isLoading,
      modalPrefName,
    } = this.props;

    // if (isChecking) {
    //   return <LoadingPage />;
    // }

    const conditionTitle = conditions ? makeConditionTitle(conditions) : '';

    // const sections = RecommendedSpace;

    let isViewModalTop = false;
    let requestParams;
    if (user && user.isHost !== undefined && !user.isHost) {
      if (isAvailableLocalStorage()) {
        if (
          localStorage.getItem('isRequestedTop') &&
          localStorage.getItem('isRequestedTop') === 'true'
        ) {
          // 希望条件送付済
        } else if (localStorage.getItem('request_params')) {
          requestParams = localStorage.getItem('request_params');
        } else {
          isViewModalTop = true;
        }
      }
    }

    return (
      <Fragment>
        <Top
          // sections={sections}
          regionId={regionId}
          spaces={spaces}
          spacesHistory={spacesHistory}
          onClickSpace
          user={user}
          maxCount={maxCount}
          conditionTitle={conditionTitle}
          isViewModalTop={isViewModalTop}
          requestParams={requestParams}
          isLoading={isLoading}
          modalPrefName={modalPrefName}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  maxCount: state.space.search.maxCount,
  conditions: state.space.search.conditions,
  spaces: state.space.search.results,
  spacesHistory: state.space.spaces,
  // sections: state.section.sections,
  regionId: state.section.regionId,
  isChecking: state.auth.isChecking,
  user: state.auth.user,
  isLoading: state.request.isLoading,
  modalPrefName: state.request.prefName,
});

export default connect(mapStateToProps)(Home);
