// @flow

import React, { Component } from 'react';
import Profile from 'components/LV3/Profile';
import Header from 'components/containers/Header';
import ServiceMenu from 'components/containers/ServiceMenuContainer';
import MenuPageTemplate from 'components/templates/MenuPageTemplate';
import LoadingPage from 'components/LV3/LoadingPage';
import { userActions } from 'redux/modules/user';
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
  spaces: Array<{
    id: number,
    user: {
      id: number,
      firebaseUid: string,
      imageUrl: string,
      name: string,
      profile: string,
    },
    addressPref: string,
    addressCity: string,
    addressTown: string,
    title: string,
    images: Array<{
      imageUrl: string,
    }>,
    introduction: string,
    type: number,
    isFurniture: boolean,
    about: string,
    receiptAbout: string,
    priceFull: number,
    priceHalf: number,
    priceQuarter: number,
    location: {
      lat: number,
      lng: number,
    },
    status: string,
  }>,
};

class ProfileContainer extends Component<PropTypes> {
  constructor(props) {
    super(props);

    const { match, dispatch } = this.props;
    const userId = match.params.user_id;
    dispatch(userActions.fetchUser({ userId }));
    dispatch(userActions.fetchUserSpaces({ userId }));
  }

  meta = user => {
    return (
      <Meta
        title={user && `${formatName(user.name)}さんのプロフィール - モノオク`}
        description={user && user.profile}
        ogUrl={user && `user/${user.id}`}
        ogImageUrl={user && user.imageUrl}
        noindex
      />
    );
  };

  leftContent = () => {
    const { user, spaces } = this.props;

    if (!user) {
      return <LoadingPage />;
    }

    return (
      <Profile
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
    const { user } = this.props;
    return (
      <MenuPageTemplate
        meta={this.meta(user)}
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
