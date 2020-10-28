import React, { Suspense , Component} from "react";
import { Redirect, Route, Switch ,withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as InstructorModules from "../../../store/modules/instructor";

import InstructorListComponent from "./InstructorListComponent";
import InstructorViewComponent from "./InstructorViewComponent";
import InstructorEditComponent from "./InstructorEditComponent";
import InstructorAddComponent from "./InstructorAddComponent";

class InstructorComponent extends Component {
  constructor(props) {
      super(props);  
      this.state = {
      };
  }

  render() {
    const param = {
      auth : this.props.auth,
      instructor : this.props.instructor,
      AuthActions : this.props.AuthActions,
      InstructorActions : this.props.InstructorActions
    };
    
    return <>
      <Suspense>
        <Switch>
          <Route exact path={`${this.props.match.url}`} render={(props) => <InstructorListComponent {...props} {...param}/>} />
          <Route path={`${this.props.match.url}/view/:id`} render={(props) => <InstructorViewComponent {...props} {...param} />}  />
          <Route path={`${this.props.match.url}/edit/:id`} render={(props) => <InstructorEditComponent {...props} {...param}/>}  />
          <Route path={`${this.props.match.url}/add`} render={(props) => <InstructorAddComponent {...props}  {...param} />}  />

          <Redirect from="*" to={`${this.props.match.url}`} />
        </Switch>
      </Suspense>
    </>
  }
}

export default connect((state) => ({
    instructor: state.instructor,
}),
  (dispatch) => ({
      InstructorActions: bindActionCreators(InstructorModules.actions, dispatch),
  })
)(withRouter(InstructorComponent));
