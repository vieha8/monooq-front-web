import React from 'react';
import styled from 'styled-components';
import { Colors, FontSizes, Dimens } from 'variables';
import { Form, TextArea } from 'semantic-ui-react';
import Button from 'components/Shared/Button';
import { ContentContainer } from 'components/Page';
import { media } from 'helpers/style/media-query';
import Evaluation from './Evaluation';

const Content = styled.div`
  ${media.phone`
    padding: 0 ${Dimens.medium}px;
  `}
`;

const Header = styled.div`
  font-size: ${FontSizes.large}px;
  line-height: 51px;
  letter-spacing: -0.5px;
  color: ${Colors.black};
`;

const Caption = styled.div`
  font-size: ${FontSizes.xsmall}px;
  color: ${Colors.lightGray1};
`;

const ImageWrapper = styled.div`
  text-align: center;
  margin-top: ${Dimens.medium2}px;
`;

const IMAGE_SIZE = 100;
const Image = styled.img`
  width: ${IMAGE_SIZE}px;
  height: ${IMAGE_SIZE}px;
  border-radius: ${IMAGE_SIZE / 2}px;
  object-fit: cover;
`;

const ResidenceText = styled.div`
  margin-top: ${Dimens.small}px;
  color: ${Colors.black};
  font-size: ${FontSizes.small}px;
  text-align: center;
`;

const EvaluationContainer = styled.div`
  margin-top: ${Dimens.large}px;
`;

const Evaluations = styled.div`
  display: table;
  margin-top: ${Dimens.medium}px;
  ${media.phone`
    width: 100%;
  `}
`;

const EvaluationWrapper = styled.div`
  display: table-cell;
  &:not(:first-child) {
    padding-left: ${Dimens.medium}px;
  }
  ${media.phone`
    display: block;
    &:not(:first-child) {
      padding-left: 0;
      margin-top: ${Dimens.medium}px;
    }
  `}
`;

const CommentContainer = styled.div`
  margin-top: ${Dimens.large}px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  margin-top: ${Dimens.medium2}px;
`;

const styles = {
  textarea: {
    width: '100%',
    marginTop: `${Dimens.medium}px`,
    color: Colors.darkGray1,
    fontSize: FontSizes.medium,
  },
};

export default props => (
  <ContentContainer>
    <Content>
      <Header>ホストは{props.hostName}さん</Header>
      <ImageWrapper>
        <Image src="http://placehold.jp/300x300.png" alt={props.hostName} />
      </ImageWrapper>
      <ResidenceText>{props.hostResidence} 在住</ResidenceText>
      <EvaluationContainer>
        <Header>取引はいかがでしたか？</Header>
        <Caption>とても良い・ふつう・悪いから選択してください</Caption>
        <Evaluations>
          <EvaluationWrapper>
            <Evaluation
              evaluate={0}
              selected={props.evaluate === 0}
              onClick={props.onClickEvaluate}
            />
          </EvaluationWrapper>
          <EvaluationWrapper>
            <Evaluation
              evaluate={1}
              selected={props.evaluate === 1}
              onClick={props.onClickEvaluate}
            />
          </EvaluationWrapper>
          <EvaluationWrapper>
            <Evaluation
              evaluate={2}
              selected={props.evaluate === 2}
              onClick={props.onClickEvaluate}
            />
          </EvaluationWrapper>
        </Evaluations>
      </EvaluationContainer>
      <CommentContainer>
        <Header>コメントする</Header>
        <Caption>お礼の気持ちを伝えましょう！</Caption>
        <Form>
          <TextArea
            style={styles.textarea}
            placeholder="どうもありがとうございました！"
            rows={5}
          />
        </Form>
      </CommentContainer>
      <ButtonWrapper>
        <Button
          fluid
          onClick={props.onClickPostReview}
        >
          レビューを投稿する
        </Button>
      </ButtonWrapper>
    </Content>
  </ContentContainer>
);
