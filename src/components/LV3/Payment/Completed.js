import React from 'react';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Path from 'config/path';
import { Dimens, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';
import { iskeyDownEnter } from 'helpers/keydown';
import BaseTemplate from 'components/templates/BaseTemplate';
import Button from 'components/LV1/Forms/Button';
import { H1 } from 'components/LV1/Texts/Headline';

const HeadlineWrap = styled.div`
  margin: 0px auto ${Dimens.medium2}px;
  font-size: ${FontSizes.small_15}px;
  line-height: normal;
`;

const DescriptionWrap = styled.div`
  margin: 0px auto ${Dimens.medium2}px;
  font-size: ${FontSizes.small_15}px;
  line-height: normal;
`;

const ButtonWrap = styled.div`
  max-width: 240px;
  margin: auto;
  ${media.phone`
    display: block;
    width: 100%;
    max-width: 100%;
    position: relative;
    left: 0px;
    bottom: 0px;
    text-align: center;
    padding: 0 0px 15px;
  `};
`;

const PaymentCompleted = ({ headline, description }) => {
  const history = useHistory();
  const { message_room_id: roomId } = useParams();

  const backToMessage = () => {
    window.scrollTo(0, 0);
    history.push(Path.message(roomId));
  };

  const onKeyDownToMessage = e => {
    if (iskeyDownEnter(e)) {
      backToMessage();
    }
  };

  return (
    <BaseTemplate>
      <HeadlineWrap>
        <H1>{headline}</H1>
      </HeadlineWrap>
      <DescriptionWrap>{description}</DescriptionWrap>
      <ButtonWrap>
        <Button primary fontbold center onClick={backToMessage} onKeyDown={onKeyDownToMessage}>
          メッセージ画面に戻る
        </Button>
      </ButtonWrap>
    </BaseTemplate>
  );
};

export default PaymentCompleted;
