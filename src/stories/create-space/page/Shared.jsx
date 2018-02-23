import styled from 'styled-components';

export const Page = styled.div`
  padding: 80px 10%;
`;

export const Container = styled.div`
  width: 100%;
  &::after {
    clear: both;
    content: "";
    display: block;
  }
`;

export const PageContent = styled.div`
  width: 60%;
  float: left;
`;

export default {};
