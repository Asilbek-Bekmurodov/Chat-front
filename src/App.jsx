import { Route, Routes } from "react-router-dom";
import "./App.css";
import Public from "./pages/Public/Public";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Create from "./ui/Create/Create";
import Join from "./ui/Join/Join";
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
          <Route path="create" element={<Create />} />
          <Route path="join" element={<Join />} />
          <Route path="chat/:chatID" element={<Chat />} />
          {/* <Route path="hello" element={<div>Hello</div>} /> */}
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
