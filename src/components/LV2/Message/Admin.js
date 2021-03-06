import React from 'react';
import Linkify from 'react-linkify';
import Link from 'next/link';
import styled from 'styled-components';
import Card from 'components/LV1/Card';
import InlineText from 'components/LV1/Texts/InlineText';
import { Colors } from 'variables';

const DateWrapper = styled.div`
  text-align: right;
  margin-top: 8px;
`;

export default ({ message, link, receivedAt }) => (
  <div>
    <Card block borderColor={Colors.brandPrimary} padding={24} paddingSp={14}>
      <InlineText.Base fontSize={15}>
        <Linkify properties={{ target: '_blank' }}>{message}</Linkify>
      </InlineText.Base>
      <InlineText.Base fontSize={15}>
        <Link href={link.url || ''}>
          <a>{link.text || ''}</a>
        </Link>
      </InlineText.Base>
    </Card>
    <DateWrapper>
      <InlineText.EmphasisTiny>{receivedAt || ' '}</InlineText.EmphasisTiny>
    </DateWrapper>
  </div>
);
