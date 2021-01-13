import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getDateRelativeLastLogin } from 'helpers/date';
import ImageAvatar from 'components/LV1/Images/ImageAvatar';
import InlineText from 'components/LV1/Texts/InlineText';
import Path from 'config/path';
import { Dimens, FontSizes } from 'variables';
import { formatName } from 'helpers/string';
import StatusText from 'components/LV1/Texts/StatusText';
import Attribute from './Attribute';

const Content = styled.div``;

const ProfileWrap = styled.div`
  font-size: ${FontSizes.small}px;
`;

const headContent = (id, imageUrl, name) => {
  return (
    <Link to={Path.profile(id)}>
      <ImageAvatar size={45} src={imageUrl} alt={name} />
    </Link>
  );
};

const LastLoginWrap = styled.div`
  margin-top: ${Dimens.small}px;
`;

const contentHostName = (name, lastLoginAt) => {
  return (
    <Content>
      <InlineText.Base>{`${formatName(name)}さん`}</InlineText.Base>
      <br />
      <LastLoginWrap>
        <InlineText.Small>
          <StatusText setData={getDateRelativeLastLogin(lastLoginAt)} />
        </InlineText.Small>
      </LastLoginWrap>
    </Content>
  );
};

export default ({ infoHost, message, id, imageUrl, name, profile, lastLoginAt }) => (
  <Attribute
    infoHost={infoHost}
    message={message}
    headContent={headContent(id, imageUrl, name)}
    contentHostName={contentHostName(name, lastLoginAt)}
    contentProfile={<ProfileWrap>{profile}</ProfileWrap>}
  />
);
