// @flow

import React from 'react';
import styled from 'styled-components';
import HostEntryStep from 'components/atomic/molecules/HostEntryStep';
import Hint from 'components/atomic/molecules/Hint';
import { Dimens } from 'variables';

const HintWrapper = styled.div`
  margin-top: ${Dimens.huge}px;
`;

type PropTypes = {
  edit?: boolean,
  step: number,
  hintTitle: string,
  hintContent: Array<string>,
};

export default (props: PropTypes) => (
  <div>
    <HostEntryStep edit={props.edit} step={props.step} />
    <HintWrapper>
      <Hint title={props.hintTitle} content={props.hintContent} />
    </HintWrapper>
  </div>
);
