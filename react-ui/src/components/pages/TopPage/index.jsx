import React, { Fragment } from 'react';
import Intercom from 'react-intercom';
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
class TopPage extends React.Component {
  constructor(props) {
    super(props);

    const { referrer } = document;
    if (isAvailableLocalStorage()) {
      if (!localStorage.getItem('referrer')) {
        localStorage.setItem('referrer', referrer);
      }
    }

    const { dispatch } = this.props;

    dispatch(sectionActions.getRegion());
    dispatch(sectionActions.fetchSections());

    // 非ログイン状態ならAction内で検索をやめてくれるのでここで分岐はしない
    dispatch(spaceActions.doSearchMyArea());
  }

  onClickSpace = spaceId => {
    const { history } = this.props;
    history.push(Path.space(spaceId));
  };

  render() {
    const {
      sections,
      regionId,
      isChecking,
      user,
      intercomHash,
      spaces,
      conditions,
      maxCount,
      isLoading,
    } = this.props;

    if (isChecking) {
      return <LoadingPage />;
    }

    const conditionTitle = makeConditionTitle(conditions);

    const isProd =
      document.domain === 'monooq.com' ||
      document.domain === 'monooq-front-web-staging.herokuapp.com';

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
          sections={sections}
          regionId={regionId}
          spaces={spaces}
          onClickSpace
          user={user}
          maxCount={maxCount}
          conditionTitle={conditionTitle}
          isViewModalTop={isViewModalTop}
          requestParams={requestParams}
          isLoading={isLoading}
        />
        {isProd && (
          <Intercom
            appID="v0rdx0ap"
            user_id={user.id}
            email={user.email}
            name={user.name}
            user_hash={intercomHash}
          />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  maxCount: state.space.search.maxCount,
  conditions: state.space.search.conditions,
  spaces: state.space.search.results,
  sections: state.section.sections,
  regionId: state.section.regionId,
  isChecking: state.auth.isChecking,
  user: state.auth.user,
  intercomHash: state.auth.intercom.hash,
  isLoading: state.request.isLoading,
});

export default connect(mapStateToProps)(TopPage);
