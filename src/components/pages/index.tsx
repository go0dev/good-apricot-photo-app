import React, { FC, useState } from 'react';
import Header from 'components/organisms/header';
import MyGalleryFab from 'components/organisms/fabs/myGalleryFab';

import { Box } from '@material-ui/core';
import MyGalleryContents from 'components/templates/stocks/myGallery';

import Slider from 'react-slick';
import useSliderTab from './useSliderTab';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useFabAction from './useFabAction';

const PhotoApp: FC = () => {
  const {
    sliderRef,
    tabValue,
    handleTabChange,
    afterSlideChange,
  } = useSliderTab();
  const { inputRef, buttonRef } = useFabAction();
  const [canSwipe, _setCanSwipe] = useState(true);

  return (
    <>
      <Header handleTabChange={handleTabChange} tabValue={tabValue} />
      <Box marginTop="50px">
        <Slider
          infinite
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          afterChange={afterSlideChange}
          arrows={false}
          ref={sliderRef}
          swipe={canSwipe}
        >
          <Box height="100vh">
            <MyGalleryContents inputRef={inputRef} />
          </Box>
          <Box height="100vh">Hello!!</Box>
          <div>Hello2</div>
        </Slider>
      </Box>
      <MyGalleryFab show={tabValue === 0 && canSwipe} buttonRef={buttonRef} />
    </>
  );
};

export default PhotoApp;
