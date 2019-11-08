import React from 'react';
import styled from 'styled-components';
import { Dimens, Colors } from 'variables';
import { media } from 'helpers/style/media-query';
import Button from 'components/LV1/Forms/Button';
import SearchConditionMoreSP from 'components/LV3/SearchConditionMoreSP';

const Wrap = styled.div`
  width: 100%;
  position: fixed;
  left: 0px;
  bottom: 0px;
  z-index: 1100;
  text-align: center;
  padding: ${Dimens.medium}px;
  background-color: rgba(255, 255, 255, 0.8);
  border-top: 1px solid ${Colors.borderGray};
`;

const ButtonWrap = styled.div`
  display: inline-block;
  min-width: 300px;
  ${media.phone`
    display: block;
    min-width: auto;
  `};
`;

export default ({
  text,
  modal,
  searchConditionCurrentList,
  onClick,
  cityTownAreaList,
  onClickMore,
  onClickCheckCity,
  onClickCheckTown,
  prefectureList,
  disabled,
}) => (
  <Wrap>
    <ButtonWrap>
      {modal ? (
        <SearchConditionMoreSP
          btnText={text}
          searchConditionCurrentList={searchConditionCurrentList}
          cityTownAreaList={cityTownAreaList}
          prefectureList={prefectureList}
          onClickMore={onClickMore}
          onClickCheckCity={onClickCheckCity}
          onClickCheckTown={onClickCheckTown}
        />
      ) : (
        <Button center primary fontbold fill={1} onClick={onClick} disabled={disabled}>
          {text}
        </Button>
      )}
    </ButtonWrap>
  </Wrap>
);
