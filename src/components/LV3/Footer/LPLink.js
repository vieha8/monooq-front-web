import React from 'react';
import ButtonCaption from 'components/LV2/Forms/ButtonCaption';
import Path from 'config/path';
import styled from 'styled-components';
import { Colors, Dimens, ZIndexes } from 'variables';

const Wrap = styled.div`
  width: 100%;
  position: fixed;
  left: 0px;
  bottom: 0px;
  z-index: ${ZIndexes.frontPartsOverFooter};
  text-align: center;
  padding: ${Dimens.medium}px;
  background-color: rgba(255, 255, 255, 0.8);
  box-sizing: border-box;
  border-top: 1px solid ${Colors.borderGray};
`;

const LPLink = ({ isPageLp123Guest, isPageLp12GuestLinkTop }) => {
  return (
    <Wrap>
      <ButtonCaption
        caption={isPageLp123Guest ? '60秒で簡単登録' : '1分で完了'}
        text={isPageLp123Guest ? '保管スペースを探す' : 'アカウントを作成する'}
        link
        href={isPageLp12GuestLinkTop ? Path.top() : Path.signUp()}
      />
    </Wrap>
  );
};

export default LPLink;
