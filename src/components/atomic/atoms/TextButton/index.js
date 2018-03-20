// @flow

import { media } from 'helpers/style/media-query';
import TextLink from '../TextLink';

const TextButton = TextLink.extend`
  ${media.phone`
      font-size: 12px;
  `};
`;

export default TextButton;
