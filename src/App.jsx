import { Route, Routes } from "react-router-dom";
import "./App.css";
import Public from "./pages/Public/Public";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Chat from "./ui/Chat/Chat";
import Main from "./ui/Main/Main";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Public />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />}>
          <Route index element={<Main />} />
          <Route path="chat/:chatID" element={<Chat />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
