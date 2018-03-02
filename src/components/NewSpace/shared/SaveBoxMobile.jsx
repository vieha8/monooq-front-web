import React from 'react';
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';
import { Colors, FontSizes, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

const Container = styled.div`
  display: none;
  position: fixed;
  width: 100%;
  height: 70px;
  left: 0;
  bottom: 0;
  background: ${Colors.white};
  border-top: 1px solid ${Colors.borderGray};
  ${media.phone`
    display: block;
  `}
`;

const Text = styled.div`
  display: inline-block;
  width: 40%;
  text-align: center;
  vertical-align: middel;
`;

const SaveText = Text.extend`
  color: ${Colors.darkGray1};
  vertical-align: middle;
  ${media.phone`
    font-size: ${FontSizes.xsmall}px;
  `}
`;

const ButtonWrapper = styled.div`
  display: inline-block;
  width: 60%;
  padding: ${Dimens.medium}px ${Dimens.medium2}px;
  text-align: center;
  vertical-align: middle;
  ${media.phone`
    padding: ${Dimens.small}px ${Dimens.medium2}px;
  `}
`;


const styles = {
  button: {
    backgroundColor: Colors.white,
    border: `1px solid ${Colors.brandPrimary}`,
    color: Colors.brandPrimary,
    width: '100%',
    height: '50px',
    fontSize: FontSizes.medium,
  },
};

export default props => (
  <Container>
    <SaveText>下書き保存が可能です</SaveText>
    <ButtonWrapper>
      <Button style={styles.button}>保存する</Button>
    </ButtonWrapper>
  </Container>
);
