import React from 'react';

import { AppBar, Box, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { observer } from 'mobx-react';

import authService from 'src/auth/service';
import SessionButton from 'src/auth/components/SessionButton';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.appBar
  }
}));

export default observer(function Home() {
  const classes = useStyles();

  return (
    <>
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar>
          <Typography component="h1" noWrap variant="h6">
            Example
          </Typography>

          <Box flexGrow={1} />

          <SessionButton />
        </Toolbar>
      </AppBar>

      <Box component="main" p={2}>
        {authService.isSignedIn ?
          (
            <>
              <Typography variant="body1">
                {authService.session?.nickname} 님, Example에 오신 것을 환영합니다.
              </Typography>
            </>
          ) :
          (
            <>
              <Typography variant="body1">
                Example에 오신 것을 환영합니다.
              </Typography>
              <Typography variant="body1">
                서비스를 이용하시려면 <Link to="/signin">로그인</Link>하십시오.
              </Typography>
            </>
          )
        }
      </Box>
    </>
  );
});
