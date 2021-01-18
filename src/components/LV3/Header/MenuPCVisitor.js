import React, { Fragment } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import TextLink from '../../LV1/Texts/TextLink';
import Path from '../../../config/path';
import Button from '../../LV1/Forms/Button';
import { Colors } from '../../../variables';
import { media } from '../../../helpers/style/media-query';

const TextWrapper = styled.span`
  width: 106px;
  ${media.tablet`
    max-width: 106px;
  `};
  ${media.phone`
    min-width: 128px;
  `};
  text-align: center;
  display: table-cell;
  vertical-align: middle;
  &:not(:first-child) {
    margin-left: 8px;
  }
`;

const MenuPCVisitor = () => {
  const router = useRouter();
  return (
    <Fragment>
      <TextWrapper>
        <TextLink to={Path.login()} color={Colors.brandPrimary} bold="true">
          ログイン
        </TextLink>
      </TextWrapper>
      <TextWrapper>
        <Button
          quaternary
          link
          onClick={() => router.push(Path.signUp())}
          fontbold
          height={40}
          lineheight={15}
          color={Colors.brandPrimary}
        >
          新規登録
        </Button>
      </TextWrapper>
    </Fragment>
  );
};

export default MenuPCVisitor;
