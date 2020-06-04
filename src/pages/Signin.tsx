import React, { useEffect, useRef, useState } from 'react';

import { Box, Button, FormControl, FormHelperText, Input, InputLabel, LinearProgress, makeStyles, Paper, Typography } from '@material-ui/core';
import { observer } from 'mobx-react';

import authService from 'src/auth/service';
import componentService from 'src/components/service';

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: 360,
    minWidth: 240,
    padding: theme.spacing(1),
    width: '50vw'
  },
  formControl: {
    width: '100%'
  }
}));

export default observer(function Signin() {
  const classes = useStyles();
  const [form, setForm] = useState({ username: '', password: '' });
  const isMounted = useRef(true);
  const [submitting, setSubmitting] = useState(false);
  const usernameInput = useRef<HTMLInputElement>(null);

  const focusUsername = () => {
    usernameInput.current?.focus();
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, password: e.target.value });
  };
  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, username: e.target.value.trim() });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.username || !form.password) {
      return;
    }

    setSubmitting(true);
    try {
      await authService.signin(form.username, form.password);
      componentService.showSnackbar('로그인되었습니다.');
    } catch (e) {
      if (e instanceof Response && e.status < 500) {
        componentService.showSnackbar('아이디 혹은 비밀번호가 잘못되었습니다.');
      }
      if (isMounted.current) {
        setSubmitting(false);
        focusUsername();
      }
    }
  };
  const isFormInvalid = () => {
    return !form.username || !form.password;
  };

  useEffect(() => {
    focusUsername();

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <Box alignItems="center" bottom="0" display="flex" justifyContent="center" left="0" position="fixed" right="0" top="0">
      <Paper className={classes.paper}>
        <Box height="48px" mb={2}>
          <Typography component="h3" variant="h5">
            Example 로그인
          </Typography>
        </Box>

        <form noValidate onSubmit={handleSubmit}>
          <Box display="flex" flexWrap="wrap" justifyContent="space-between">
            <Box flexBasis={{ xs: '100%', sm: 'calc(50% - 8px)' }}>
              <FormControl disabled={submitting} required className={classes.formControl}>
                <InputLabel>아이디</InputLabel>
                <Input inputRef={usernameInput} onChange={handleChangeUsername} value={form.username} />
                <FormHelperText>{!form.username && '아이디를 입력하십시오.'}&nbsp;</FormHelperText>
              </FormControl>
            </Box>

            <Box flexBasis={{ xs: '100%', sm: 'calc(50% - 8px)' }}>
              <FormControl disabled={submitting} required className={classes.formControl}>
                <InputLabel>비밀번호</InputLabel>
                <Input onChange={handleChangePassword} type="password" value={form.password} />
                <FormHelperText>{!form.password && '비밀번호를 입력하십시오.'}&nbsp;</FormHelperText>
              </FormControl>
            </Box>

            <Box flex="100%" height="4px" mb={2} mt={3}>
              {submitting && <LinearProgress />}
            </Box>

            <Box>
              <Button color="primary" disabled={isFormInvalid() || submitting} type="submit">로그인</Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Box>
  );
});
