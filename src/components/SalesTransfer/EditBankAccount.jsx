import React from 'react';
import styled from 'styled-components';
import { Input, Select } from 'semantic-ui-react';
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
  ${props => props.margin && `
    margin-top: ${Dimens.large}px;
  `}
`;

const Caption = styled.div`
  display: block;
  font-size: ${FontSizes.xsmall}px;
  text-align: ${props => props.align || 'left'};
  color: ${Colors.lightGray1};
  margin-top: ${Dimens.medium}px;
`;

const Row = styled.div`
  margin-top: ${Dimens.medium2}px;
`;

const ButtonWrapper = styled.div`
  ${props => (props.noMargin ? `
    margin: 0 auto;
  ` : `
    margin: ${Dimens.medium2}px auto 0;
  `)}
  max-width: 300px;
`;

const Label = styled.span`
  display: block;
  font-size: ${FontSizes.small};
  color: ${Colors.black};
`;

const ConfirmContentText = Label.extend`
  font-size: ${FontSizes.xsmall};
  margin-top: ${Dimens.medium}px;
`;

const InputWrapper = styled.div`
  margin-top: ${Dimens.medium}px;
  width: 50%;
`;

const styles = {
  input: {
    width: '100%',
  },
  select: {
    width: '70%',
  },
};

function renderEdit(props) {
  return (
    <Content>
      <Header>{props.confirm ? '口座情報の確認' : '口座情報を入力する'}</Header>
      <Row>
        <Label>銀行名</Label>
        {props.confirm ? (
          <ConfirmContentText>{props.bankName}</ConfirmContentText>
        ) : (
          <InputWrapper>
            <Input placeholder="モノオク銀行" style={styles.input} />
          </InputWrapper>
        )}
      </Row>
      <Row>
        <Label>支店名</Label>
        {props.confirm ? (
          <ConfirmContentText>{props.branchName}</ConfirmContentText>
        ) : (
          <InputWrapper>
            <Input placeholder="モノオク支店" style={styles.input} />
          </InputWrapper>
        )}
      </Row>
      <Row>
        <Label>口座種別</Label>
        {props.confirm ? (
          <ConfirmContentText>{props.accountType}</ConfirmContentText>
        ) : (
          <InputWrapper>
            <Select
              style={styles.select}
              options={[
                {
                  key: 1,
                  value: 1,
                  text: '普通',
                },
                {
                  key: 2,
                  value: 2,
                  text: '当座',
                },
              ]}
              defaultValue={1}
            />
          </InputWrapper>
        )}
      </Row>
      <Row>
        <Label>口座番号</Label>
        {props.confirm ? (
          <ConfirmContentText>{props.accountNumber}</ConfirmContentText>
        ) : (
          <InputWrapper>
            <Input placeholder="1234567812345678" style={styles.input} />
          </InputWrapper>
        )}
      </Row>
      <Row>
        <Label>口座名義（セイ）</Label>
        {props.confirm ? (
          <ConfirmContentText>{props.accountLastName}</ConfirmContentText>
        ) : (
          <InputWrapper>
            <Input placeholder="ヤマダ" style={styles.input} />
          </InputWrapper>
        )}
      </Row>
      <Row>
        <Label>口座名義（メイ）</Label>
        {props.confirm ? (
          <ConfirmContentText>{props.accountFirstName}</ConfirmContentText>
        ) : (
          <InputWrapper>
            <Input placeholder="タロウ" style={styles.input} />
          </InputWrapper>
        )}
      </Row>
      <ButtonWrapper>
        <Button
          bgColor={Colors.white}
          fontColor={Colors.darkGray1}
          borderColor={Colors.darkGray1}
          fluid
          onClick={props.confirm ? props.onClickUpdateBankAccount : props.onClickConfirmButton}
        >
          {props.confirm ? '口座情報を更新する' : '変更内容を確認する'}
        </Button>
      </ButtonWrapper>
      {!props.confirm && <Caption align="center">口座情報に誤りがある場合、スムーズな入金ができませんのでご注意ください。</Caption>}
    </Content>
  );
}

function renderUpdated(props) {
  return (
    <Content>
      <ButtonWrapper noMargin>
        <Button
          bgColor={Colors.white}
          fontColor={Colors.darkGray1}
          borderColor={Colors.darkGray1}
          fluid
          onClick={props.onClickToRequestTransfer}
        >
          売上の振込申請へ進む
        </Button>
      </ButtonWrapper>
    </Content>
  );
}

export default props => (
  <ContentContainer>
    {props.updated ? renderUpdated(props) : renderEdit(props)}
  </ContentContainer>
);
