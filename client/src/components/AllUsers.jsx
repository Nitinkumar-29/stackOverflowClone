import React, { useContext, useEffect } from "react";
import AuthContext from "../Context/Authentication/AuthContext";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const AllUsers = () => {
  const { host, usersData, fetchAllUsers } = useContext(AuthContext);

  useEffect(() => {
    fetchAllUsers();
    // eslint-disable-next-line
  }, [host]);
  return (
    <div className="flex justify-center md:justify-between md:ml-5 lg:mx-0 w-full max-h-screen text-slate-500">
      <div className="grid grid-flow-row sm:grid-cols-2 md:grid-cols-3 h-fit gap-10 mt-7">
        {usersData &&
          usersData.map((user, index) => {
            return (
              <Link
                to={`/users/profile/${user._id}`}
                className="flex justify-between w-full text-sm space-x-2 border-[1px] border-slate-700 shadow-md shadow-slate-500 rounded-md p-2"
                key={index}
              >
                {user?.profileImage ? (
                  <img
                    className="w-[50px] h-[50px] rounded-md content-normal object-cover"
                    src={`${host}/${user?.profileImage?.data}`}
                    alt=""
                  />
                ) : (
                  <FaUser size={40} />
                )}
                <div className="flex flex-col flex-wrap w-full items-start justify-center h-full">
                  <span className="text-slate-300 font-semibold">
                    {user.name}
                  </span>
                  <span className="">{user.email}</span>
                </div>
                {/* <span>{user._id}</span> */}
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default AllUsers;
