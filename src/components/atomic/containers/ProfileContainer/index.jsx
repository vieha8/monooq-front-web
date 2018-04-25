// @flow

import React, { Component } from 'react';
import numeral from 'numeral';

import ProfileTemplate from 'components/atomic/templates/ProfileTemplate';
import Profile from 'components/atomic/LV3/Profile';
import Header from 'components/atomic/containers/Header';
import Footer from 'components/atomic/LV2/Footer';
import LoadingPage from 'components/atomic/LV3/LoadingPage';
import { Colors } from 'variables';

import { userActions } from 'redux/modules/user';

import type { SpaceType } from 'types/Space';

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

  render() {
    const { user, spaces } = this.props;

    if (!user) {
      return <LoadingPage />;
    }

    return (
      <ProfileTemplate
        header={<Header />}
        profile={
          <Profile
            image={user.ImageUrl}
            name={user.Name}
            prefCode={user.PrefCode}
            profile={user.profile}
            spaces={(spaces || []).map((space: SpaceType) => ({
              id: space.ID,
              image: (space.Images[0] || {}).ImageUrl,
              address: `${space.AddressPref}${space.AddressCity}${space.AddressCity}`,
              content: space.About,
              furniture: space.IsFurniture,
              prices: [
                numeral(space.PriceFull).format('0,0'),
                numeral(space.PriceHalf).format('0,0'),
                numeral(space.PriceQuarter).format('0,0'),
              ],
            }))}
          />
        }
        footer={<Footer />}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  spaces: state.user.spaces,
});

export default connect(ProfileContainer, mapStateToProps);
