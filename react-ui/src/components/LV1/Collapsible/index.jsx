// @flow

import React from 'react';
import styled from 'styled-components';
import Collapsible from 'react-collapsible';
import { Dimens, Colors, FontSizes } from 'variables';

const CollapsibleeWrap = styled.div``;

const CollapsibleStyled = styled(Collapsible)`
  ${'' /* padding: ${Dimens.medium}px;
  background-color: ${Colors.lightGray1Bg};
  border: 1px solid ${Colors.borderGray}; */}
`;

// const Container = styled.div`
//   display: table-cell;
//   vertical-align: middle;
//   text-align: left;
// `;
//
// const Image = styled.i`
//   display: block;
//   font-size: 70px;
//   margin: 0 auto;
//   color: ${Colors.lightGray1};
// `;
//
// const Text = styled.div`
//   display: block;
//   font-size: ${FontSizes.xsmall}px;
//   color: ${Colors.lightGray1};
//   line-height: 2;
// `;
//
// const Preview = styled.img`
//   display: block;
//   width: 96px;
//   height: 96px;
//   border-radius: 70px;
//   margin: 0 auto;
//   object-fit: cover;
//   float: left;
// `;

const Item = styled.p`
  ${'' /* padding: ${Dimens.small_10}px;
  border: 1px solid ${Colors.lightGray2}; */}
  ${'' /* color: ${Colors.black}; */}
`;

const Count = styled.span`
  position: absolute;
  right: ${Dimens.small_10}px;
  font-size: ${FontSizes.small_12}px;
  font-weight: normal;
`;

type PropTypes = {
  image?: string,
};

export default (props: PropTypes) => (
  <CollapsibleeWrap>
    <CollapsibleStyled trigger="関東">
      <Item>
        東京
        <Count>61件</Count>
      </Item>
      <Item>
        神奈川
        <Count>39件</Count>
      </Item>
      <Item>
        千葉
        <Count>28件</Count>
      </Item>
      <Item>
        埼玉
        <Count>16件</Count>
      </Item>
      <Item>
        栃木
        <Count>14件</Count>
      </Item>
      <Item>
        群馬
        <Count>12件</Count>
      </Item>
    </CollapsibleStyled>
    <CollapsibleStyled trigger="近畿">
      <Item>
        東京
        <Count>61件</Count>
      </Item>
      <Item>
        神奈川
        <Count>39件</Count>
      </Item>
      <Item>
        千葉
        <Count>28件</Count>
      </Item>
      <Item>
        埼玉
        <Count>16件</Count>
      </Item>
      <Item>
        栃木
        <Count>14件</Count>
      </Item>
      <Item>
        群馬
        <Count>12件</Count>
      </Item>
    </CollapsibleStyled>
    <CollapsibleStyled trigger="北海道・東北">
      <Item>
        東京
        <Count>61件</Count>
      </Item>
      <Item>
        神奈川
        <Count>39件</Count>
      </Item>
      <Item>
        千葉
        <Count>28件</Count>
      </Item>
      <Item>
        埼玉
        <Count>16件</Count>
      </Item>
      <Item>
        栃木
        <Count>14件</Count>
      </Item>
      <Item>
        群馬
        <Count>12件</Count>
      </Item>
    </CollapsibleStyled>
    <CollapsibleStyled trigger="中国・四国">
      <Item>
        東京
        <Count>61件</Count>
      </Item>
      <Item>
        神奈川
        <Count>39件</Count>
      </Item>
      <Item>
        千葉
        <Count>28件</Count>
      </Item>
      <Item>
        埼玉
        <Count>16件</Count>
      </Item>
      <Item>
        栃木
        <Count>14件</Count>
      </Item>
      <Item>
        群馬
        <Count>12件</Count>
      </Item>
    </CollapsibleStyled>
    {/* <Dropzone accept="image/jpeg, image/png" onDrop={props.onDrop}>
      {({ getRootProps, getInputProps }) => (
        <Container {...getRootProps()}>
          {props.image ? (
            <Preview src={props.imagePreview || props.image} />
          ) : (
            <div>
              <Image className="fal fa-image" />
              <Text>写真を登録する</Text>
            </div>
          )}
          <input {...getInputProps()} />
        </Container>
      )}
    </Dropzone> */}
  </CollapsibleeWrap>
);
