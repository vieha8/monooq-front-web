import React from 'react';
import styled from 'styled-components';
import Path from 'config/path';
import { media } from 'helpers/style/media-query';
import TextLink from 'components/LV1/Texts/TextLink';
import TextStatic from 'components/LV1/Texts/TextStatic';

const Wrap = styled.div`
  margin: 16px auto 0;
  padding: 10px;
  width: 90%;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
`;

const Title = styled.div`
  font-weight: bold;
`;

const Caption = styled.div`
  margin-top: 12px;
`;

const DetailLink = styled.div`
  margin-top: 8px;
`;

const Icon = styled.i`
  font-size: 16px;
  color: #e8be5d;
  margin-right: 8px;
  ${media.phone`
    vertical-align: bottom;
  `};
`;

const Covid19Info = () => {
  return (
    <Wrap>
      <Title>
        <TextStatic fontSizeSp={12} style={{ verticalAlign: 'middle' }}>
          <Icon className="far fa-check-circle" />
          緊急事態宣言解除後のサービス運営方針について
        </TextStatic>
      </Title>
      <Caption>
        <TextStatic fontSizeSp={12}>
          緊急事態宣言解除後にモノオクを利用するにあたっての運営方針は以下をご確認ください。
        </TextStatic>
      </Caption>
      <DetailLink>
        <TextLink to={Path.covid19()}>詳しく確認する</TextLink>
      </DetailLink>
    </Wrap>
  );
};

export default Covid19Info;
