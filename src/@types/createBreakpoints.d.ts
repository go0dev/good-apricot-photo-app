/* eslint-disable @typescript-eslint/no-unused-vars */
import * as createBreakpoints from '@material-ui/core/styles/createBreakpoints';

declare module '@material-ui/core/styles/createBreakpoints' {
  interface BreakpointOverrides {
    xs: true; // removes the `xs` breakpoint
    sm: true;
    md: false;
    lg: false;
    xl: false;
    tablet: true; // adds the `tablet` breakpoint
    laptop: false;
    desktop: false;
  }
}
