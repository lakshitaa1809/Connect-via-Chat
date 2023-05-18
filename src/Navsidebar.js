import React, { useState, useEffect } from "react";
import {
  FaEllipsisV,
  FaUsers,
  FaCircleNotch,
  FaEdit,
  FaSearch,
} from "react-icons/fa";
import { Navsidebarchat } from "./Navsidebarchat";
import "./Navsidebar.css";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
const Navsidebar = () => {
  const [ChatRooms, SetChatRooms] = useState([]);
  const [{ user }] = useStateValue();

  useEffect(() => {
    db.collection("ChatRooms").onSnapshot((snapshot) =>
      SetChatRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);
  return (
    <div className="headericons">
      <div className="icons">
        <div className="userimg">
          <img className="profileimg" src={user?.photoURL} alt="" />
        </div>
        <div className="usericon">
          <FaUsers />
        </div>
        <div className="circleicon">
          <FaCircleNotch />
        </div>
        <div className="editicon">
          <FaEdit />
        </div>
        <div className="hamburgericon">
          <FaEllipsisV />
        </div>
      </div>
      <div className="search">
        <div className="searchcontainer">
          <FaSearch className="searchicons" />
          <input
            className="chatsearch"
            type="text"
            placeholder="Search or start new chat"
          />
        </div>
      </div>

      <div className="sidechatbox">
        {ChatRooms.map((Room) => {
          return (
            <Navsidebarchat key={Room.id} id={Room.id} name={Room.data.name} />
          );
        })}
      </div>
    </div>
  );
};

export default Navsidebar;
