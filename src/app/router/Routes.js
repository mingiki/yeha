import React, { Suspense , Component} from "react";
import { Redirect, Route, HashRouter, Switch ,withRouter, BrowserRouter} from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as AuthModules from "../store/modules/auth";
import ApiService from '../service/ApiService';

import Auth from "../pages/Auth";
import Main from "../pages/Main";

class Routes extends Component {
  constructor(props) {
      super(props);
      console.log(props);
      this.api = new ApiService();
      this.state = {
        checkToken : {
          resultCode : '999',
          resultMsg : 'null'
        }
      };
  }

  componentDidMount(){


    let accessToken = sessionStorage.getItem('acccessToken');
    console.log("======componentDidMount======");
    console.log(this.props);
    console.log(accessToken);
    console.log("============");
    this.getCheckToken(accessToken);
  }

  componentWillReceiveProps(nextProps) {
    console.log("======componentWillReceiveProps======");
    console.log(nextProps);
    console.log("============");

    let accessToken = nextProps.auth.accessToken;
    if (accessToken) {this.getCheckToken(accessToken);}
  }

  getCheckToken = async (accessToken) => {
    let api = new ApiService();
    let checkToken = await api.checkToken(accessToken);
    this.setState({
      checkToken : checkToken
    })
  }

  render() {
    let param = this.props;
    return this.state.checkToken.resultCode == "999" ? (
      <Suspense>
        <Switch>
          {
            <Redirect exact from="/" to="/auth" />
          }
  
          {/* auth 관련 router  */}
          <Route path={"/auth"} render={() =><Auth {...param} />}  />
  
          <Route component={Error}/>
        </Switch>
      </Suspense>
    ) : (
      <Suspense>
        <Switch>
          {
            <Redirect exact from="/" to="/main" />
          }
  
          {/* main 관련 router */}
          <Route path={"/main"} render={() =><Main {...param} />}  />
          {/* auth 관련 router  */}
          <Route path={"/auth"} render={() =><Auth {...param} />}  />
  
          <Route component={Error}/>
        </Switch>
      </Suspense>
    )
  }
}

export default connect((state) => ({
  auth: state.auth,
}),
  (dispatch) => ({
      AuthActions: bindActionCreators(AuthModules.actions, dispatch),
  })
)(Routes);




