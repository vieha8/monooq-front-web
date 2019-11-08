import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ImageAvatar from 'components/LV1/Images/ImageAvatar';
import InlineText from 'components/LV1/Texts/InlineText';
import Path from 'config/path';
import { FontSizes } from 'variables';
import { formatName } from 'helpers/string';
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

export default ({ infoHost, message, id, imageUrl, name, profile }) => (
  <Attribute
    infoHost={infoHost}
    message={message}
    headContent={headContent(id, imageUrl, name)}
    contentHostName={contentHostName(name)}
    contentProfile={<ProfileWrap>{profile}</ProfileWrap>}
  />
);
