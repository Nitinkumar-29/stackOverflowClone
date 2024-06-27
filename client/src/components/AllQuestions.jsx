import React, { useContext, useEffect } from "react";
import { Link, useNavigate, } from "react-router-dom";
import "./hideScrollbar.css";
import toast from "react-hot-toast";
import { formatTime } from "../Utils/utils";
import QuestionContext from "../Context/questions/QuestionContext";

const AllQuestions = () => {
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
    <div className="flex justify-between md:w-screen md:ml-5 lg:mx-0 lg:w-full h-full hideScrollbar overflow-y-auto pt-5">
      <div className="flex flex-col items-start w-full space-y-6">
        <div className="flex flex-col space-y-4 w-full">
          <div className="flex justify-between w-full items-center">
            <div className="text-xl md:text-3xl">All Questions</div>
            <button
              onClick={handleNavigateAskQuestion}
              className="border-2 border-gray-500 text-xs md:text-sm px-2 py-2 rounded text-center text-white"
            >
              Ask Question
            </button>
          </div>
          <div className="text-xs md:text-sm font-medium py-1 px-2 text-white border-slate-500 rounded  border-2 w-fit">
            No. of Question:{" "}
            <span className="font-normal">{questionsData.length}</span>
          </div>
        </div>
        {/* all question section */}
        <div className="flex flex-col items-start border-t-[1px] border-blue-100 space-y-2 w-full">
          {questionsData.sort()?.map((question) => {
            return (
              <div className="w-full" key={question._id}>
                <div className="border-b-[0px] border-blue-100 flex flex-col space-y-2 py-3 w-full">
                  <div className="flex flex-col space-y-1 items-start">
                    <Link
                      onClick={() => console.log(question._id)}
                      to={`/questions/${question._id}`}
                      className="text-sm md:text-base font-medium text-blue-500"
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
                    <div className="space-x-2">
                      {question.QuestionTags.map((tag, index) => {
                        return (
                          <span
                            className="text-xs md:text-sm bg-blue-100 px-2 text-blue-500 py-1 rounded"
                            key={tag[index]}
                          >
                            {tag}
                          </span>
                        );
                      })}
                    </div>
                    {question.userName && (
                      <div className="text-sm">
                        <Link
                          to="/userProfile"
                          className="font-medium text-blue-600"
                        >
                          {question?.userName}
                        </Link>{" "}
                        {""}
                        asked {formatTime(question.date)}
                      </div>
                    )}
                  </div>
                </div>
                <hr className=""></hr>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllQuestions;
