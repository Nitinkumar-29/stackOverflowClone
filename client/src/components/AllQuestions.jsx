import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./hideScrollbar.css";
import toast from "react-hot-toast";
import { formatTime } from "../Utils/utils";
import QuestionContext from "../Context/questions/QuestionContext";
import ThemeContext from "../Context/Theme/ThemeContext";
import { TbPencilQuestion } from "react-icons/tb";

const AllQuestions = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { fetchAllQuestions, questionsData, token } =
    useContext(QuestionContext);
  const handleNavigateAskQuestion = () => {
    if (token) {
      navigate("/askQuestion");
    } else {
      toast("Login to continue", {
        color: "black",
        backgroundColor: "white",
        borderRadius: "10px",
        border: "2px solid rgb(251,146,60)",
      });
      navigate("/login");
    }
  };
  useEffect(() => {
    fetchAllQuestions();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex justify-between md:ml-5 lg:mx-0 sm:w-5/6 mx-auto md:w-[95%] h-full  p-3">
      <div className="flex flex-col items-start w-full space-y-2">
        <div className="flex justify-between w-full items-center">
          <div className="flex items-center md:text-3xl">
            Questions: {questionsData.length}
          </div>
          <button
            onClick={handleNavigateAskQuestion}
            className={`w-fit ${
              theme === "dark" ? "hover:text-slate-200" : "hover:text-black"
            } px-4 py-2 rounded-md border-[1px] border-slate-700`}
          >
            <TbPencilQuestion />
          </button>
        </div>
        {/* all question section */}
        <div className="flex flex-col items-start space-y-5 rounded-md w-full py-4 hideScrollbar overflow-y-scroll">
          {questionsData.sort()?.map((question) => {
            return (
              <div
                className="w-full h-full rounded-md border-[1px] border-slate-500 shadow-md hover:shadow-slate-500"
                key={question._id}
              >
                <div className="flex flex-col space-y-3 p-3 w-full">
                  <div className="flex flex-col space-y-1 items-start">
                    <Link
                      onClick={() => console.log(question._id)}
                      to={`/questions/${question._id}`}
                      className={`text-sm md:text-base font-medium ${
                        theme === "dark" ? "text-slate-300" : "text-red-700"
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
                  <div className="flex flex-col md:flex-row justify-between space-y-2 md:space-x-2">
                    <div className="flex flex-wrap gap-3">
                      {question.QuestionTags.map((tag, index) => {
                        return (
                          <span
                            className="text-sm border-[1px] border-slate-700 px-2 text-slate-500 py-1 rounded"
                            key={tag}
                          >
                            {tag}
                          </span>
                        );
                      })}
                    </div>
                    {question.userName && (
                      <div className="text-sm">
                        asked by &nbsp;
                        <Link
                          to={`/users/profile/${question.user}`}
                          className="font-medium text-blue-600"
                        >
                          {question?.userName}
                        </Link>
                        ,&nbsp;{formatTime(question.date)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllQuestions;
