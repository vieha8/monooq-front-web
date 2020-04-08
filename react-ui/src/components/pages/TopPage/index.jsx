import React, { Fragment } from 'react';
import Intercom from 'react-intercom';
import { connect } from 'react-redux';
import { isAvailableLocalStorage } from 'helpers/storage';
import { sectionActions } from 'redux/modules/section';
import Top from 'components/LV3/Top';
import LoadingPage from 'components/LV3/LoadingPage';

// TODO: 一時的におすすめスペースを非表示としている。
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
    // dispatch(sectionActions.fetchSections());
  }

  render() {
    // const { sections, regionId, isChecking, user, intercomHash } = this.props;
    const { regionId, isChecking, user, intercomHash } = this.props;

    if (isChecking) {
      return <LoadingPage />;
    }

    const isProd =
      document.domain === 'monooq.com' ||
      document.domain === 'monooq-front-web-staging.herokuapp.com';

    return (
      <Fragment>
        <Top sections={[]} regionId={regionId} />
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
  // sections: state.section.sections,
  regionId: state.section.regionId,
  isChecking: state.auth.isChecking,
  user: state.auth.user,
  intercomHash: state.auth.intercom.hash,
});

export default connect(mapStateToProps)(TopPage);
