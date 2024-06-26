import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./Authentication/Login";
import SignUp from "./Authentication/SignUp";
import AllQuestions from "./components/AllQuestions";
import Tags from "./components/Tags";
import { Toaster } from "react-hot-toast";
import AskQuestion from "./components/AskQuestion";
import ParticularQuestion from "./components/ParticularQuestion";
import UserProfile from "./pages/UserProfile";
import AllUsers from "./components/AllUsers";
import Welcome from "./pages/Welcome";
import SavedQuestion from "./components/SavedQuestion";
import { QuestionProvider } from "./Context/questions/QuestionContext";
import { AuthProvider } from "./Context/Authentication/AuthContext";
import OtherUsersProfile from "./components/OtherUsersProfile";
import { ThemeProvider } from "./Context/Theme/ThemeContext";

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <QuestionProvider>
            <Toaster
              position="top-left"
              toastOptions={{ duration: 500 }}
              reverseOrder={false}
            />
            <Navbar />
            <Routes>
              <Route exact index element={<Welcome />} />
              <Route path="/" element={<Home />}>
                <Route path="/users" element={<AllUsers />} />
                <Route
                  path="/users/profile/:id"
                  element={<OtherUsersProfile />}
                />
                <Route path="/questions" element={<AllQuestions />} />
                <Route path="/tags" element={<Tags />} />
                <Route path="/questions/:id" element={<ParticularQuestion />} />
                <Route path="/saved" element={<SavedQuestion />} />
                <Route path="/companies" element={<SavedQuestion />} />
                <Route path="/collectives" element={<SavedQuestion />} />
                <Route path="/discussions" element={<SavedQuestion />} />
              </Route>
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/askQuestion" element={<AskQuestion />} />
              <Route exact path="/signUp" element={<SignUp />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/userProfile" element={<UserProfile />} />
              <Route exact path="/userProfile/:id" element={<UserProfile />} />
            </Routes>
          </QuestionProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
