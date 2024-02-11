import React, { useMemo, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "./store/slices/auth.slice";
import { useLoginMutation } from "./services/authService";

import AuthRoutes from "./routes/AuthRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";

import { userRoles } from "./utils/userRoles";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  const { data, isSuccess } = useLoginMutation({
    fixedCacheKey: "auth-login",
  })[1];

  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);

  const Routes = useMemo(() => {
    if (!token) return <AuthRoutes />;
    if (role === userRoles.ADMIN) return <AdminRoutes />;
    return <UserRoutes />;
  }, [token]);

  useEffect(() => {
    isSuccess && dispatch(setAuth(data));
  }, [isSuccess, data]);

  return <BrowserRouter children={Routes} />;
}

export default App;
