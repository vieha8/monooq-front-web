import React from 'react';
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';
import { Colors, FontSizes, Dimens } from '../../../variables';
import { media } from '../../../helpers/style/media-query';

const Container = styled.div`
  display: none;
  position: fixed;
  width: 100%;
  height: 80px;
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
  width: 50%;
  text-align: center;
  vertical-align: middel;
`;

const ButtonWrapper = styled.div`
  display: inline-block;
  width: 50%;
  padding: ${Dimens.medium}px ${Dimens.medium2}px;
  text-align: right;
  vertical-align: middel;
`;

const styles = {
  button: {
    backgroundColor: Colors.white,
    border: `1px solid ${Colors.pink}`,
    color: Colors.pink,
    width: '100%',
    height: '50px',
    fontSize: FontSizes.medium,
  },
};

export default props => (
  <Container>
    <Text active>下書き保存が可能です</Text>
    <ButtonWrapper>
      <Button style={styles.button}>保存する</Button>
    </ButtonWrapper>
  </Container>
);
