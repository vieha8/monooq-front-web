import React, { Fragment } from 'react';
import Intercom from 'react-intercom';
import { connect } from 'react-redux';
import { isAvailableLocalStorage } from 'helpers/storage';
import { sectionActions } from 'redux/modules/section';
import Top from 'components/LV3/Top';
import LoadingPage from 'components/LV3/LoadingPage';
import { spaceActions } from 'redux/modules/space';
import Path from 'config/path';
import { makeConditionTitle } from 'helpers/search';

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
    } = this.props;

    if (isChecking) {
      return <LoadingPage />;
    }

    const conditionTitle = conditions ? makeConditionTitle(conditions) : '';
    const isProd =
      document.domain === 'monooq.com' ||
      document.domain === 'monooq-front-web-staging.herokuapp.com';

    // const sections = RecommendedSpace;

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
});

export default connect(mapStateToProps)(TopPage);
