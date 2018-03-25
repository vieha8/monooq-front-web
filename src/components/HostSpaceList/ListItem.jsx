import React from 'react';
import styled from 'styled-components';
import { Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import Space from './Space';
import Buttons from './Buttons';

const Container = styled.div`
  width: 100%;
  max-width: 300px;
  &:after {
    clear: both;
    content: "";
    display: block;
  }
  margin-bottom: ${Dimens.medium}px;
  float: left;
  ${media.phone`
    float: none;
    margin: ${Dimens.medium}px auto 0;
  `}
`;

export default (props) => {
  const { space } = props;
  return (
    <Container>
      <Space
        place={space.AddressTown}
        id={space.ID}
        name={space.Title}
        typeOK={space.IsFurniture}
        imageUrl={space.Images[0].ImageUrl}
        price={`
          ${space.PriceFull}
          ${space.PriceQuarter > 0 ? `/ ${space.PriceQuarter}` : ''}
          ${space.PriceHalf > 0 ? `/ ${space.PriceHalf}` : ''}
        `}
        history={props.history}
      />
      <Buttons {...props} />
    </Container>
  );
};
