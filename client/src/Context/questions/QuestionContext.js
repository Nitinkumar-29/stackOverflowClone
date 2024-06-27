import { createContext, useState } from "react";
import toast from "react-hot-toast";
export const QuestionContext = createContext();

export const QuestionState = ({ children }) => {
  const [questionsData, setQuestionsData] = useState([]);
  const [particularQuestionData, setParticularQuestionData] = useState([]);
  const token = localStorage.getItem("token");
  const [voteCount, setVoteCount] = useState(0);
  const [fetchQuestionAnswer, setFetchQuestionAnswer] = useState([]);
  const [postQuestionAnswerData, setPostQuestionAnswerData] = useState({
    answerBody: "",
  });
  // const host = "http://localhost:8000";
  const host = "https://stackoverflowclone-backend.vercel.app";

  const fetchAllQuestions = async () => {
    try {
      const response = await fetch(`${host}/api/questions/fetchQuestions`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        const sortedQuestions = data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setQuestionsData(sortedQuestions);
      } else {
        console.error("some error occured");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchQuestionData = async (id) => {
    try {
      const response = await fetch(`${host}/api/questions/question/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setParticularQuestionData(data);
      }
    } catch (error) {
      console.error("Error fetching question data:", error);
    }
  };

  const voteUp = async (id) => {
    console.log(id);
    try {
      if (token) {
        const response = await fetch(
          `${host}/api/questions/question/upVote/${id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
          }
        );

        if (response.ok) {
          await fetchTotalVotes(id);
          await fetchQuestionData(id);
        } else {
          console.log(response);
        }
      } else {
        toast("Login first to vote", {
          color: "black",
          backgroundColor: "white",
          borderRadius: "10px",
          border: "2px solid rgb(251,146,60)",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const voteDown = async (id) => {
    try {
      if (token) {
        const response = await fetch(
          `${host}/api/questions/question/downVote/${id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
          }
        );
        if (!response.ok) {
          console.log(response);
        } else {
          await fetchTotalVotes(id);
          await fetchQuestionData(id);
        }
      } else {
        toast("Login first to vote", {
          color: "black",
          backgroundColor: "white",
          borderRadius: "10px",
          border: "2px solid rgb(251,146,60)",
        });
      }
    } catch (error) {
      console.error("error:", error);
    }
  };

  const fetchTotalVotes = async (id) => {
    const response = await fetch(
      `${host}/api/questions/question/getVotes/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setVoteCount(data.totalVotes);
    }
  };

  const fetchQuestionAnswers = async (id) => {
    try {
      const response = await fetch(
        `${host}/api/questions/question/getAnswer/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setFetchQuestionAnswer(data);
      } else {
        console.log("no answer available");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const postQuestionAnswer = async (id) => {
    if (token) {
      const { answerBody } = postQuestionAnswerData;
      try {
        const response = await fetch(
          `${host}/api/questions/question/answer/${id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
            body: JSON.stringify({
              answerBody,
            }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          toast.success("Answer posted successfully", {
            color: "black",
            backgroundColor: "white",
            borderRadius: "3px",
            border: "2px solid rgb(251,146,60)",
          });
          setPostQuestionAnswerData({
            answerBody: "",
          });
          await fetchQuestionAnswers(id);
        } else {
          console.log("could not post answer");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      toast("Login to continue", {
        color: "black",
        backgroundColor: "white",
        borderRadius: "10px",
        border: "2px solid rgb(251,146,60)",
      });
    }
  };

  return (
    <>
      <QuestionContext.Provider
        value={{
          fetchAllQuestions,
          fetchQuestionData,
          fetchQuestionAnswers,
          postQuestionAnswer,
          postQuestionAnswerData,
          setPostQuestionAnswerData,
          fetchQuestionAnswer,
          particularQuestionData,
          questionsData,
          token,
          host,
          fetchTotalVotes,
          voteCount,
          voteUp,
          voteDown,
        }}
      >
        {children}
      </QuestionContext.Provider>
    </>
  );
};
