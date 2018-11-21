// @flow

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AvatarImage from 'components/atomic/LV1/AvatarImage';
import InlineText from 'components/atomic/LV1/InlineText';
import Path from 'config/path';
import { FontSizes } from 'variables';
import Attribute from './Attribute';

const Content = styled.div``;

type PropTypes = {
  id: string,
  name: string,
  imageUrl: string,
  profile: string,
};

export default (props: PropTypes) => (
  <Attribute
    hostinfo={props.hostinfo}
    headContent={
      <Link to={Path.profile(props.id)}>
        <AvatarImage size={45} src={props.imageUrl} alt={props.name} />
      </Link>
    }
    contentHostName={
      <Content>
        <div>
          <InlineText.Base fontSize={`${FontSizes.small_12}`} bold>
            ホスト
          </InlineText.Base>
          <br />
          {props.name} さん
        </div>
      </Content>
    }
    contentProfile={<div>{props.profile}</div>}
  />
);
