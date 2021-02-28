import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles';
import { palette } from './palette';
import { breakpoints } from './breakpoints';
import { spacing } from './spacing';
import { overrides } from './overrides';
import { mixins } from './mixins';

const theme = createMuiTheme({
  palette,
  breakpoints,
  spacing,
  overrides,
  mixins,
});

export default theme;
