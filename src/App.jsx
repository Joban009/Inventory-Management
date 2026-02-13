import "./App.css";
import { Routes, Route } from "react-router";
import Login from "./components/pages/Login";
import MainContainer from "./components/pages/main/mainContainer";
import Dashboard from "./components/pages/main/dashboard";
import Inventory from "./components/pages/main/inventory";
import Setting from "./components/pages/main/setting";
// import AddItems from "./components/addItems";
import Report from "./components/pages/main/report";
import Supplier from "./components/pages/main/supplier";

function App() {
  return (

    <Routes>
      <Route path="/" element={<Login/>} />
      <Route element={<MainContainer />} >
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/report" element={<Report />} />
      <Route path="/supplier" element={<Supplier />} />
      <Route path="/setting" element={<Setting />} />

      </Route>
    </Routes>
  );
}

export default App;
