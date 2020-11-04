import React, { Suspense , Component} from "react";
import { Redirect, Route, Switch ,withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as LessonModules from "../../../store/modules/lesson";

import LessonListComponent from "./LessonListComponent";
import LessonViewComponent from "./LessonViewComponent";
import LessonEditComponent from "./LessonEditComponent";
import LessonAddComponent from "./LessonAddComponent";

class LessonComponent extends Component {
  constructor(props) {
      super(props);  
      this.state = {
      };
  }

  render() {
    const param = {
      auth : this.props.auth,
      lesson : this.props.lesson,
      AuthActions : this.props.AuthActions,
      LessonActions : this.props.LessonActions
    };
    
    return <>
      <Suspense>
        <Switch>
          <Route exact path={`${this.props.match.url}`} render={(props) => <LessonListComponent {...props} {...param}/>} />
          <Route path={`${this.props.match.url}/view/:id`} render={(props) => <LessonViewComponent {...props} {...param} />}  />
          <Route path={`${this.props.match.url}/edit/:id`} render={(props) => <LessonEditComponent {...props} {...param}/>}  />
          <Route path={`${this.props.match.url}/add`} render={(props) => <LessonAddComponent {...props}  {...param} />}  />

          <Redirect from="*" to={`${this.props.match.url}`} />
        </Switch>
      </Suspense>
    </>
  }
}

export default connect((state) => ({
  lesson: state.lesson,
}),
  (dispatch) => ({
      LessonActions: bindActionCreators(LessonModules.actions, dispatch),
  })
)(withRouter(LessonComponent));
