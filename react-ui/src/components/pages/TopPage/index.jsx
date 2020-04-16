import React, { Fragment } from 'react';
import Intercom from 'react-intercom';
import { connect } from 'react-redux';
import { isAvailableLocalStorage } from 'helpers/storage';
import { sectionActions } from 'redux/modules/section';
import Top from 'components/LV3/Top';
import LoadingPage from 'components/LV3/LoadingPage';
import { spaceActions } from 'redux/modules/space';
import Path from 'config/path';

// import RecommendedSpace from './StaticRecommendedSpace';

// TODO: アクセス増が想定される場合、おすすめ一覧が固定のものになるよう事前に修正しておく。
class TopPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 12,
      offset: 0,
      sort: 1,
      keyword: '',
      pref: '13', // 仮
      cities: [],
      towns: [],
      tags: [],
      // isInit: false,
    };
    const { referrer } = document;
    if (isAvailableLocalStorage()) {
      if (!localStorage.getItem('referrer')) {
        localStorage.setItem('referrer', referrer);
      }
    }

    const { dispatch } = this.props;
    dispatch(sectionActions.getRegion());
    dispatch(sectionActions.fetchSections());
    const { limit, offset, keyword, pref, cities, towns, sort, tags } = this.state;

    const params = {
      limit,
      offset,
      keyword,
      prefCode: pref,
      sort,
      cities: [],
      towns: [],
      tags: [],
    };
    if (cities.length > 0) {
      params.cities = cities;
    }

    if (towns.length > 0) {
      params.towns = towns;
    }

    if (tags.length > 0) {
      params.tags = tags;
    }
    dispatch(spaceActions.doSearch(params));
  }

  onClickSpace = spaceId => {
    const { history } = this.props;
    history.push(Path.space(spaceId));
  };

  render() {
    const { sections, regionId, isChecking, user, intercomHash, spaces } = this.props;

    if (isChecking) {
      return <LoadingPage />;
    }

    console.log('spaces', spaces);

    const isProd =
      document.domain === 'monooq.com' ||
      document.domain === 'monooq-front-web-staging.herokuapp.com';

    // const sections = RecommendedSpace;

    return (
      <Fragment>
        <Top sections={sections} regionId={regionId} spaces={spaces} onClickSpace />
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
  spaces: state.space.search.results,
  sections: state.section.sections,
  regionId: state.section.regionId,
  isChecking: state.auth.isChecking,
  user: state.auth.user,
  intercomHash: state.auth.intercom.hash,
});

export default connect(mapStateToProps)(TopPage);
