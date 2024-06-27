import { createContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const token = localStorage.getItem("token");
  const [usersData, setUsersData] = useState([]);
  const [loggedUserData, setLoggedUserData] = useState([]);
  const [otherUsersProfileData, setOtherUsersProfileData] = useState([]);
  // const host = "http://localhost:8000";
  const host = "https://techaid-backend.vercel.app"
  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await fetch(`${host}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        localStorage.setItem("token", data.authToken);
        setCredentials({ email: "", password: "" });
        navigate("/questions");
        toast.success("Logged in successfully!", {
          style: {
            color: "black",
            backgroundColor: "white",
            borderRadius: "10px",
            border: "2px solid rgb(251,146,60)",
          },
        });
      } else {
        console.error("password incorrect");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetUser = async () => {
    const response = await fetch(`${host}/api/auth/getUser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setLoggedUserData(data);
      console.log(loggedUserData);
      localStorage.setItem("loggedInUserData", data);
      console.log(
        "local",
        JSON.stringify(localStorage.getItem("loggedInUserData"))
      );
    }
  };
  const fetchAllUsers = async () => {
    const response = await fetch(`${host}/api/auth/getAllUsers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setUsersData(data);
    }
  };

  // other usesr profile
  const handleOtherGetUsersProfile = async (id) => {
    const response = await fetch(`${host}/api/auth/users/profile/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.log(response);
    }
    const data = await response.json();
    toast.success("fetched");
    console.log(data);
    setOtherUsersProfileData(data);
  };

  return (
    <AuthContext.Provider
      value={{
        setCredentials,
        credentials,
        login,
        token,
        host,
        handleGetUser,
        usersData,
        loggedUserData,
        fetchAllUsers,
        navigate,
        handleOtherGetUsersProfile,
        otherUsersProfileData,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
