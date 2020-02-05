import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Top from 'components/LV3/Top';
import { isAvailableLocalStorage } from 'helpers/storage';
import { sectionActions } from 'redux/modules/section';
import Intercom from 'react-intercom';

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
  }

  componentDidMount() {
    const { regionId } = this.props;
    this.setScrollRegion(regionId);
    window.scrollTo(0, 0);
  }

  componentDidUpdate(prevProps) {
    const { regionId } = this.props;
    if (regionId !== prevProps.regionId) {
      this.setScrollRegion(regionId);
      window.scrollTo(0, 0);
    }
  }

  setScrollRegion = regionId => {
    const id = `space_search_area_${regionId}`;
    if (document.getElementById(id)) {
      const target = document.getElementById(id);
      target.scrollIntoView({
        inline: 'center',
        behavior: 'smooth',
        block: 'end',
      });
    }
  };

  render() {
    const { user, intercomHash } = this.props;

    const isProd =
      document.domain === 'monooq.com' ||
      document.domain === 'monooq-front-web-staging.herokuapp.com';

    return (
      <Fragment>
        <Top sections={[]} />
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
  ui: state.ui,
  isLogin: state.auth.isLogin,
  regionId: state.section.regionId,
  user: state.auth.user,
  intercomHash: state.auth.intercom.hash,
});

export default connect(mapStateToProps)(TopPage);
