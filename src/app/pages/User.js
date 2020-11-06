import React , { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import UserComponent from "../components/user/UserComponent";

export default function User(props) {
  let param = props;
  return (
    <>
      <Suspense>
        <Switch>
          <Route path={"/user"} render={() =><UserComponent {...param} />} />   
        </Switch>
      </Suspense>
    </>
  );
}
