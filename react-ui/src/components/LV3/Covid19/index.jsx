import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Dimens } from 'variables';
import Button from 'components/LV1/Forms/Button';
import PageDefault from 'components/LV1/PageDefault';
import ArtContainer from 'components/LV2/Texts/ArtStatic';
import MainTitleWrap from 'components/LV2/Texts/MainTitleStatic';

const ButtonWrap = styled.div`
  max-width: 320px;
  margin: ${Dimens.medium_20}px auto 0;
`;

const getTextHead = () => {
  return (
    <Fragment>
      平素よりモノオクをご利用いただきまして誠にありがとうございます。2020年5月21日(木)をもちまして、新型コロナウイルス感染症(COVID-19)の流行に伴う緊急事態宣言が一部地域を除き、解除されました。
      <br />
      しかし、感染リスクがゼロになったといえず、まだまだ油断ならぬ状況であると認識しております。今回は改めて緊急事態宣言解除後のサービス運営方針をご案内いたします。ゲスト・ホストの皆さまの安全のため、十分注意の上ご利用いただけると幸いです。
    </Fragment>
  );
};

export default () => (
  <PageDefault>
    <MainTitleWrap
      mainTitle="緊急事態宣言中および解除後のサービス運営方針について"
      text={getTextHead()}
      isHr
    />
    <ArtContainer
      title="1. サービス運営方針について"
      paraList={[
        <div>
          国や都道府県からのサービス提供停止の要請がない限り、モノオクのサービスは通常時と同様に運営いたします。ホスト・ゲスト間にて各地域の状況を見て判断して頂き、契約延長並びに搬入・搬出のご判断をしていただければと存じます。
        </div>,
        <div>
          新規契約を行われる場合は、感染予防や感染拡大防止に十分なご配慮をいただいた上で、ご依頼いただけますよう、お願い申し上げます。
        </div>,
      ]}
    />
    <ArtContainer
      title="2. 緊急事態宣言解除後の対応について"
      paraList={[
        <div>
          緊急事態宣言が解除された後であっても、サービスをご利用される場合は、ホスト・ゲストで話し合いのもと、感染リスクに十分注意していただければと存じます。
        </div>,
        <div>
          また、利用期間終了となるご契約につきましては、搬入出での接触等も鑑み、契約期間の延長を推奨いたします。ホスト・ゲスト間にてお話し合いの上、対応をご相談いただければと思います。
        </div>,
      ]}
    />
    <ArtContainer
      title="3. 感染予防対策について"
      paraList={[
        <div>
          モノオクをご利用いただく皆様が安心・安全にご利用していただくため、感染予防について引き続き以下のご協力をお願いいたします。
        </div>,
        <div>
          ・発熱・咳の有無に限らず、体調の悪い方はご利用をお控えください
          <br />
          ・お荷物の搬入・搬出前後には必ずお手洗いをしてください
          <br />
          ・搬入・搬出時は必ずマスクを着用してください
          <br />
          ・「三密」を避け、感染予防に努めてください
          <br />
          ・ドアノブ、電灯スイッチ、テーブルなど、手の触れる場所の除菌・消毒を行ってください
          <br />
          ・搬入・搬出時、その前後では、必ず窓を開けて換気を行ってください
          <br />
          ・下記に当てはまる方は、安全が確認されるまでご利用をお控えください
          <br />
          └37.5度以上の発熱がある場合
          <br />
          └海外から帰国後14日経過していない、または新型コロナウイルスのクラスターが確認された場所へ14日間以内に出入りした場合
          <br />
          └ご依頼者様ご本人もしくはご同居の方が、新型コロナウイルスに感染した場合
          <br />
          └新型コロナウイルスの診断を受けた人と濃厚接触をした場合
          <br />
          └新型コロナウイルスの感染が疑われる症状がある場合
          <br />
        </div>,
      ]}
    />
    <ArtContainer
      title="4. サポート体制について"
      paraList={[
        <div>
          緊急事態宣言は解除されましたが、引き続き以下のモノオクの対応を停止させていただきます。弊社社員の感染リスク等を加味した上での決定としております。何卒ご了承いただけますと幸いでございます。
        </div>,
        <div>
          ・契約期間外のお荷物の搬出代行
          <br />
          ・スペース写真の撮影代行
          <br />
          ・その他、弊社社員が直接出向いて作業する必要がある代行
          <br />
        </div>,
        <div>
          上記の対応再開目処につきましては、追加の情報並びに今後の状況等を鑑み、追ってご連絡させていただきます。不測の事態によりご迷惑をおかけしますが、引き続きゲスト・ホスト両者にできる限り負担がかからない対応を検討してまいります。
        </div>,
        <div>その他、ご不安な点がございましたら、公式LINEにてご相談ください。</div>,
        <ButtonWrap>
          <Button line reactGACategory="Inquiry" reactGAAction="Push LINE Register Button">
            友だち追加
          </Button>
        </ButtonWrap>,
      ]}
    />
  </PageDefault>
);
