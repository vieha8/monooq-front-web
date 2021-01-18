import React from 'react';
import Linkify from 'react-linkify';
import styled from 'styled-components';
import Link from 'next/link';
import Card from 'components/LV1/Card';
import PageClearfix from 'components/LV1/PageClearfix';
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
  <PageClearfix>
    <div>
      <AvatarWrapper>
        <Link href={Path.profile(id)}>
          <a>
            <ImageAvatar size={32} src={image} alt="" />
          </a>
        </Link>
      </AvatarWrapper>
      <CardWrapper>
        {extension || (
          <Card block noBorder background={Colors.lightGray1Bg} padding={24} paddingSp={14}>
            <InlineText.Base fontSize={15}>
              <Linkify properties={{ target: '_blank' }}>{message}</Linkify>
            </InlineText.Base>
          </Card>
        )}
      </CardWrapper>
      <DateWrapper>
        <InlineText.EmphasisTiny>{receivedAt}</InlineText.EmphasisTiny>
      </DateWrapper>
    </div>
  </PageClearfix>
);
