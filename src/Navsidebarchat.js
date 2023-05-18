import React, { useState, useEffect } from "react";
import db from "./firebase";
import "./Navsidebarchat.css";
import { Link } from "react-router-dom";

export const Navsidebarchat = ({ id, name,Addnewchat }) => {
  const [ChatUserImg, SetChatUserImg] = useState("");
  const [Messages, setMessages] = useState("");

  useEffect(() => {
    if (id) {
      db.collection("ChatRooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [id]);
  useEffect(() => {
    SetChatUserImg(Math.floor(Math.random() * 1000));
  }, []);
  return (
    <div className="sidebar">
      <Link to={`/ChatRooms/${id}`} key={id}>
        <div className="sidebarchat">
          <div className="profile_img">
            <img
              src={`https://api.dicebear.com/api/human/${ChatUserImg}.svg`}
              alt=""
            />
          </div>
          <div className="side_chatbox">
            <div className="sidebarchatinfo">
              <h2>{name}</h2>
              <p>{Messages[0]?.message}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
