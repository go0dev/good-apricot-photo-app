import { FC, ReactElement, RefObject } from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';

import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import { PropTypes } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 99999,
    transform: 'translate3d(0, 0, 0)',
  },
}));

type ZoomFabProps = {
  show: boolean;
  icon: ReactElement;
  label: string;
  color?: PropTypes.Color;
  buttonRef: RefObject<HTMLButtonElement>;
};

const ZoomFab: FC<ZoomFabProps> = ({ show, icon, label, color, buttonRef }) => {
  const classes = useStyles();
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
      <Fab
        aria-label={label}
        className={classes.fab}
        color={color || 'primary'}
        ref={buttonRef}
      >
        {icon}
      </Fab>
    </Zoom>
  );
};

export default ZoomFab;
