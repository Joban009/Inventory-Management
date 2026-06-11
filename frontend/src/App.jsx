import { Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login";
import MainContainer
 from "./components/pages/main/MainContainer
";
import Dashboard from "./components/pages/main/Dashboard";
import Inventory from "./components/pages/main/Inventory";
import Setting from "./components/pages/main/Setting";
import Report from "./components/pages/main/Report";
import Supplier from "./components/pages/main/Supplier";
import AddSupplier from "./components/forms/AddSupplier";
import ProtectedRoute from "./ProtectedRoute";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        element={
          <ProtectedRoute>
            <MainContainer
 />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/report" element={<Report />} />
        <Route path="/supplier" element={<Supplier />} />
        <Route path="/supplier/add" element={<AddSupplier />} />
        <Route path="/setting" element={<Setting />} />
      </Route>
    </Routes>
  );
}

export default App;
