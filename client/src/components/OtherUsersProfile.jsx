import React, { useContext, useEffect } from "react";
import AuthContext from "../Context/Authentication/AuthContext";
import { Link, useParams } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { formatTime } from "../Utils/utils";
import ThemeContext from "../Context/Theme/ThemeContext";
import "./hideScrollbar.css";

const OtherUsersProfile = () => {
  const { handleOtherGetUsersProfile, host, otherUsersProfileData } =
    useContext(AuthContext);
  const { id } = useParams();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    handleOtherGetUsersProfile(id);
    // eslint-disable-next-line
  }, [id]);

  return (
    <>
      <div className="flex flex-col lg:flex-row p-5  space-y-5 lg:space-y-0 h-[82vh] w-full sm:w-5/6 mx-auto lg:w-[95%] lg:space-x-6 overflow-y-auto">
        <div className="flex flex-col space-y-4  rounded-md  h-full w-full py-5">
          {otherUsersProfileData?.user?.profileImage?.data && (
            <div className="flex items-center mx-auto p-4">
              {otherUsersProfileData.user?.profileImage?.data ? (
                <img
                  className="w-[80px] lg:w-[120px] h-[80px] lg:h-[120px] rounded-full"
                  src={`${host}/${otherUsersProfileData.user.profileImage.data}`}
                  alt="Profile"
                />
              ) : (
                <FaUser size={120} />
              )}
            </div>
          )}
          <div className="flex justify-between w-full">
            <span className="w-full text-center text-lg px-4 py-2 border-[1px] border-slate-700 h-fit rounded-md">
              Basic Information
            </span>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 h-fit w-full text-slate-500">
            {otherUsersProfileData?.user?.jobTitle && (
              <div className="w-full py-2 px-2 rounded-md border-[1px] border-slate-700">
                {otherUsersProfileData?.user?.jobTitle &&
                  `${otherUsersProfileData.user.jobTitle
                    .charAt(0)
                    .toUpperCase()}${otherUsersProfileData.user.jobTitle.slice(
                    1
                  )}`}
              </div>
            )}
            {otherUsersProfileData?.user?.name && (
              <div className="w-full py-2 px-2 rounded-md border-[1px] border-slate-700">
                {otherUsersProfileData?.user?.name &&
                  otherUsersProfileData.user.name}
              </div>
            )}
            {otherUsersProfileData?.user?.email && (
              <Link
                to={`mailto:${otherUsersProfileData.user.email}`}
                className="w-full py-2 px-2 rounded-md border-[1px] text-sky-400 border-slate-700"
              >
                {otherUsersProfileData?.user?.email &&
                  otherUsersProfileData.user.email}
              </Link>
            )}
            {otherUsersProfileData?.user?.address && (
              <div className="w-full py-2 px-2 rounded-md border-[1px] border-slate-700">
                {otherUsersProfileData?.user?.address &&
                  otherUsersProfileData.user.address}
              </div>
            )}
            {otherUsersProfileData?.user?.website && (
              <div className="w-full py-2 px-2 rounded-md border-[1px] border-slate-700">
                {otherUsersProfileData?.user?.website &&
                  otherUsersProfileData.user.website}
              </div>
            )}
          </div>
        </div>
        <div className=" rounded-md h-full w-full py-5">
          <span className="flex w-full justify-center lg:w-fit px-4 py-2 border-[1px] border-slate-700 h-fit rounded-md">
            User Activity
          </span>
          {otherUsersProfileData?.associatedQuestion?.length > 0 ? (
            <div className="py-5 space-y-5">
              {otherUsersProfileData?.associatedQuestion?.map(
                (question, index) => (
                  <div key={index}>
                    <div className="flex flex-col space-y-3 p-3 rounded-md w-full shadow-md shadow-slate-500 border-[1px] border-slate-700">
                      <div className="flex flex-col space-y-1 items-start">
                        <Link
                          onClick={() => console.log(question._id)}
                          to={`/questions/${question._id}`}
                          className={`text-sm md:text-base font-medium ${
                            theme === "dark" ? "text-slate-300" : ""
                          }`}
                        >
                          {question.QuestionTitle}
                        </Link>
                        <p className="text-xs md:text-sm">
                          {question.QuestionDetails.length > 340
                            ? `${question.QuestionDetails.slice(0, 340)}...`
                            : question.QuestionDetails}
                        </p>
                      </div>
                      <div className="flex flex-col space-y-3">
                        <div className="flex flex-wrap gap-3">
                          {question.QuestionTags.map((tag, index) => {
                            return (
                              <span
                                className="text-xs md:text-sm border-[1px] border-slate-700 px-2 text-slate-500 py-1 rounded"
                                key={tag}
                              >
                                {tag}
                              </span>
                            );
                          })}
                        </div>
                        <div className="text-sm">
                          {formatTime(question.date)}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          ) : (
            <span className="flex w-full justify-center my-3">
              No data available
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default OtherUsersProfile;
