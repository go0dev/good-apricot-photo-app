import { useEffect, useRef, useState, RefObject, ChangeEvent } from 'react';
import Slider from 'react-slick';

type ReturnValue = {
  sliderRef: RefObject<Slider>;
  tabValue: number;
  handleTabChange: (
    _: ChangeEvent<Record<string, unknown>>,
    newTabIndex: number,
  ) => void;
  afterSlideChange: (currentSlide: number) => void;
};

const useSliderTab = (): ReturnValue => {
  const sliderRef = useRef<Slider>(null);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (
    _: ChangeEvent<Record<string, unknown>>,
    newTabIndex: number,
  ) => {
    setTabValue(newTabIndex);
  };

  const afterSlideChange = (currentSlide: number) => {
    setTabValue(currentSlide);
  };

  useEffect(() => {
    sliderRef.current?.slickGoTo(tabValue);
  }, [tabValue]);

  return { sliderRef, tabValue, handleTabChange, afterSlideChange };
};

export default useSliderTab;
