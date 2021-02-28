import React, { FC } from 'react';
import AddIcon from '@material-ui/icons/Add';
import ZoomFab from 'components/molecules/zoomFab';

type Props = {
  show: boolean;
  handleClick: () => void;
};

const HomeFab: FC<Props> = ({ show, handleClick }) => (
  <ZoomFab
    show={show}
    label="あなたの写真"
    icon={<AddIcon />}
    color="primary"
    handleClick={handleClick}
  />
);

export default HomeFab;
