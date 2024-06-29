import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import QuestionContext from "../Context/questions/QuestionContext";
import ThemeContext from "../Context/Theme/ThemeContext";
const AskQuestion = () => {
  const [writeQuestion, setWriteQuestion] = useState({
    QuestionTitle: "",
    QuestionDetails: "",
    QuestionTags: [],
  });
  const { theme } = useContext(ThemeContext);

  const { host } = useContext(QuestionContext);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const onChange = (e) => {
    setWriteQuestion({ ...writeQuestion, [e.target.name]: e.target.value });
  };

  const handlePostQuestion = async (e) => {
    e.preventDefault();
    const { QuestionTitle, QuestionDetails, QuestionTags } = writeQuestion;
    try {
      const response = await fetch(`${host}/api/questions/askQuestion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },

        body: JSON.stringify({
          QuestionTitle,
          QuestionDetails,
          QuestionTags,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);

        toast.success("success", "Question posted successfully", {
          style: {
            color: "black",
            backgroundColor: "white",
            borderRadius: "10px",
            border: "2px solid rgb(251,146,60)",
          },
        });
        navigate("/questions");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        className={`flex justify-center w-full h-full ${
          theme === "dark"
            ? " bg-slate-950 text-slate-500"
            : "bg-gradient-to-bl from-red-100 via-violet-200 to-green-100 text-black"
        }`}
      >
        <div className="flex flex-col mx-auto justify-center items-center space-y-10 h-full m-8 w-[90%]">
          <span className="font-bold text-2xl lg:text-3xl w-fit mx-auto">
            Ask a public question
          </span>
          <div className="flex flex-col items-start h-full w-full space-y-10">
            {/* instruction to write a good question */}
            <div className="text-sm bg-inherit border-[1px] mx-auto rounded-md border-slate-700 lg:h-[35vh] md:w-[70%] p-5 space-y-2">
              <span className="text-xl">Writing a good question</span>
              <div className="space-y-2">
                <div className="flex flex-col">
                  <p>
                    You're ready to <span className="text-sky-500">ask</span> a{" "}
                    <span className="text-sky-500">
                      programming-related question
                    </span>{" "}
                    and this form will help guide you through the process.
                  </p>
                  <p>
                    Looking to ask a non-programming question? See{" "}
                    <span className="text-sky-500">the topics here</span> to
                    find a relevant site.
                  </p>
                </div>
                <div className="flex flex-col justify-start w-full">
                  <span className="font-bold w-full text-start">Steps</span>
                  <ul className="flex flex-col text-sm px-10">
                    <li className="list-disc">
                      Summarize your problem in one-line title.
                    </li>
                    <li className="list-disc">
                      Describe your problem in more detail.
                    </li>
                    <li className="list-disc">
                      Describe what you tried and what you expected to happen.
                    </li>
                    <li className="list-disc">
                      Add "tags" which help surface your question to members of
                      the community.
                    </li>
                    <li className="list-disc">
                      Review your question and post it to site.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <form
              onSubmit={handlePostQuestion}
              className="md:w-[70%] mx-auto py-5 space-y-6"
            >
              {/* question title */}
              <div className="rounded border-[1px] border-slate-700 p-5 flex flex-col w-full items-start space-y-1">
                <label className="font-semibold" htmlFor="title">
                  Title
                </label>
                <p className="text-xs">
                  Be specific and imagine you're asking a question to another
                  person
                </p>
                <input
                  className="text-sm text-black focus:outline-none border-slate-700 bg-inherit border-[1px] w-full px-2 py-1 rounded"
                  onChange={onChange}
                  value={writeQuestion.QuestionTitle}
                  name="QuestionTitle"
                  id="title"
                  type="text"
                  placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
                />
              </div>
              {/* question in detail */}
              <div className="rounded border-[1px] border-slate-700 p-5 flex flex-col w-full items-start space-y-1">
                <label className="font-semibold" htmlFor="body">
                  Body
                </label>
                <p className="text-xs">
                  The body of your question contains your problem detail.
                </p>
                <textarea
                  className="flex flex-col text-black text-sm focus:outline-none border-slate-700 bg-inherit border-[1px] w-full px-2 py-1 rounded"
                  type="text"
                  onChange={onChange}
                  value={writeQuestion.QuestionDetails}
                  name="QuestionDetails"
                  id="body"
                  row="10"
                  placeholder="Explain your problem in detail"
                />
              </div>
              {/* all question tags */}
              <div className="rounded border-[1px] border-slate-700 p-5 flex flex-col w-full items-start space-y-1">
                <label className="font-semibold" htmlFor="tags">
                  Tags
                </label>
                <p className="text-xs">
                  Choose tags for your question which eventually help us to find
                  write member of community.
                </p>
                <input
                  className="text-sm text-black focus:outline-none bg-inherit border-slate-700 border-[1px] w-full px-2 py-1 rounded"
                  type="text"
                  onChange={(e) =>
                    setWriteQuestion({
                      ...writeQuestion,
                      QuestionTags: e.target.value
                        .split(",")
                        .map((tag) => tag.trim()),
                    })
                  }
                  value={writeQuestion.QuestionTags.join(", ")} // Join tags for display
                  name="QuestionTags"
                  id="tags"
                  placeholder="tags , comma separated"
                />
              </div>
              {/* button to post question */}
              <button
                type="submit"
                className="w-full lg:w-fit mx-auto text-lg px-4 py-2 rounded-md border-[1px] border-slate-700"
              >
                Post your question
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AskQuestion;
