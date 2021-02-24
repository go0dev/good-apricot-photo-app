import { FC, ReactElement } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    columnCount: 2,
    columnGap: 0,
    [theme.breakpoints.up('tablet')]: {
      columnCount: 3,
    },
  },
}));

type Props = {
  children: ReactElement[];
};

const Masonry: FC<Props> = ({ children }) => {
  const classes = useStyles();

  return <Box className={classes.root}>{children}</Box>;
};

export default Masonry;
