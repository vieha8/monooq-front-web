import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontSizes, Colors } from 'variables';
import { media } from 'helpers/style/media-query';
import Path from 'config/path';
import Button from 'components/Shared/Button';
import Template from './Template';
import PaidError from './PaidError';
import Input from './Input';
import Expires from './Expires';
import SpaceInfo from './SpaceInfo';
import EstimateInfo from './EstimateInfo';

const H1 = styled.h1`
  font-size: ${FontSizes.xlarge}px;
  color: ${Colors.black};
  ${media.tablet`
    font-size: ${FontSizes.large}px;
  `}
`;

const H2 = styled.h2`
  font-size: ${FontSizes.large}px;
  color: ${Colors.black};
  ${media.tablet`
    font-size: ${FontSizes.medium2}px;
  `}
`;

const Caption = styled.span`
  font-size: ${FontSizes.xsmall}px;
  color: ${Colors.error};
  line-height: 1.5;
  a {
    color: ${Colors.linkBlue};
  }
`;

const LinkText = styled(Link)`
  display: block;
  font-size: ${FontSizes.medium}px;
  color: ${Colors.linkBlue};
`;

export default props => (
  <Template
    title={<H1>支払いを行う</H1>}
    paidError={props.paymentFailed ? <PaidError /> : null}
    subtitle={<H2>クレジットカード情報の入力</H2>}
    inputName={(
      <Input
        label="カード名義（半角ローマ字）"
        placeholder="TARO YAMADA"
        onChange={value => props.handleChangeName(value)}
        errors={props.nameErrors}
      />
    )}
    inputNumber={(
      <Input
        label="クレジットカード番号"
        type="number"
        placeholder="1234 5678 9101 1121"
        onChange={value => props.handleChangeNumber(value)}
        errors={props.numberErrors}
      />
    )}
    inputExpires={(
      <Expires
        month={props.month}
        year={props.year}
        onChangeMonth={props.handleChangeMonth}
        onChangeYear={props.handleChangeYear}
      />
    )}
    inputCvc={(
      <Input
        width={120}
        type="number"
        label="セキュリティコード"
        placeholder="3桁の数字"
        onChange={value => props.handleChangeCvc(value)}
        errors={props.cvcErrors}
      />
    )}
    mobileEstimate={(
      <div>
        <H2>お支払い内容の確認</H2>
        <EstimateInfo />
      </div>
    )}
    cancelDetail={(
      <Caption>
        ・決済後にキャンセルされた場合、預ける日の15日前までは全額ご返金させていただきます。<br />
        ・決済後、預かり開始予定日の15日前からキャンセル手数料が発生します。<br />
        ・「決済する」ボタンを押すことで、お客様は当サイトの<a href={Path.privacy()} target="_blank">プライバシーポリシー</a>と<a href={Path.terms()} target="_blank">利用規約</a>に同意の上、モノオクサービスの予約を確定したことになります。
      </Caption>
    )}
    aboutCancel={(
      <LinkText to={Path.cancellationPolicies()}>キャンセルについて</LinkText>
    )}
    sideContent={(
      <div>
        <SpaceInfo {...props.space} />
        <EstimateInfo {...props.estimate} />
      </div>
    )}
    button={(
      <Button
        disabled={props.buttonDisabled}
        onClick={props.onClickButton}
      >
        決済する
      </Button>
    )}
  />
);
