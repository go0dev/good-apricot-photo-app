import { FC, ReactNode } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  label: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    flexGrow: 2,
    justifyContent: 'center',
    fontSize: '3.8vw',
    [theme.breakpoints.up('tablet')]: {
      fontSize: '18px',
    },
    letterSpacing: 0,
    width: '100%',
    margin: theme.spacing(1),
  },
  icon: {
    fontSize: 'inherit',
    alignItems: 'center',
    display: 'flex',
    marginRight: theme.spacing(0.5),
  },
  text: {
    whiteSpace: 'nowrap',
    fontSize: 'inherit',
    alignItems: 'center',
    display: 'flex',
  },
}));

type Props = {
  label: string;
  icon: ReactNode;
};
const IconLabel: FC<Props> = ({ label, icon }) => {
  const classes = useStyles();

  return (
    <div className={classes.label}>
      <div className={classes.icon}>{icon}</div>
      <div className={classes.text}>{label}</div>
    </div>
  );
};

export default IconLabel;
