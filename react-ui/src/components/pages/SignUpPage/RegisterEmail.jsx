import React, { Component, Fragment } from 'react';
import RegisterEmail from 'components/LV3/RegisterEmail';
import styled from 'styled-components';
import { Colors, Dimens, FontSizes, ZIndexes } from 'variables';
import { media } from 'helpers/style/media-query';

const ErrMessage = styled.div`
  width: 100%;
  height: 54px;
  display: block;
  position: fixed;
  left: 0px;
  top: 85px;
  z-index: ${ZIndexes.frontParts};
  text-align: center;
  padding: ${Dimens.medium_17}px;
  line-height: 22px;
  font-size: ${FontSizes.small_15}px;
  font-weight: bold;
  color: ${Colors.white};
  background-color: ${Colors.brandPrimary};
  ${media.tablet`
    top: 54px;
  `};
`;

export default class RegisterPage extends Component {
  render() {
    const { errorMessage, isRegistering } = this.props;
    return (
      <Fragment>
        {errorMessage && <ErrMessage>{errorMessage}</ErrMessage>}
        <RegisterEmail isRegisterChecking={isRegistering} gaLabel="Signup Page" />
      </Fragment>
    );
  }
}
