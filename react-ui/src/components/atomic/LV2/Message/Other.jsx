// @flow

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ClearfixContainer from 'components/atomic/LV1/ClearfixContainer';
import AvatarImage from 'components/atomic/LV1/AvatarImage';
import Card from 'components/atomic/LV1/Card';
import InlineText from 'components/atomic/LV1/InlineText';
import Path from 'config/path';
import { Colors } from 'variables';

const AvatarWrapper = styled.div`
  float: left;
`;

const CardWrapper = styled.div`
  margin-left: 47px;
`;

const DateWrapper = styled.div`
  text-align: right;
  margin-top: 8px;
`;

type PropTypes = {
  id: number,
  image: string,
  message: string,
  receivedAt: string,
  extension: React.Element<*>,
};

export default (props: PropTypes) => (
  <ClearfixContainer>
    <div>
      <AvatarWrapper>
        <Link to={Path.profile(props.id)}>
          <AvatarImage size={32} src={props.image} alt="" />
        </Link>
      </AvatarWrapper>
      <CardWrapper>
        {props.extension ? (
          props.extension
        ) : (
          <Card block noBorder background={Colors.lightGray1Bg} isPadding={15}>
            <InlineText.Base fontSize={14}>{props.message}</InlineText.Base>
          </Card>
        )}
      </CardWrapper>
    </div>
  </ClearfixContainer>
);
