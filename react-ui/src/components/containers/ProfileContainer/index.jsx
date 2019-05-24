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
    window.scrollTo(0, 0);

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
            title={`${user.Name}さんのプロフィール - モノオク`}
            ogUrl={`user/${user.ID}`}
            ogImageUrl={user.ImageUrl}
            noindex
          />
        }
        profile={
          <Profile
            image={user.ImageUrl}
            name={user.Name}
            prefCode={user.PrefCode}
            profile={user.Profile}
            lastLogin={formatDate(new Date(user.LastLogin), 'yyyy/MM/dd')}
            spaces={(spaces || [])
              .filter(v => v.Status === 'public')
              .map((space: SpaceType) => ({
                id: space.ID,
                image: (space.Images[0] || {}).ImageUrl,
                address: `${space.AddressPref}${space.AddressCity}${space.AddressTown}`,
                content: space.Title,
                furniture: space.IsFurniture,
                prices: this.parsePrices(space.PriceFull, space.PriceHalf, space.PriceQuarter),
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
