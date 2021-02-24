import React, { FC, ChangeEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { a11yProps } from 'components/atoms/a11yProps';
import AppBar from '@material-ui/core/AppBar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import IconLabel from 'components/molecules/iconLabel';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MosaicIcon from 'components/atoms/MosaicIcon';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.background.default,
    boxShadow: '0 1px 2px rgb(0 0 0 / 30%)',
  },
}));

type Props = {
  tabValue: number;
  handleTabChange: (
    event: ChangeEvent<Record<string, unknown>>,
    value: number,
  ) => void;
  window?: () => Window;
};

const Header: FC<Props> = ({ tabValue, handleTabChange, window }) => {
  const classes = useStyles();
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar position="fixed" className={classes.appBar}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="app-tab"
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab
            label={
              <IconLabel
                label="ストック写真"
                icon={<PhotoLibraryIcon fontSize="inherit" />}
              />
            }
            {...a11yProps(0)}
          />
          <Tab
            label={
              <IconLabel
                label="投稿写真"
                icon={<MosaicIcon fontSize="inherit" />}
              />
            }
            {...a11yProps(1)}
          />
          <Tab
            label={
              <IconLabel
                label="マイページ"
                icon={<AccountCircleIcon fontSize="inherit" />}
              />
            }
            {...a11yProps(2)}
          />
        </Tabs>
      </AppBar>
    </Slide>
  );
};

export default Header;
