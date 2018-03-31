// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import Path from 'config/path';
import Button from 'components/atomic/atoms/Button';
import InlineText from 'components/atomic/atoms/InlineText';
import TextLink from 'components/atomic/atoms/TextLink';
import RegsiterProfileImage from 'components/atomic/atoms/DragAndDrop/RegisterProfileImage';
import InputForm from 'components/atomic/molecules/InputForm';
import logoUri from 'images/monooq_logo_mark.svg';
import { Colors, FontSizes, } from 'variables';
import Form from './Form';

const Logo = styled.img`
  width: 60px;
  height: 60px;
`;

type PropTypes = {
  onDrop: Function,
}

export default (props: PropTypes) => (
  <Form
    title={<InlineText.Base fontSize={FontSizes.medium1}>あなたのプロフィールを登録</InlineText.Base>}
    image={
      <InputForm
        label="プロフィール写真"
        extension={
          <RegsiterProfileImage
            onDrop={props.onDrop}
          />
        }
      />
    }
  />
);
