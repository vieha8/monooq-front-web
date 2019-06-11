// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AvatarImage from 'components/LV1/AvatarImage';
import InlineText from 'components/LV1/InlineText';
import Path from 'config/path';
import { FontSizes } from 'variables';
import { formatName } from 'helpers/string';
import Attribute from './Attribute';

const Content = styled.div``;

const ProfileWrap = styled.div`
  font-size: ${FontSizes.small}px;
  line-height: 1.5;
`;

type PropTypes = {
  hostinfo: string,
  message: string,
  id: string,
  imageUrl: string,
  name: string,
  profile: string,
};

export default ({ hostinfo, message, id, imageUrl, name, profile }: PropTypes) => (
  <Attribute
    hostinfo={hostinfo}
    message={message}
    headContent={
      <Link to={Path.profile(id)}>
        <AvatarImage size={45} src={imageUrl} alt={name} />
      </Link>
    }
    contentHostName={
      <Content>
        <Fragment>
          <InlineText.Base fontSize={`${FontSizes.small_12}`} bold>
            ホスト
          </InlineText.Base>
          <br />
          <InlineText.Base>{`${formatName(name)}さん`}</InlineText.Base>
        </Fragment>
      </Content>
    }
    contentProfile={<ProfileWrap>{profile}</ProfileWrap>}
  />
);
