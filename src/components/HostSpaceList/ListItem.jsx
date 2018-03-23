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
  margin-top: ${Dimens.medium2}px;
  margin-left: ${Dimens.medium2}px;
  float: left;
  ${media.phone`
    float: none;
    margin: ${Dimens.medium2}px auto 0;
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
        typeOK
        price={`${space.PriceQuarter}/${space.PriceHalf}/${space.PriceFull}`} history={props.history}
      />
      <Buttons {...props} />
    </Container>
  );
};
