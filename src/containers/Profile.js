import React from 'react';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import Header from '../components/Header/';
import SpaceList from './Search/SpaceList';

const user = {
  name: 'sample host user',
  area: '東京',
  description:
    'サンプルの文章です。サンプルの文章のために書かれました。サンプルの文章です。サンプルの文章です。サンプルの文章のために書かれました。サンプルの文章です。',
};

const Profile = () => {
  return (
    <div
      style={{
        width: '90vw',
        margin: '0 auto',
      }}
    >
      <Header />

      <div
        style={{
          textAlign: 'center',
          width: '50vw',
          margin: '0 auto',
        }}
      >
        <Avatar
          src="https://picsum.photos/300?image=65"
          style={{ width: 150, height: 150, margin: 'auto' }}
        />
        <br />
        <Typography type="title" gutterBottom>
          {user.name}
        </Typography>
        <Typography type="subheading" gutterBottom>
          {user.area}
        </Typography>
        <Typography
          gutterBottom
          wrap
          style={{
            lineHeight: '1.5rem',
            padding: '5px 10px',
          }}
        >
          {user.description}
        </Typography>
      </div>

      <div
        style={{
          width: '50vw',
          margin: '0 auto',
        }}
      >
        <hr color="#eee" />
        <Typography type="headline" gutterBottom>
          {user.name}さんの場所
        </Typography>
        <SpaceList />
      </div>
    </div>
  );
};

export default Profile;
