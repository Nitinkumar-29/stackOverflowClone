import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCamera, FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import toast from "react-hot-toast";
import AuthContext from "../Context/Authentication/AuthContext";

const UserProfile = () => {
  const { token, host, imageHost, handleGetUser, loggedUserData } =
    useContext(AuthContext);
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
      <div className="flex justify-center w-full bg-slate-950 max-h-screen h-[89.15vh] text-gray-400">
        <div className="lg:w-[90%] h-full py-8 space-y-5">
          <div className="flex shadow-md shadow-slate-600 border-[1px] border-slate-700 rounded-md h-[30%] w-full">
            {/* user image */}
            <div className="flex items-center h-full w-[25%] p-4">
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
                      className="cursor-pointer w-[120px] rounded-full h-[120px] border-2 border-gray-800 flex items-center justify-center"
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
                <div className="relative h-fit rounded-full shadow-md shadow-gray-200 border-2">
                  <img
                    className="w-[120px] h-[120px] rounded-full"
                    src={`${imageHost}/${loggedUserData?.user?.profileImage?.data}`}
                    alt=""
                  />
                  <span className="cursor-pointer absolute top-[72%] right-[5%]  p-1 rounded-full bg-slate-200">
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
              <div className="flex justify-between items-end pb-5 w-[75%]">
                <div className="flex flex-col space-y-2 text-gray-200">
                  <span className="text-5xl font-semibold">
                    {loggedUserData.user.name}
                  </span>
                  <span className="text-xl">{loggedUserData.user.email}</span>
                </div>
                <div className="flex space-x-4 px-4">
                  <button
                    onClick={handleDeleteUser}
                    className="flex w-fit px-4 py-2 border-[1px] border-slate-700 h-fit rounded-md"
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
                    className="flex w-fit px-4 py-2 border-[1px] border-slate-700 h-fit rounded-md"
                  >
                    <AiFillDelete className="mt-[2.5px] mx-2"></AiFillDelete>
                    LogOut
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-between w-full space-x-4 h-[70%]">
            <div className="flex flex-col space-y-8 shadow-md shadow-slate-600 rounded-md border-[1px] border-gray-700 h-full w-1/2 p-4">
              <div className="flex justify-between w-full">
                <span className="flex w-fit px-4 py-2 border-[1px] border-slate-700 h-fit rounded-md">
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
                  className="flex w-fit px-4 py-2 border-[1px] border-slate-700 h-fit rounded-md hover:text-white duration-200"
                >
                  <FaEdit size={20} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-8 h-fit w-full text-slate-500">
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
                      className="bg-inherit w-full focus:outline-none py-2 px-2 focus:placeholder:text-white focus:border-white border-b-[1px] border-slate-600 placeholder:text-slate-500"
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
                      className="bg-inherit w-full focus:outline-none py-2 px-2 focus:placeholder:text-white focus:border-white border-b-[1px] border-slate-600  placeholder:text-slate-500"
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
                      className="bg-inherit w-full focus:outline-none py-2 px-2 focus:placeholder:text-white focus:border-white border-b-[1px] border-slate-600  placeholder:text-slate-500"
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
                      className="bg-inherit w-full focus:outline-none py-2 px-2 focus:placeholder:text-white focus:border-white border-b-[1px] border-slate-600  placeholder:text-slate-500"
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
            <div className="shadow-md shadow-slate-600 rounded-md border-[1px] border-gray-700 h-full w-1/2 p-4">
              <span className="flex w-fit px-4 py-2 border-[1px] border-slate-700 h-fit rounded-md">
                User Activity
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
