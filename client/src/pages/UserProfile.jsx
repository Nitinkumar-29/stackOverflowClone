import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCamera, FaEdit, FaMoon, FaSun } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import toast from "react-hot-toast";
import AuthContext from "../Context/Authentication/AuthContext";
import ThemeContext from "../Context/Theme/ThemeContext";
import { formatTime } from "../Utils/utils";

const UserProfile = () => {
  const { token, host, handleGetUser, loggedUserData, userAssociatedQuestion } =
    useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const ref = useRef();
  const [editUser, setEditUser] = useState(false);
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [updateUserData, setUpdateUserData] = useState({
    name: "",
    jobTitle: "",
    email: "",
    address: "",
  });
  const [uploadingImage, setUploadingImage] = useState(0);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    // show the image preview
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }

    setFile(selectedFile);
  };

  const handleSelectFile = (e) => {
    e.preventDefault();
    ref.current.click();
  };

  useEffect(() => {
    handleGetUser();
    // eslint-disable-next-line
  }, [token]);

  const handleUpload = async () => {
    // use form data to send file to the backend
    const formData = new FormData();
    formData.append("profileImage", file);

    // send the form data to the backend api endpoint
    setUploadingImage(0);
    try {
      const response = await fetch(`${host}/api/auth/uploadImage`, {
        method: "POST",
        headers: {
          "auth-token": token,
        },
        body: formData,
      });
      setUploadingImage(50);
      if (response.status >= 200 && response.status < 300) {
        toast.success("Image uploaded successfully!", {
          style: {
            color: "black",
            backgroundColor: "white",
            borderRadius: "10px",
            border: "2px solid rgb(251,146,60)",
          },
        });
        setUploadingImage(100);
        setFile(null);
        await handleGetUser();
      } else {
        setImagePreview(null);
        toast.error("Some technical issue occured", {
          style: {
            color: "black",
            backgroundColor: "white",
            borderRadius: "10px",
            border: "2px solid rgb(251,146,60)",
          },
        });
        console.error("could not process your request at this time");
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    file && handleUpload();
    // eslint-disable-next-line
  }, [file]);

  const handleDeleteUser = () => {
    toast.custom((t) =>
      ({
        duration: 6000,
      }(
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5"></div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Hey {loggedUserData.user.name}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  You won't be able to reverse this action
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={handleDeleteAccount}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Delete Account
            </button>
          </div>
        </div>
      ))
    );
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(
        `${host}/api/auth/removeUser/${loggedUserData.user._id}`,
        {
          method: "DELETE",
          headers: {
            "auth-token": token,
          },
        }
      );
      if (response.ok) {
        toast.success("Account deleted successfully!", {
          style: {
            color: "black",
            backgroundColor: "white",
            borderRadius: "10px",
            border: "2px solid rgb(251,146,60)",
          },
        });
        await localStorage.removeItem("token");
        navigate(-1);
        console.log("account deleted");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUserImage = async () => {
    try {
      const response = await fetch(
        `${host}/api/auth/removeImage/${loggedUserData.user._id}`,
        {
          method: "DELETE",
          headers: {
            "auth-token": token,
          },
        }
      );
      if (response.ok) {
        toast.success("image remove successfully!", {
          style: {
            color: "black",
            backgroundColor: "white",
            borderRadius: "10px",
            border: "2px solid rgb(251,146,60)",
          },
        });
        await handleGetUser();
        setImagePreview(null);
        setFile(null);
        console.log("image removed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onChange = (e) => {
    setUpdateUserData({ ...updateUserData, [e.target.name]: e.target.value });
  };

  // update user info
  const handleUpdateInfo = async () => {
    try {
      const response = await fetch(`${host}/api/auth/updateUserInfo`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(updateUserData),
      });
      if (!response.ok) {
        console.log(response);
      }
      const data = await response.json();
      console.log(data);
      toast.success("Updated!");
      setEditUser(false);
      handleGetUser();
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  };

  return (
    <>
      <div
        // style={{ height: "calc(100vh - 74px)" }}
        className={`flex justify-center w-full ${
          theme === "dark"
            ? " bg-slate-950 text-slate-500"
            : "bg-gradient-to-bl from-red-100 via-violet-200 to-green-100 text-black h-full"
        } `}
      >
        <div className="flex flex-col justify-center w-full lg:w-[90%] h-fit space-y-5 p-3 lg:py-6">
          <div className="flex flex-col items-center lg:flex-row shadow-md shadow-slate-600 border-[1px] border-slate-700 rounded-md lg:h-[30%] w-full">
            {/* user image */}
            <div className="flex items-center h-fit lg:w-[25%] p-4">
              {!loggedUserData?.user?.profileImage?.data && (
                <div className="w-fit space-y-3 p-2">
                  {!imagePreview && (
                    <input
                      ref={ref}
                      type="file"
                      accept="image/*"
                      name="profileImage"
                      className="hidden w-fit"
                      onChange={handleFileChange}
                    />
                  )}
                  {!imagePreview && (
                    <span
                      onClick={handleSelectFile}
                      className="cursor-pointer w-[80px] lg:w-[120px] rounded-full h-[80px] lg:h-[120px] border-[1px] border-slate-700 flex items-center justify-center"
                    >
                      <FaCamera />
                    </span>
                  )}
                  <div className="flex flex-col items-center">
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt=""
                        className="w-[80px] h-[80px] rounded-full object-cover"
                      />
                    )}
                    {imagePreview && (
                      <span className="text-center">{uploadingImage} </span>
                    )}
                  </div>
                </div>
              )}
              {loggedUserData?.user?.profileImage?.data && (
                <div className="relative h-fit w-fit rounded-full shadow-md shadow-slate-500 border-2">
                  <img
                    className="w-[80px] h-[80px] lg:w-[120px] lg:h-[120px] rounded-full"
                    src={`${host}/${loggedUserData?.user?.profileImage?.data}`}
                    alt="try reloading"
                  />
                  <span className="cursor-pointer absolute top-[72%] right-[5%]  p-1 rounded-full bg-slate-400">
                    <AiFillDelete
                      color="black"
                      size={20}
                      onClick={handleDeleteUserImage}
                    />
                  </span>
                </div>
              )}
            </div>
            {loggedUserData?.user && (
              <div className="flex flex-col space-y-5 lg:space-y-0 md:flex-row justify-between lg:items-end lg:w-full items-end pb-5 md:space-x-4 lg:space-x-0 md:w-fit">
                <div
                  className={`flex flex-col md:space-y-2 ${
                    theme === "dark" ? "text-slate-300" : "text-red-600"
                  }`}
                >
                  <span className="lg:text-5xl font-semibold">
                    {loggedUserData.user.name}
                  </span>
                  <span className="lg:text-xl">
                    {loggedUserData.user.email}
                  </span>
                </div>
                <div className="flex flex-col lg:flex-row  space-y-2 lg:space-y-0 lg:space-x-4 px-4 w-full md:w-fit">
                  <button
                    onClick={handleDeleteUser}
                    className="flex items-center w-full lg:w-fit p-2 border-[1px] border-slate-700 h-fit rounded-md"
                  >
                    <AiFillDelete className="mt-[2.5px] mx-2"></AiFillDelete>
                    Delete Account
                  </button>
                  <button
                    onClick={() => {
                      if (token) {
                        localStorage.removeItem("token");
                        navigate("/welcome");
                      }
                    }}
                    className="flex items-center w-full lg:w-fit p-2 border-[1px] border-slate-700 h-fit rounded-md"
                  >
                    <AiFillDelete className="mt-[2.5px] mx-2"></AiFillDelete>
                    LogOut
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col lg:flex-row justify-between w-full space-y-4 lg:space-y-0 lg:space-x-4 md:h-[60%] lg:h-full">
            <div className="flex flex-col space-y-8 shadow-md shadow-slate-600 rounded-md border-[1px] border-gray-700 h-full lg:h-[62vh] lg:w-1/2 p-4">
              <div className="flex justify-between w-full">
                <span className="flex w-fit px-4 py-2 border-[1px] border-slate-700 h-fit lg:h-full rounded-md">
                  Basic Information
                </span>
                <button
                  onClick={() => {
                    if (!editUser) {
                      setEditUser(true);
                    } else {
                      setEditUser(false);
                    }
                  }}
                  className={`flex w-fit px-4 py-2 border-[1px] border-slate-700 h-fit rounded-md hover:${
                    theme === "dark" ? "text-white" : "text-red-600"
                  } duration-200`}
                >
                  <FaEdit size={20} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-fit w-full">
                <div className="w-full">
                  {!editUser ? (
                    <div className="w-full py-2 px-2 rounded-md border-[1px] border-slate-700">
                      {loggedUserData?.user?.jobTitle
                        ? `${loggedUserData.user.jobTitle
                            .charAt(0)
                            .toUpperCase()}${loggedUserData.user.jobTitle.slice(
                            1
                          )}`
                        : "Not mentioned"}
                    </div>
                  ) : (
                    <input
                      type="text"
                      placeholder="Job Title"
                      name="jobTitle"
                      required
                      onChange={onChange}
                      value={updateUserData.jobTitle}
                      className={`bg-inherit w-full focus:outline-none py-2 px-2  focus:border-white border-b-[1px] border-slate-600 ${
                        theme === "dark"
                          ? "placeholder:text-slate-500"
                          : "placeholder:text-red-700"
                      }`}
                    />
                  )}
                </div>
                <div className="w-full">
                  {!editUser ? (
                    <div className="w-full py-2 px-2 rounded-md border-[1px] border-slate-700">
                      {loggedUserData?.user?.name
                        ? `${loggedUserData.user.name}`
                        : "Not mentioned"}
                    </div>
                  ) : (
                    <input
                      type="text"
                      placeholder="Name"
                      name="name"
                      required
                      onChange={onChange}
                      value={updateUserData.name}
                      className={`bg-inherit w-full focus:outline-none py-2 px-2 focus:border-white border-b-[1px] border-slate-600 ${
                        theme === "dark"
                          ? "placeholder:text-slate-500"
                          : "placeholder:text-red-700"
                      }`}
                    />
                  )}
                </div>
                <div className="w-full">
                  {!editUser ? (
                    <div className="w-full py-2 px-2 rounded-md border-[1px] border-slate-700">
                      {loggedUserData?.user?.email
                        ? `${loggedUserData.user.email}`
                        : "Not mentioned"}
                    </div>
                  ) : (
                    <input
                      type="text"
                      placeholder="Email"
                      name="email"
                      required
                      onChange={onChange}
                      value={updateUserData.email}
                      className={`bg-inherit w-full focus:outline-none py-2 px-2 focus:border-white border-b-[1px] border-slate-600 ${
                        theme === "dark"
                          ? "placeholder:text-slate-500"
                          : "placeholder:text-red-700"
                      }`}
                    />
                  )}
                </div>
                <div className="w-full">
                  {!editUser ? (
                    <div className="w-full py-2 px-2 rounded-md border-[1px] border-slate-700">
                      {loggedUserData?.user?.address
                        ? `${loggedUserData.user.address}`
                        : "Not mentioned"}
                    </div>
                  ) : (
                    <input
                      type="text"
                      placeholder="Address"
                      name="address"
                      required
                      value={updateUserData.address}
                      onChange={onChange}
                      className={`bg-inherit w-full focus:outline-none py-2 px-2 focus:placeholder:text-white focus:border-white border-b-[1px] border-slate-600 ${
                        theme === "dark"
                          ? "placeholder:text-slate-500"
                          : "placeholder:text-red-700"
                      }`}
                    />
                  )}
                </div>
              </div>
              {editUser && (
                <div className="flex justify-end w-full space-x-4 h-fit rounded-md">
                  <button
                    onClick={() => {
                      if (!editUser) {
                        setEditUser(true);
                      } else {
                        setEditUser(false);
                      }
                    }}
                    className="flex w-fit px-4 py-2 hover:text-white duration-200 border-[1px] border-slate-700 h-fit rounded-md"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleUpdateInfo}
                    className="flex w-fit px-4 py-2 hover:text-white duration-200 border-[1px] border-slate-700 h-fit rounded-md"
                  >
                    Update
                  </button>
                </div>
              )}
            </div>
            <div className="shadow-md shadow-slate-600 rounded-md border-[1px] border-gray-700 h-full lg:w-1/2 p-4">
              <span className="flex w-fit px-4 py-2 border-[1px] border-slate-700 h-fit rounded-md">
                User Activity
              </span>
              <div className="mt-3">
                <span className="flex w-fit px-4 py-2 border-[1px] border-slate-700 h-fit rounded-md">
                  Questions
                </span>{" "}
                {userAssociatedQuestion?.length > 0 ? (
                  <div className="py-5 space-y-5 overflow-y-auto hideScrollbar">
                    {userAssociatedQuestion?.map((question, index) => (
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
                    ))}
                  </div>
                ) : (
                  <span className="flex w-full justify-center my-3">
                    No data available
                  </span>
                )}
              </div>
              <div className="mt-3">
                <span className="flex w-fit px-4 py-2 border-[1px] border-slate-700 h-fit rounded-md">
                  These are the answers for some questions you have answered
                </span>{" "}
                {loggedUserData.associatedQuestionAnswers?.length > 0 ? (
                  <div className="py-5 space-y-5 overflow-y-auto hideScrollbar">
                    {loggedUserData?.associatedQuestionAnswers?.map(
                      (answer, index) => (
                        <div key={index}>
                          <div className="flex flex-col space-y-3 p-3 rounded-md w-full shadow-md shadow-slate-500 border-[1px] border-slate-700">
                            <div className="flex flex-col space-y-1 items-start">
                              <Link
                                onClick={() => console.log(answer.questionId)}
                                to={`/questions/${answer.questionId}`}
                                className={`text-sm md:text-base font-medium ${
                                  theme === "dark" ? "text-slate-300" : ""
                                }`}
                              >
                                {answer.answerBody}
                              </Link>
                              <p className="text-xs md:text-sm">
                                {answer.answerBody.length > 340
                                  ? `${answer.QuestionDetails.slice(0, 340)}...`
                                  : answer.QuestionDetails}
                              </p>
                            </div>
                            <div className="flex flex-col space-y-3">
                              <div className="text-sm">
                                {formatTime(answer.date)}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
