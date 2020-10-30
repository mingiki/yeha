import React, { Suspense , Component} from "react";
import { Redirect, Route, HashRouter, Switch ,withRouter, BrowserRouter} from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as AuthModules from "../store/modules/auth";

//setting
import * as GroupModules from "../store/modules/group";

import ApiService from '../service/ApiService';

import Auth from "../pages/Auth";
import Layout from "../pages/layout/Layout";


class Routes extends Component {
  constructor(props) {
      super(props);
      console.log(props);
      this.api = new ApiService();
      this.state = {
      };
  }

  componentDidMount = async () =>{
    // let accessToken = this.props.auth.accessToken
    // let tokenResult = this.props.auth.tokenResult;
    // if (tokenResult.resultCode == "999") {

    // }
    // if (accessToken) {
    //   await this.getCheckToken(accessToken);
    // } 
  }

  getCheckToken = async (accessToken) => {
    let api = new ApiService();
    let tokenResult = await api.checkToken(accessToken);
    this.props.AuthActions.SetTokenResult(tokenResult);
  }
  
  _routerRander = () => {
    if (this.props.auth.loginUser == null) {
      return  <Suspense>
                <Switch>
                  {
                    <Redirect exact from="/" to="/auth" />
                  }

                  {/* auth 관련 router  */}
                  <Route path={"/auth"} render={() =><Auth {...this.props} />}  />

                  <Redirect from="*" to="/auth" />
                  <Route component={Error}/>
                </Switch>
              </Suspense>
    } else {
      return <> 
            <Switch>
              <Layout {...this.props} />
            </Switch>
      </>
    }
  }

  render() {
    return <>
      {this._routerRander()}
    </>
  }
}

export default connect((state) => ({
  auth: state.auth,
}),
(dispatch) => ({
  AuthActions: bindActionCreators(AuthModules.actions, dispatch),
})
)(Routes);




