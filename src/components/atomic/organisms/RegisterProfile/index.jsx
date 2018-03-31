// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import Path from 'config/path';
import Button from 'components/atomic/atoms/Button';
import InlineText from 'components/atomic/atoms/InlineText';
import { H2 } from 'components/atomic/atoms/Headline';
import TextLink from 'components/atomic/atoms/TextLink';
import IconInputField from 'components/atomic/molecules/IconInputField';
import logoUri from 'images/monooq_logo_mark.svg';
import { Colors } from 'variables';
import Form from './Form';

const Logo = styled.img`
  width: 60px;
  height: 60px;
`;

type PropTypes = {
}

export default (props: PropTypes) => (
  <Form
    title={<H2>あなたのプロフィールを登録</H2>}
  />
);
