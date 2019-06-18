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
    ImageUrl: string,
    Name: string,
    PrefCode: string,
    Profile: string,
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
            title={`${formatName(user.Name)}さんのプロフィール - モノオク`}
            ogUrl={`user/${user.ID}`}
            ogImageUrl={user.ImageUrl}
            noindex
          />
        }
        image={user.ImageUrl}
        name={user.Name}
        prefCode={user.PrefCode}
        profile={user.Profile}
        lastLogin={formatDate(new Date(user.LastLogin), formatStringSlash)}
        spaces={(spaces || [])
          .filter(v => v.Status === 'public')
          .map((space: SpaceType) => ({
            id: space.ID,
            image: (space.Images[0] || {}).ImageUrl,
            address: `${space.AddressPref}${space.AddressCity}${space.AddressTown}`,
            content: space.Title,
            furniture: space.IsFurniture,
            priceFull: space.PriceFull,
            priceQuarter: space.PriceQuarter,
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
