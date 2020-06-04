import React, { Suspense, useEffect, useState } from 'react';

import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Snackbar } from '@material-ui/core';

import authService from 'src/auth/service';
import componentService from 'src/components/service';
import Home from 'src/pages/home/Home';
import Loading from 'src/components/Loading';
import Signin from 'src/pages/Signin';

// const SubService = React.lazy(() => import('src/pages/reco-insight/SubService'));

export default observer(function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      componentService.isLoading = true;
      try {
        await authService.getMe();
      }
      catch (_) { }
      componentService.isLoading = false;
      setIsLoading(false);
    })();
  }, []);

  return (
    <>
      {isLoading ?
        <Loading /> :
        (
          <BrowserRouter>
            <Suspense fallback={<Loading />}>
              <Switch>
                <Route exact path="/home">
                  <Home />
                </Route>
                <Route exact path="/signin">
                  {authService.isSignedIn ?
                    <Redirect to="/home" /> :
                    <Signin />
                  }
                </Route>

                <Route noMatch>
                  <Redirect to="/home" />
                </Route>
              </Switch>
            </Suspense>
          </BrowserRouter>
        )
      }
      {
        componentService.snackbar &&
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            autoHideDuration={componentService.snackbar.duration}
            message={componentService.snackbar.message}
            open={!!componentService.snackbar}
            onClose={() => componentService.snackbar = null} />
      }
    </>
  );
});
