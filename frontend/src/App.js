import React, { useMemo, useEffect } from "react";
import "./App.css";

import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "./store/slices/auth.slice";
import AuthRoutes from "./routes/AuthRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import { useLoginMutation } from "./services/authService";

function App() {
  const dispatch = useDispatch();
  const { data, isSuccess } = useLoginMutation({
    fixedCacheKey: "auth-login",
  })[1];

  const token = useSelector((state) => state.auth.token);
  // const user = useSelector((state) => state.auth.user);

  const Routes = useMemo(() => {
    if (!token) return <AuthRoutes />;
    return <AdminRoutes />;
  }, [token]);

  useEffect(() => {
    isSuccess && dispatch(setAuth(data));
  }, [isSuccess, data]);

  return <BrowserRouter children={Routes} />;
}

export default App;
