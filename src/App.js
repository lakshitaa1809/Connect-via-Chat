import React from "react";
import Login from "./Login";
import "./App.css";
import "./Chat.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navsidebar from "./Navsidebar";
import Chat from "./Chat";
import { useStateValue } from "./StateProvider";

const App = () => {
  // eslint-disable-next-line
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="chatContainer">
      <div className="container">
        {!user ? (
          <Login />
        ) : (
          <div className="chatbox">
            <Router>
              <Navsidebar />
              <Routes>
                <Route>
                  <Route path="/ChatRooms/:SelectRoomId" element={<Chat />} />
                  <Route path="/" element={<Chat />}></Route>
                </Route>
              </Routes>
            </Router>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
