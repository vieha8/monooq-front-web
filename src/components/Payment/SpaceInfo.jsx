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

export default () => (
  <div>
    <Title>ホストは YUKI HASHIDA さん</Title>
    <Wrapper>
      <Image src="https://picsum.photos/150?image=42" />
      <div>
        <Area>東京都 港区 六本木</Area>
        <Description>
          東京タワーに近くて便利！大きい荷物も何人分でもOK何人分で荷物も何人分でもOK何人分で…
        </Description>
      </div>
    </Wrapper>
  </div>
);
