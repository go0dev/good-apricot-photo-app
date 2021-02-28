import React, { FC, useCallback } from 'react';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import MaterialToolbar from '@material-ui/core/Toolbar';
import MaterialAppBar from '@material-ui/core/AppBar';
import { useNavigate } from 'react-router';
import paths from 'routes/paths';

export const NavBar: FC = () => {
  const trigger = useScrollTrigger();
  const navigate = useNavigate();
  const handleClick = useCallback(
    (route: string) => () => {
      navigate(route);
    },
    [navigate],
  );

  return (
    <Slide appear={false} direction="up" in={!trigger}>
      <MaterialAppBar position="fixed">
        <MaterialToolbar>
          <IconButton onClick={handleClick(paths.root)}>
            <PhotoLibraryIcon />
          </IconButton>
          <IconButton onClick={handleClick(paths.gallery)}>
            <PhotoLibraryIcon />
          </IconButton>
          <IconButton onClick={handleClick(paths.mypage)}>
            <PhotoLibraryIcon />
          </IconButton>
        </MaterialToolbar>
      </MaterialAppBar>
    </Slide>
  );
};
