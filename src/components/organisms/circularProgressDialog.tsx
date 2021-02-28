import { FC, useCallback } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
  }),
);

type Props = {
  progress?: number;
};

export const CircularProgressDialog: FC<Props> = ({ progress }) => {
  const classes = useStyles();

  const progressOpen = useCallback(() => {
    if (progress == null) {
      return false;
    }
    if (progress <= 0 || progress >= 100) {
      return false;
    }

    return true;
  }, [progress]);
  console.log(`progress:`, progress, progressOpen());

  return (
    <Dialog aria-labelledby="progress-dialog" open={progressOpen()}>
      <div className={classes.root}>
        <CircularProgress variant="determinate" value={progress} />
      </div>
    </Dialog>
  );
};
