// @flow

import React, { Component } from 'react';
import Profile from 'components/LV3/Profile';
import Header from 'components/containers/Header';
import ServiceMenu from 'components/containers/ServiceMenuContainer';
import MenuPageTemplate from 'components/templates/MenuPageTemplate';
import LoadingPage from 'components/LV3/LoadingPage';
import { userActions } from 'redux/modules/user';
import type { SpaceType } from 'types/Space';
import { formatDate, formatStringSlash } from 'helpers/date';
import { formatName } from 'helpers/string';
import Meta from 'components/LV1/Meta';
import connect from '../connect';

type PropTypes = {
  match: {
    params: {
      user_id: string,
    },
  },
  dispatch: Function,
  user: {
    imageUrl: string,
    name: string,
    prefCode: string,
    profile: string,
  },
  spaces: Array<SpaceType>,
};

class ProfileContainer extends Component<PropTypes> {
  constructor(props) {
    super(props);

    const { match, dispatch } = this.props;
    const userId = match.params.user_id;
    dispatch(userActions.fetchUser({ userId }));
    dispatch(userActions.fetchUserSpaces({ userId }));
  }

  leftContent = () => {
    const { user, spaces } = this.props;

    if (!user) {
      return <LoadingPage />;
    }

    return (
      <Profile
        meta={
          <Meta
            title={`${formatName(user.name)}さんのプロフィール - モノオク`}
            ogUrl={`user/${user.id}`}
            ogImageUrl={user.imageUrl}
            noindex
          />
        }
        image={user.imageUrl}
        name={user.name}
        prefCode={user.prefCode}
        profile={user.profile}
        lastLoginAt={formatDate(new Date(user.lastLoginAt), formatStringSlash)}
        spaces={(spaces || [])
          .filter(v => v.status === 'public')
          .map((space: SpaceType) => ({
            id: space.id,
            image: (space.images[0] || {}).imageUrl,
            address: `${space.addressPref}${space.addressCity}${space.addressTown}`,
            content: space.title,
            furniture: space.isFurniture,
            priceFull: space.priceFull,
            priceQuarter: space.priceQuarter,
          }))}
      />
    );
  };

  render() {
    return (
      <MenuPageTemplate
        header={<Header />}
        headline="プロフィール"
        leftContent={this.leftContent()}
        rightContent={<ServiceMenu />}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  spaces: state.user.spaces,
});

export default connect(
  ProfileContainer,
  mapStateToProps,
);
