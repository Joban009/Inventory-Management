import "./App.css";
import { Routes, Route } from "react-router";
import Login from "./components/pages/login/Login";
import MainContainer from "./components/pages/main/mainContainer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<MainContainer />} />
    </Routes>
  );
}

export default App;
