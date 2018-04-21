// @flow

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AvatarImage from 'components/atomic/atoms/AvatarImage';
import InlineText from 'components/atomic/atoms/InlineText';
import Path from 'config/path';
import { media, isMobileWindow } from 'helpers/style/media-query';
import Attribute from './Attribute';

const Center = styled.div`
  text-align: center;
`;

const Content = styled.div`
  ${media.phone`
    text-align: center;
  `};
`;

type PropTypes = {
  id: string,
  name: string,
  imageUrl: string,
  profile: string,
};

export default (props: PropTypes) => (
  <Attribute
    headContent={
      <Center>
        <Link to={Path.profile(props.id)}>
          <AvatarImage size={64} src={props.imageUrl} alt={props.name} />
        </Link>
      </Center>
    }
    content={
      <Content>
        <div>
          <InlineText.Bold>
            ホストは {isMobileWindow() && <br />}
            {props.name} さん
          </InlineText.Bold>
        </div>
        <div>
          <InlineText.Base>{props.profile}</InlineText.Base>
        </div>
      </Content>
    }
  />
);
