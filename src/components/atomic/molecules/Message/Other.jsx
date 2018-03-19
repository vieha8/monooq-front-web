// @flow

import React from 'react';
import styled from 'styled-components';
import ClearfixContainer from 'components/atomic/atoms/ClearfixContainer';
import AvatarImage from 'components/atomic/atoms/AvatarImage';
import Card from 'components/atomic/atoms/Card';
import InlineText from 'components/atomic/atoms/InlineText';

const AvatarWrapper = styled.div`
  float: left;
`;

const CardWrapper = styled.div`
  margin-left: 80px;
`;

const DateWrapper = styled.div`
  text-align: right;
  margin-top: 8px;
`;

type PropTypes = {
  imageSrc: string,
  imageAlt: string,
  message: string,
  receivedAt: string,
}

export default (props: PropTypes) => (
  <ClearfixContainer>
    <div>
      <AvatarWrapper>
        <AvatarImage
          size={64} src={props.imageSrc} alt={props.imageAlt}
        />
      </AvatarWrapper>
      <CardWrapper>
        <Card block>
          <InlineText.Base fontSize={14}>{props.message}</InlineText.Base>
        </Card>
      </CardWrapper>
    </div>
    <DateWrapper>
      <InlineText.Emphasis>{props.receivedAt}</InlineText.Emphasis>
    </DateWrapper>
  </ClearfixContainer>
);
