import React from 'react';
import styled from 'styled-components';
import { Dropdown, Form, TextArea } from 'semantic-ui-react';
import Button from 'components/Shared/Button';
import { ContentContainer } from 'components/Page';
import { Colors, FontSizes, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

const Content = styled.div`
  ${media.phone`
    padding: 0 ${Dimens.medium}px;
  `};
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

const Row = styled.div`
  margin-top: ${Dimens.medium2}px;
`;

const reasons = [
  { value: 'サービスの使い方がわからない', text: 'サービスの使い方がわからない' },
  { value: '借りたいスペースが見つからない', text: '借りたいスペースが見つからない' },
  { value: 'リクエストが来ない', text: 'リクエストが来ない' },
  { value: '取引相手の対応が悪い', text: '取引相手の対応が悪い' },
  { value: 'その他', text: 'その他' },
];

export default props => (
  <ContentContainer>
    <Content>
      <Header>退会の理由</Header>
      <Caption>
        当てはまる理由をご選択ください。今後のサービス改善の参考とさせていただきます。
      </Caption>
      <Row>
        <Dropdown
          fluid
          selection
          multiple
          placeholder="選択してください"
          options={reasons}
          onChange={props.handleChangeReason}
          value={props.ui.reason || []}
        />
      </Row>
      <Row>
        <Form>
          <TextArea
            rows={5}
            placeholder="ご意見・ご要望など"
            onChange={props.handleChangeText}
            value={props.ui.description}
          />
        </Form>
      </Row>
      <Row>
        <Button fluid onClick={props.onClickUnsubscribe}>
          退会する
        </Button>
      </Row>
    </Content>
  </ContentContainer>
);
