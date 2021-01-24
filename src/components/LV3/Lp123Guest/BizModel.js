import React from 'react';
import styled from 'styled-components';
import { FontSizes, Colors, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import SectionTitle from './SectionTitle';

const ImageBizModel =
  'https://monooq.imgix.net/img%2Fservice%2Flp123guest%2Fbusinessmodel.png?alt=media&auto=format&auto=compress';

const Wrap = styled.div`
  position: relative;
  padding: ${Dimens.medium2}px 0;

  ${media.tablet`
    padding: ${Dimens.medium2}px ${Dimens.medium}px;
  `};
`;

const Figure = styled.figure`
  max-width: 900px;
  margin: auto;
  font-size: ${FontSizes.medium2_26}px;
`;

const FigureImage = styled.img`
  width: 100%;
`;

const Figcaption = styled.figcaption`
  margin-top: ${Dimens.medium_20}px;
  font-size: ${FontSizes.medium_18}px;
  line-height: 2em;
  text-align: left;
`;

// TODO: activeクラス付与時のみ、background-position
const Marker = styled.span`
  background-image: -webkit-linear-gradient(left, transparent 50%, rgb(255, 220, 139) 0%);
  background-image: -moz-linear-gradient(left, transparent 50%, rgb(255, 220, 139) 0%);
  background-image: -ms-linear-gradient(left, transparent 50%, rgb(255, 220, 139) 0%);
  background-image: -o-linear-gradient(left, transparent 50%, rgb(255, 220, 139) 0%);
  background-image: linear-gradient(left, transparent 50%, rgb(255, 220, 139) 0%);
  background-repeat: repeat-x;
  background-size: 200% 0.8em;
  background-position: 0 0.5em;
  transition: all 2s ease;
  background-position: -100% 0.5em;
`;

export default () => (
  <Wrap>
    <SectionTitle text="モノオクの仕組み" />
    <Figure>
      <FigureImage src={ImageBizModel} alt="img-businessmodel" />
      <Figcaption>
        <Marker>モノオクは「荷物を預けたい人」と「荷物を保管したい人」を繋ぐサービス</Marker>
        です。
        <br />
        モノオクのWEBサイトにアクセスすると、たくさんの空きスペース見つけることができます。その中からあなたの条件に合ったスペースを選びましょう。
        <br />
        選んだスペースのホストにメッセージを送り交渉が成立すれば、すぐに荷物を預けることができます。
      </Figcaption>
    </Figure>
  </Wrap>
);
