// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AvatarImage from 'components/LV1/Images/AvatarImage';
import InlineText from 'components/LV1/Texts/InlineText';
import Path from 'config/path';
import { FontSizes } from 'variables';
import { formatName } from 'helpers/string';
import Attribute from './Attribute';

const Content = styled.div``;

const ProfileWrap = styled.div`
  font-size: ${FontSizes.small}px;
`;

type PropTypes = {
  hostinfo: string,
  message: string,
  id: string,
  imageUrl: string,
  name: string,
  profile: string,
};

const headContent = (id, imageUrl, name) => {
  return (
    <Link to={Path.profile(id)}>
      <AvatarImage size={45} src={imageUrl} alt={name} />
    </Link>
  );
};

const contentHostName = name => {
  return (
    <Content>
      <Fragment>
        <InlineText.Base fontSize={`${FontSizes.small_12}`} bold>
          ユーザー
        </InlineText.Base>
        <br />
        <InlineText.Base>{`${formatName(name)}さん`}</InlineText.Base>
      </Fragment>
    </Content>
  );
};

export default ({ hostinfo, message, id, imageUrl, name, profile }: PropTypes) => (
  <Attribute
    hostinfo={hostinfo}
    message={message}
    headContent={headContent(id, imageUrl, name)}
    contentHostName={contentHostName(name)}
    contentProfile={<ProfileWrap>{profile}</ProfileWrap>}
  />
);
