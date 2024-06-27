import React, { useContext, useEffect } from "react";
import AuthContext from "../Context/Authentication/AuthContext";
import { FaUser } from "react-icons/fa";

const AllUsers = () => {
  const { host, imageHost, usersData, fetchAllUsers } = useContext(AuthContext);

  useEffect(() => {
    fetchAllUsers();
    // eslint-disable-next-line
  }, [host]);
  return (
    <div className="flex justify-center w-full md:justify-between md:w-screen md:ml-5 lg:mx-0 lg:w-full max-h-screen">
      <div className="grid grid-flow-row sm:grid-cols-2 md:grid-cols-3 h-fit gap-4 mt-7">
        {usersData &&
          usersData.map((user, index) => {
            return (
              <div
                className="flex justify-between w-full text-sm space-x-2 border-[0px] shadow-gray-300 shadow-md rounded-md p-2 border-sky-600"
                key={index}
              >
                {user?.profileImage ? (
                  <img
                    className="w-[50px] h-[50px] rounded-md content-normal object-cover"
                    src={`${imageHost}/${user?.profileImage?.data}`}
                    alt=""
                  />
                ) : (
                  <FaUser size={40}/>
                )}
                <div className="flex flex-col flex-wrap w-full items-start justify-center h-full">
                  <span className="text-blue-600 font-semibold">
                    {user.name}
                  </span>
                  <span className="">{user.email}</span>
                </div>
                {/* <span>{user._id}</span> */}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AllUsers;
