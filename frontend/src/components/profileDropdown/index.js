import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DownArrowIcon } from "../../icons/icon";
import { useNavigate } from "react-router";
import { urlSlug } from "../../utils/urlSlug";
import { logOut } from "../../store/slices/auth.slice";
import { authServiceApi } from "../../services/authService";

const ProfileDropDown = ({ username }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = useCallback(() => {
    dispatch(authServiceApi.util.resetApiState());
    dispatch(logOut());
  }, [dispatch]);

  return (
    <div className="w-40 text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="flex w-full items-center justify-center gap-1 rounded-3xl bg-teal px-10 py-1 font-medium hover:bg-teal/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
            <p className="font-semibold capitalize text-white">
              {username.split(" ")[0]}
            </p>
            <DownArrowIcon fontSize="medium" className="text-white" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-teal/25" : "text-blue"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => {
                      navigate(urlSlug.PROFILE);
                    }}
                  >
                    View Profile
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-blue/80" : "bg-blue"
                    } group flex w-full items-center justify-center rounded-md p-2 text-center text-sm font-semibold text-white`}
                    onClick={handleLogOut}
                  >
                    Log Out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default ProfileDropDown;
