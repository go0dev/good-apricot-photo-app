import React, { FC, RefObject } from 'react';
import AddIcon from '@material-ui/icons/Add';
import ZoomFab from './zoomFab';

type Props = {
  show: boolean;
  buttonRef: RefObject<HTMLButtonElement>;
};

const MyGalleryFab: FC<Props> = ({ show, buttonRef }) => (
  <ZoomFab
    show={show}
    label="あなたの写真"
    icon={<AddIcon />}
    color="primary"
    buttonRef={buttonRef}
  />
);

export default MyGalleryFab;
