import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles';

const white = '#FFFFFF';

const theme = createMuiTheme({
  breakpoints: {
    values: {
      tablet: 640,
      laptop: 1024,
      desktop: 1280,
    },
  },
  palette: {
    primary: {
      contrastText: white,
      main: '#37B2F7',
    },
    background: {
      default: '#eaeae8',
    },
  },
});

export default theme;
