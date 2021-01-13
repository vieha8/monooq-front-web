import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens, Colors, FontSizes } from 'variables';
import Button from 'components/LV1/Forms/Button';

const Wrapper = styled.div`
  width: 100%;
  max-width: 124px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Wrap = styled.div`
  width: 100%;
  margin-bottom: ${Dimens.medium_20}px;
  ${media.phone`
    width: 100%;
  `};
`;

const WrapButton = styled.div`
  margin-top: ${Dimens.xxsmall_4}px;
`;

const WrapRegion = styled.div`
  margin-bottom: ${Dimens.small2_14}px;
  font-size: ${FontSizes.small}px;
  text-align: center;
  color: ${Colors.lightGray3};
`;

export default ({ list }) => (
  <Wrapper>
    {list.map((item, i) => (
      <Wrap key={i.toString()}>
        <WrapRegion>{item.region}</WrapRegion>
        {item.prefectureList.map((prefecture, j) => (
          <WrapButton>
            <Button
              key={j.toString()}
              quinary
              fontSize={14}
              fontbold
              lineheight={21}
              height={38}
              padding="8px 10"
              borderRadius={6}
              fill={1}
              onClick={prefecture.link}
              // onKeyDown={onKeyDown}
            >
              {prefecture.name}
            </Button>
          </WrapButton>
        ))}
      </Wrap>
    ))}
  </Wrapper>
);
