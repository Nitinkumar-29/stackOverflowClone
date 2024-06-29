import React, { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import "./hideScrollbar.css";
import { BiCopy, BiSolidDownvote, BiSolidUpvote } from "react-icons/bi";
import { formatTime } from "../Utils/utils";
import QuestionContext from "../Context/questions/QuestionContext";
import ThemeContext from "../Context/Theme/ThemeContext";

const ParticularQuestion = () => {
  const {
    particularQuestionData,
    fetchQuestionData,
    voteUp,
    fetchTotalVotes,
    voteCount,
    fetchQuestionAnswers,
    fetchQuestionAnswer,
    postQuestionAnswer,
    postQuestionAnswerData,
    setPostQuestionAnswerData,
    voteDown,
  } = useContext(QuestionContext);
  const { id } = useParams();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    fetchQuestionData(id);
    // eslint-disable-next-line
  }, [id]);

  const handleVoteUp = async () => {
    voteUp(id);
  };

  const handleVoteDown = () => {
    voteDown(id);
  };

  useEffect(() => {
    fetchTotalVotes(id);
    // eslint-disable-next-line
  }, [id]);

  const onChange = (e) => {
    setPostQuestionAnswerData({
      ...postQuestionAnswerData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePostQuestionAnswer = () => {
    postQuestionAnswer(id);
  };

  useEffect(() => {
    console.log(id);
    fetchQuestionAnswers(id);
    // eslint-disable-next-line
  }, [id]);

  return (
    <div
      className={`flex justify-between md:w-screen md:ml-5 lg:mx-0 w-[95%] mx-auto h-full lg:w-full py-3`}
    >
      <div className="flex flex-col w-full hideScrollbar overflow-y-scroll">
        <div className="flex flex-col w-full space-y-3">
          <div className="flex items-center justify-between space-x-1 w-full">
            <div
              className={`mt-2 lg:mt-0 text-base lg:text-xl ${
                theme === "dark" ? "text-slate-300" : "text-red-600"
              } font-medium`}
            >
              {particularQuestionData?.QuestionTitle}
            </div>
            <span
              className="cursor-pointer text-slate-500 hover:text-white duration-200"
              onClick={() => {
                const fullUrl = window.location.href;
                navigator.clipboard
                  .writeText(fullUrl)
                  .then(() => {
                    toast.success("link copied");
                  })
                  .catch((err) => {
                    console.error("Failed to copy URL: ", err);
                  });
              }}
            >
              <BiCopy size={25} />
            </span>
          </div>
          <div className="flex flex-row flex-wrap w-full justify-start items-center">
            <span className="text-gray-400">asked by &nbsp; </span>
            <Link
              to={`/users/profile/${particularQuestionData.user}`}
              className="text-blue-500 font-medium text-base"
            >
              {particularQuestionData?.userName} &nbsp;
            </Link>
            <span className="text-gray-500">
              {formatTime(particularQuestionData?.date)}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-start w-full text-gray-500 space-x-4 my-3">
          {particularQuestionData?.QuestionDetails && (
            <div className="flex flex-col justify-center items-center space-y-1 mt-2">
              <span
                onClick={handleVoteUp}
                className={`border-[1px] hover:bg-gray-100  cursor-pointer border-black rounded-full p-2`}
              >
                <BiSolidUpvote />
              </span>
              <span className="font-bold text-lg">{voteCount}</span>
              <span
                onClick={handleVoteDown}
                className={`border-[1px] hover:bg-gray-100  cursor-pointer border-black rounded-full p-2`}
              >
                <BiSolidDownvote />
              </span>
            </div>
          )}
          <div className="flex flex-col space-y-2 h-full w-full">
            <p className="text-base text-slate-700">
              {particularQuestionData?.QuestionDetails}
            </p>
            {/* tags and other data */}
            <div className="flex gap-2 flex-wrap">
              {particularQuestionData?.QuestionTags &&
                particularQuestionData?.QuestionTags.map((tag, index) => {
                  return (
                    <div className="flex" key={index}>
                      <span className="text-xs bg-inherit border-[1px] border-slate-700 text-slate-500 px-2 py-1 rounded md:text-sm">
                        {tag}
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        {/* question's answers */}
        <div>
          <div className="flex space-x-1 items-center">
            <span className="font-medium text-lg">
              {fetchQuestionAnswer.answers &&
                fetchQuestionAnswer.answers.length}
            </span>
            <span className="text-base text-gray-500 md:text-lg font-medium">
              {fetchQuestionAnswer.answers
                ? fetchQuestionAnswer.answers.length > 1
                  ? "Answers"
                  : "Answer"
                : "No one answered yet😢"}
            </span>
          </div>
          <div className="flex flex-col space-y-4">
            {fetchQuestionAnswer.answers &&
              fetchQuestionAnswer.answers.map((answer, index) => {
                return (
                  <div
                    className="flex flex-col border-b-[1px] border-slate-700 pb-2 space-y-2"
                    key={index}
                  >
                    <span className="text-slate-700">{answer.answerBody}</span>
                    <div className="flex items-center flex-wrap ">
                      <div className="text-sm">
                        answered by &nbsp;
                        <span className="font-medium text-blue-500">
                          {answer.userName}
                        </span>
                      </div>
                      <div className="text-sm text-gray-400">
                        <span className="text-black">
                          &nbsp; {formatTime(answer.date)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="flex flex-col space-y-6 mt-4 pb-5">
          <div className="flex flex-col items-start space-y-2 pb-10 w-full">
            <span className="text-base ">Your answer</span>
            <textarea
              className={`w-full focus:outline-none bg-inherit border-[1px] ${
                theme === "dark"
                  ? "placeholder:text-slate-500"
                  : "placeholder:text-black"
              } placeholder:text-sm md:placeholder:text-lg border-slate-700 rounded p-2`}
              type="text"
              name="answerBody"
              onChange={onChange}
              value={
                postQuestionAnswerData.answerBody.charAt(0).toUpperCase() +
                postQuestionAnswerData.answerBody.slice(1)
              }
              placeholder="Type Here"
            ></textarea>
            <button
              className="w-fit text-lg px-4 py-2 rounded-md border-[1px] border-slate-700"
              onClick={handlePostQuestionAnswer}
            >
              Post Answer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticularQuestion;
