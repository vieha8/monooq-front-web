import React from 'react';
import styled from 'styled-components';
import { Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import ImageFlow1 from 'images/lp123guest/flow-1.png';
import ImageFlow2 from 'images/lp123guest/flow-2.png';
import ImageFlow3 from 'images/lp123guest/flow-3.png';
import SectionTitle from './SectionTitle';

const Wrap = styled.div`
  max-width: 900px;
  margin: auto;
  padding: ${Dimens.medium2}px;
  ${media.tablet`
    padding: ${Dimens.medium2}px ${Dimens.medium}px;
  `};
`;

const Ul = styled.ul`
  display: flex;
  ${media.tablet`
    flex-wrap: wrap;
  `};
`;

const Li = styled.li`
  display: inline-block;
  width: 33.333333333%;
  border: solid 1px #eee;
  border-radius: 6px;
  line-height: 1.7em;
  text-align: left;
  &:nth-child(2) {
    margin: auto ${Dimens.small_10}px;
  }
  ${media.tablet`
    width: 100%;
    &:nth-child(2) {
      margin: ${Dimens.small_10}px auto;
    }
  `};
`;

const Item = styled.div`
  padding: ${Dimens.small_10}px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 50px;
  margin-bottom: 0;
  margin-right: 5px;
  float: left;
`;

const SubTitle = styled.b`
  font-weight: bold;
`;

const Caption = styled.span`
  display: block;
  margin-left: 55px;
  padding-bottom: 0;
`;

const getLi = (imageSrc, imageAlt, subTitle, caption) => {
  return (
    <Li>
      <Item>
        <Image src={imageSrc} alt={imageAlt} />
        <SubTitle>{subTitle}</SubTitle>
        <br />
        <Caption>{caption}</Caption>
      </Item>
    </Li>
  );
};

export default () => (
  <Wrap>
    <SectionTitle text="ご利用の流れ" />
    <Ul>
      {getLi(
        ImageFlow1,
        'img-flow1',
        'スペースを探す',
        'たくさんのスペースが登録されています。希望の立地や金額からスペースを探しましょう。',
      )}
      {getLi(
        ImageFlow2,
        'img-flow2',
        'ホストに相談',
        'スペースが見つかったら、ホストに荷物の内容と預ける期間をメッセージで相談しましょう。',
      )}
      {getLi(
        ImageFlow3,
        'img-flow3',
        '荷物を預ける',
        '金額と期間に合意できれば、お支払いを済ませて、スペースに荷物を預けることができます。',
      )}
    </Ul>
  </Wrap>
);
