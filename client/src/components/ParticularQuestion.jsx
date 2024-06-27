import React, { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import "./hideScrollbar.css";
import { BiCopy, BiSolidDownvote, BiSolidUpvote } from "react-icons/bi";
import { QuestionContext } from "../Context/questions/QuestionContext";
import { formatTime } from "../Utils/utils";

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
      className={`flex justify-between md:w-screen md:ml-5 lg:mx-0 lg:w-full h-[88vh] py-6`}
    >
      <div className="flex flex-col w-full pr-4">
        <div className="flex flex-col w-full space-y-3">
          <div className="flex flex-col-reverse lg:flex-row justify-between items-start h-fit w-full ">
            <span className="mt-2 lg:mt-0 text-base lg:text-xl md:w-[83%] text-blue-500 font-medium">
              {particularQuestionData?.QuestionTitle}
            </span>
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
          <div className="flex flex-col md:flex-row w-full justify-start items-center">
            <span className="text-gray-400">asked by &nbsp; </span>
            <Link
              to={`/userProfile/${particularQuestionData.user}`}
              className="text-blue-500 font-medium text-base"
            >
              {particularQuestionData?.userName} &nbsp;
            </Link>
            <span className="text-gray-500">
              {formatTime(particularQuestionData?.date)}
            </span>
          </div>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between w-full text-gray-500 space-x-4 mb-2">
          {particularQuestionData?.QuestionDetails && (
            <div className="flex flex-col justify-center items-center space-y-1">
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
            <p className="text-sm lg:text-base">
              {particularQuestionData?.QuestionDetails}
            </p>
            {/* tags and other data */}
            <div className="flex space-x-2">
              {particularQuestionData?.QuestionTags &&
                particularQuestionData?.QuestionTags.map((tag, index) => {
                  return (
                    <div className="flex" key={index}>
                      <span className="text-xs bg-blue-100 text-blue-500 px-2 py-1 rounded md:text-sm">
                        {tag}
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <hr className="my-1" />
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
                    className="flex flex-col border-b-[1px] border-gray-100 pb-2 space-y-2"
                    key={index}
                  >
                    <span className="">{answer.answerBody}</span>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-400">
                        answered on{" "}
                        <span className="text-black">
                          {formatTime(answer.date)}
                        </span>
                      </div>
                      <div className="text-sm">
                        by{" "}
                        <span className="font-medium text-blue-500">
                          {answer.userName}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="flex flex-col text-gray-500 space-y-6 mt-4">
          <div className="flex flex-col items-start space-y-2 pb-10 w-full">
            <span className="text-base md:text-lg">Your answer</span>
            <textarea
              className="w-full focus:placeholder:outline-none bg-inherit border-[1px] placeholder:text-sm md:placeholder:text-lg border-gray-400 rounded py-2 px-4"
              type="text"
              name="answerBody"
              onChange={onChange}
              value={postQuestionAnswerData.answerBody}
              placeholder="Write your answer here for above asked question"
            ></textarea>
            <button
              className="text-sm md:text-base bg-sky-600 border-sky-700 border-[1px] rounded px-4 py-1 text-white"
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
