import React from 'react';
import styled from 'styled-components';

const Title = styled.div`
  font-size: 18px;
  line-height: 32px;
  margin-bottom: 15px;
`;
const Wrapper = styled.div`
  display: flex;
`;
const Image = styled.img`
  width: 104px;
  height: 79px;
  border-radius: 6px;
  object-fit: cover;
  margin-right: 20px;
`;

const Area = styled.div`
  font-size: 12px;
  line-height: 18px;
  margin-bottom: 5px;
  color: #e85258;
`;

const Description = styled.div`
  font-size: 12px;
  line-height: 18px;
`;

export default props => (
  <div>
    <Title>{`ホストは ${props.Host.Name} さん`}</Title>
    <Wrapper>
      <Image src={(props.Images[0] || {}).ImageUrl} />
      <div>
        <Area>{`${props.AddressPref} ${props.AddressCity} ${props.AddressTown}`}</Area>
        <Description>
          {props.About}
        </Description>
      </div>
    </Wrapper>
  </div>
);
