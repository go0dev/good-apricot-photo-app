import { ChangeEvent, RefObject, useEffect, useRef, useState } from 'react';

type ReturnValue = {
  inputRef: RefObject<HTMLInputElement>;
  buttonRef: RefObject<HTMLButtonElement>;
  imageList: string[];
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const useFabAction = (): ReturnValue => {
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [imageList, setImageList] = useState<string[]>([]);
  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      const url = URL.createObjectURL(files[0]);
      setImageList((prevImageList) => [...prevImageList, url]);
    }
  };

  useEffect(() => {
    const { current: input } = inputRef;
    const { current: button } = buttonRef;
    if (input && button) {
      button.onclick = handleButtonClick;
    }
  });

  return { inputRef, buttonRef, imageList, handleInputChange };
};

export default useFabAction;
