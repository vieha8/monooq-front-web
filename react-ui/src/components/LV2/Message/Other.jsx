import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Card from 'components/LV1/Card';
import ContainerClearfix from 'components/LV1/ContainerClearfix';
import ImageAvatar from 'components/LV1/Images/ImageAvatar';
import InlineText from 'components/LV1/Texts/InlineText';
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

export default ({ id, image, extension, message, receivedAt }) => (
  <ContainerClearfix>
    <div>
      <AvatarWrapper>
        <Link to={Path.profile(id)}>
          <ImageAvatar size={32} src={image} alt="" />
        </Link>
      </AvatarWrapper>
      <CardWrapper>
        {extension || (
          <Card block noBorder background={Colors.lightGray1Bg} padding={24} paddingSp={14}>
            <InlineText.Base fontSize={15}>{message}</InlineText.Base>
          </Card>
        )}
      </CardWrapper>
      <DateWrapper>
        <InlineText.EmphasisTiny>{receivedAt}</InlineText.EmphasisTiny>
      </DateWrapper>
    </div>
  </ContainerClearfix>
);
