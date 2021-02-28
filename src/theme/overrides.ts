import { Overrides } from '@material-ui/core/styles/overrides';
import { breakpoints } from './breakpoints';
import { spacing } from './spacing';

export const overrides: Overrides = {
  MuiAppBar: {
    positionFixed: {
      top: 'auto',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
    colorPrimary: {
      backgroundColor: 'transparent',
    },
  },
  MuiToolbar: {
    root: {
      minHeight: 56,
      borderRadius: 999,
      marginBottom: spacing(2),
      boxShadow: 'rgb(0 0 0 / 10%) 0px 0px 8px',
      backgroundColor: 'white',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',

      width: 'calc(100% - 176px)',
      maxWidth: 206,
      minWidth: 176,
      marginLeft: 'auto',
      marginRight: 'auto',
      height: 56,
      [breakpoints.down('xs')]: {
        marginLeft: 'calc((100% - 248px) / 2)',
        marginRight: '88px',
      },
    },
  },
  MuiFab: {
    root: {
      position: 'fixed',
      zIndex: 1200,
      bottom: spacing(2),
      right: spacing(2),
      transform: 'translate3d(0, 0, 0)',
    },
  },
};
