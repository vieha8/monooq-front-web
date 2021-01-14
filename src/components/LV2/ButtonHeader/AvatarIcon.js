import React from 'react';
import styled from 'styled-components';
import { Link } from 'next/link';
import ImageAvatar from 'components/LV1/Images/ImageAvatar';

const LinkStyled = styled(Link)`
  display: block;
  width: 100%;
`;

export default ({ to, imageSrc, size }) =>
  to ? (
    <LinkStyled to={to}>
      <ImageAvatar src={imageSrc} size={size || 40} />
    </LinkStyled>
  ) : (
    <ImageAvatar src={imageSrc} size={size || 40} />
  );
