import React from 'react';
import styled from 'styled-components';
import ImageSlider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { convertSpaceImgUrl } from 'helpers/imgix';

const ImageLi = styled.li`
  overflow: hidden;
`;

const ImageSpace = styled.img`
  width: 100%;
`;

export default ({ images }) => (
  <ImageSlider className="space custom-arrow-2" dots cssEase="linear" slidesToShow={1}>
    {images &&
      images.map((item, i) => (
        <ImageLi key={i.toString()}>
          <ImageSpace
            src={convertSpaceImgUrl(`${item.original}`, 'w=1200&h=800&fit=crop')}
            alt={item.alt}
          />
        </ImageLi>
      ))}
  </ImageSlider>
);
