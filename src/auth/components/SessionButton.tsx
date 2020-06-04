import React, { useState } from 'react';

import { AccountCircle } from '@material-ui/icons';
import { Button, makeStyles, Menu, MenuItem } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import authService from 'src/auth/service';
import componentService from 'src/components/service';
import ConfirmDialog from 'src/components/ConfirmDialog';

const useStyles = makeStyles((theme) => ({
  accountCircle: {
    marginRight: theme.spacing(1)
  },
  button: {
    whiteSpace: 'nowrap'
  }
}));

export default function SessionButton() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const classes = useStyles();
  const history = useHistory();
  const [isSignoutDialogOpen, setIsSignoutDialogOpen] = useState(false);

  const handleClickButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickSignoutMenu = () => {
    handleCloseMenu();
    setIsSignoutDialogOpen(true);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleCloseSignoutDialog = (answer: boolean) => {
    setIsSignoutDialogOpen(false);
    if (answer) {
      authService.signout();
      componentService.showSnackbar('로그아웃되었습니다.');
    }
  };

  return (
    <>
      {authService.isSignedIn ?
        (
          <>
            <Button color="inherit" onClick={handleClickButton} className={classes.button}>
              <AccountCircle className={classes.accountCircle} />
              {authService.session?.nickname}
            </Button>
            <Menu
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              anchorEl={anchorEl} keepMounted onClose={handleCloseMenu} open={Boolean(anchorEl)}>
              <MenuItem onClick={handleClickSignoutMenu}>로그아웃</MenuItem>
            </Menu>

            <ConfirmDialog content="로그아웃하시겠습니까?" onClose={handleCloseSignoutDialog} open={isSignoutDialogOpen} />
          </>
        ) :
        (
          <Button color="inherit" onClick={() => history.push('/signin')} className={classes.button}>로그인</Button>
        )
      }
    </>
  );
}
