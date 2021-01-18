import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import ImageAvatar from 'components/LV1/Images/ImageAvatar';

const LinkStyled = styled(Link)`
  display: block;
  width: 100%;
`;

export default ({ to, imageSrc, size }) =>
  to ? (
    <LinkStyled href={to}>
      <a>
        <ImageAvatar src={imageSrc} size={size || 40} />
      </a>
    </LinkStyled>
  ) : (
    <ImageAvatar src={imageSrc} size={size || 40} />
  );
