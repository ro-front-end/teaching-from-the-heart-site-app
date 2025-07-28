import Dashboard from "../components/dashboard";
import CoverPage from "../components/coverPage";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "../components/topbar/navBar";
import StoriesDetails from "../components/storiesDetails";
import LoginForm from "../components/loginForm";
import SigninForm from "../components/signinForm";
import ContactPage from "../components/contact";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<CoverPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/:id" element={<StoriesDetails />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signin" element={<SigninForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
