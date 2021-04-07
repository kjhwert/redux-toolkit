import React from "react";
import Notice from "./features/notice/Notice";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Login from "./features/profile/Login";
import Profile from "./features/profile/Profile";
import NotFound from "./modules/components/NotFound";
import { ToastContainer } from "react-toastify";

export const App = () => {
  return (
    <Router>
      <Link to="login">로그인</Link>
      <Link to="profile">프로필</Link>
      <Link to="notice">공지사항</Link>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
        <Route path="/notice" component={Notice} />
        <Route component={NotFound} />
      </Switch>
      <ToastContainer />
    </Router>
  );
};

export default App;
