// @flow

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ClearfixContainer from 'components/LV1/ClearfixContainer';
import AvatarImage from 'components/LV1/AvatarImage';
import Card from 'components/LV1/Card';
import InlineText from 'components/LV1/InlineText';
import Path from 'config/path';
import { Dimens, Colors } from 'variables';

const AvatarWrapper = styled.div`
  float: left;
`;

const CardWrapper = styled.div`
  margin-left: 47px;
`;

const DateWrapper = styled.div`
  text-align: right;
  margin-top: ${Dimens.small}px;
`;

type PropTypes = {
  id: number,
  image: string,
  extension: React.Element<*>,
  message: string,
  receivedAt: string,
};

export default ({ id, image, extension, message, receivedAt }: PropTypes) => (
  <ClearfixContainer>
    <div>
      <AvatarWrapper>
        <Link to={Path.profile(id)}>
          <AvatarImage size={32} src={image} alt="" />
        </Link>
      </AvatarWrapper>
      <CardWrapper>
        {extension || (
          <Card block noBorder background={Colors.lightGray1Bg} isPadding={14}>
            <InlineText.Base fontSize={15}>{message}</InlineText.Base>
          </Card>
        )}
      </CardWrapper>
      <DateWrapper>
        <InlineText.EmphasisTiny>{receivedAt}</InlineText.EmphasisTiny>
      </DateWrapper>
    </div>
  </ClearfixContainer>
);
