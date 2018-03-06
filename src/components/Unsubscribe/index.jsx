import React from 'react';
import styled from 'styled-components';
import { Checkbox, Form, TextArea } from 'semantic-ui-react';
import Button from 'components/Shared/Button';
import { ContentContainer } from 'components/Page';
import { Colors, FontSizes, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

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
  display: block;
  font-size: ${FontSizes.xsmall}px;
  text-align: left;
  color: ${Colors.lightGray1};
  margin-top: ${Dimens.medium}px;
`;

const CheckWrapper = styled.div`
  display: block;
  margin-top: ${Dimens.medium}px;
`;

const Row = styled.div`
  margin-top: ${Dimens.medium2}px;
`;

export default props => (
  <ContentContainer>
    <Content>
      <Header>退会の理由</Header>
      <Caption>複数の回答が可能です。モノオクはこれからもサービス改善に努めます。</Caption>
      <Row>
        <CheckWrapper>
          <Checkbox label="サービス内容がわからなかった" />
        </CheckWrapper>
        <CheckWrapper>
          <Checkbox label="サービスが不便" />
        </CheckWrapper>
        <CheckWrapper>
          <Checkbox label="荷物を預けることがなかった" />
        </CheckWrapper>
        <CheckWrapper>
          <Checkbox label="荷物のリクエストが来ないから" />
        </CheckWrapper>
        <CheckWrapper>
          <Checkbox label="取引相手の対応が悪かった" />
        </CheckWrapper>
        <CheckWrapper>
          <Checkbox label="その他" />
        </CheckWrapper>
      </Row>
      <Caption>「その他」を選択した場合はその理由をお聞かせください。</Caption>
      <Row>
        <Form>
          <TextArea rows={5} placeholder="今後のサービス改善に参考とさせていただきます。ご自由に記述ください。" />
        </Form>
      </Row>
      <Row>
        <Button fluid onClick={props.onClickUnsubscribe}>退会する</Button>
      </Row>
    </Content>
  </ContentContainer>
);
