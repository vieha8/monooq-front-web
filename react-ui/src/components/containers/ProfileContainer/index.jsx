// @flow

import React, { Component } from 'react';
import numeral from 'numeral';
import ProfileTemplate from 'components/templates/ProfileTemplate';
import Profile from 'components/LV3/Profile';
import Header from 'components/containers/Header';
import LoadingPage from 'components/LV3/LoadingPage';
import { Colors } from 'variables';
import { userActions } from 'redux/modules/user';
import type { SpaceType } from 'types/Space';
import { formatDate } from 'helpers/date';
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

  componentDidMount() {
    if (document && document.body) {
      this.prevBgColor = document.body.style.background;
      document.body.style.background = Colors.lightGray1Bg;
    }
  }

  componentWillUnmount() {
    document.body.style.background = this.prevBgColor;
  }

  parsePrices = (priceFull, priceHalf, priceQuarter) => {
    const res = [];
    res.push(`¥${numeral(priceFull).format('0,0')}`);
    if (priceHalf > 0) {
      res.push(`¥${numeral(priceHalf).format('0,0')}`);
    }
    if (priceQuarter > 0) {
      res.push(`¥${numeral(priceQuarter).format('0,0')}`);
    }
    return res;
  };

  render() {
    const { user, spaces } = this.props;

    if (!user) {
      return <LoadingPage />;
    }

    return (
      <ProfileTemplate
        header={<Header />}
        meta={
          <Meta
            title={`${formatName(user.name)}さんのプロフィール - モノオク`}
            ogUrl={`user/${user.id}`}
            ogImageUrl={user.imageUrl}
            noindex
          />
        }
        profile={
          <Profile
            image={user.imageUrl}
            name={user.name}
            prefCode={user.prefCode}
            profile={user.profile}
            lastLoginAt={formatDate(new Date(user.lastLoginAt), 'yyyy/MM/dd')}
            spaces={(spaces || [])
              .filter(v => v.status === 'public')
              .map((space: SpaceType) => ({
                id: space.id,
                image: (space.images[0] || {}).imageUrl,
                address: `${space.addressPref}${space.addressCity}${space.addressTown}`,
                content: space.title,
                furniture: space.isFurniture,
                prices: this.parsePrices(space.priceFull, space.priceHalf, space.priceQuarter),
              }))}
          />
        }
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
