import React, { Fragment } from 'react';
import styled from 'styled-components';
import InputForm from 'components/LV2/Forms/InputForm';
import TextButton from 'components/LV1/Texts/TextButton';
import { Dimens, Colors, FontSizes } from 'variables';
import { H3 } from 'components/LV1/Texts/Headline';

const Wrapper = styled.div`
  position: relative;
`;

const Icon = styled.i`
  position: absolute;
  top: 50%;
  left: ${Dimens.small2_15}px;
  margin-top: -10px;
  font-size: ${FontSizes.medium1_22}px;
  color: ${Colors.lightGray1};
  ${props =>
    props.right &&
    `
      left: auto;
      right: 25px;
    `};
`;

const StyledTextButton = styled(TextButton)`
  position: absolute;
  top: 50%;
  left: 15px;
  margin-top: -4px;
  font-size: 22px;
  color: ${Colors.lightGray1};
  ${props =>
    props.right &&
    `
      left: auto;
      right: 25px;
    `};
`;

export default ({
  label,
  right,
  type,
  placeholder,
  value,
  onChange,
  onKeyDown,
  clickIcon,
  iconClassName,
}) => (
  <Fragment>
    {label && (
      <H3 bold as="h3">
        {label}
      </H3>
    )}
    <Wrapper>
      {right ? (
        <Fragment>
          <InputForm
            right={right}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
          <StyledTextButton onClick={clickIcon} className={iconClassName} right={right} />
        </Fragment>
      ) : (
        <Fragment>
          <Icon className={iconClassName} />
          <InputForm
            right={right}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
        </Fragment>
      )}
    </Wrapper>
  </Fragment>
);
