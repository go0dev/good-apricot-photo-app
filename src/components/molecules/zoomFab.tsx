import { FC, ReactElement } from 'react';
import { useTheme } from '@material-ui/core/styles';

import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import { PropTypes } from '@material-ui/core';

export type ZoomFabProps = {
  show: boolean;
  icon: ReactElement;
  label: string;
  color?: PropTypes.Color;
  handleClick?: () => void;
};

const ZoomFab: FC<ZoomFabProps> = ({
  show,
  icon,
  label,
  color,
  handleClick,
}) => {
  const theme = useTheme();

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  return (
    <Zoom
      key="primary"
      in={show}
      timeout={transitionDuration}
      style={{
        transitionDelay: `${show ? transitionDuration.exit : 0}ms`,
      }}
      unmountOnExit
    >
      <Fab aria-label={label} color={color || 'primary'} onClick={handleClick}>
        {icon}
      </Fab>
    </Zoom>
  );
};

export default ZoomFab;
