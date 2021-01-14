import React from 'react';
import styled from 'styled-components';
import { Dimens, FontSizes, Colors } from 'variables';
import TextButton from 'components/LV1/Texts/TextButton';

const Wrap = styled.div`
  width: 100%;
  margin: ${Dimens.medium2}px auto 0;
  text-align: center;
`;

const StyledTextButton = styled(TextButton)`
  font-size: ${FontSizes.small}px;
  font-weight: bold;
  color: ${Colors.lightGray10};
  text-decoration: none;
`;

export default ({ handleModalClose }) => (
  <Wrap>
    <StyledTextButton onClick={handleModalClose}>キャンセルする</StyledTextButton>
  </Wrap>
);
