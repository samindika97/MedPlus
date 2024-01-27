import { fetchBaseQuery } from "@reduxjs/toolkit/query";
// import type {
//   BaseQueryFn,
//   FetchArgs,
//   FetchBaseQueryError,
// } from "@reduxjs/toolkit/query";
import { ApiSlug } from "../utils/apiSlug";
import { logOut, setToken } from "../store/slices/auth.slice";
import { UserRole } from "../utils/apiSlug";

const query = fetchBaseQuery({
  baseUrl: `http://localhost:8080/api/v1`,
  // credentials: "include",
  // prepareHeaders: (headers, { getState }) => {
  //   const token = (getState() as any).auth.token;
  //   token && headers.set("authorization", `Bearer ${token}`);
  //   return headers;
  // },
});

const baseQuery = async (args, api, extraOptions) => {
  let result = await query(args, api, extraOptions);

  if (result.meta?.response?.status === 200 && args.url === ApiSlug.LOGIN) {
    // if ((result.data as any).data?.user?.role !== UserRole.Admin) {
    //   const newError = {
    //     status: 404,
    //     data: {
    //       status: false,
    //       code: 404,
    //       message: "You are not authorized to use this platform!",
    //     },
    //   };
    //   return {
    //     meta: result.meta,
    //     error: newError,
    //   };
    // }
  }

  // if (result.error && result.error.status === 406) {
  //   const refreshResult = await query(ApiSlug.REFRESH_TOKEN, api, extraOptions);
  //   if (refreshResult.data) {
  //     api.dispatch(setToken((refreshResult.data as any).data?.token));
  //     result = await query(args, api, extraOptions);
  //   } else {
  //     api.dispatch(logOut());
  //   }
  //   api.dispatch(logOut());
  // }

  // if (result.error && result.error.status === 500) {
  //   api.dispatch(logOut());
  // }

  return result;
};

export default baseQuery;
