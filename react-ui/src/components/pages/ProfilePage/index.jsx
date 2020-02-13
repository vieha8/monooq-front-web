import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from 'redux/modules/user';
import { formatName } from 'helpers/string';
import { formatDate, formatStringSlash } from 'helpers/date';
import BaseTemplate from 'components/templates/BaseTemplate';
import Meta from 'components/LV1/Meta';
import LoadingPage from 'components/LV3/LoadingPage';
import Profile from 'components/LV3/Profile';

class ProfilePage extends Component {
  constructor(props) {
    super(props);

    const { match, dispatch } = this.props;
    const userId = match.params.user_id;
    dispatch(userActions.fetchUser({ userId }));
    dispatch(userActions.fetchUserSpaces({ userId }));
  }

  render() {
    const { user, spaces } = this.props;

    if (!user) {
      return <LoadingPage />;
    }

    return (
      <BaseTemplate>
        <Meta
          title={user && `${formatName(user.name)}さんのプロフィール - モノオク`}
          description={user && user.profile}
          ogUrl={user && `user/${user.id}`}
          ogImageUrl={user && user.imageUrl}
          noindex
        />
        <Profile
          image={user.imageUrl}
          name={user.name}
          prefCode={user.prefCode}
          profile={user.profile}
          lastLoginAt={formatDate(new Date(user.lastLoginAt), formatStringSlash)}
          spaces={(spaces || [])
            .filter(v => v.status !== 'draft')
            .map(space => ({
              id: space.id,
              image: (space.images[0] || {}).imageUrl,
              address: `${space.addressPref}${space.addressCity}${space.addressTown}`,
              title: space.title,
              priceFull: space.priceFull,
              priceTatami: space.priceTatami,
              sizeType: space.sizeType,
            }))}
        />
      </BaseTemplate>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  spaces: state.user.spaces,
});

export default connect(mapStateToProps)(ProfilePage);
