import React, { useEffect, useState } from "react";
import { HiOutlineEmojiHappy } from "react-icons/hi";

import { MdAttachFile } from "react-icons/md";
import {
  FaEllipsisV,
  FaSearch,
  FaArrowRight,
  FaMicrophoneSlash,
} from "react-icons/fa";
import "./Chat.css";
import { useParams } from "react-router-dom";
import db from "./firebase";
import { useStateValue } from "./StateProvider";

const Chat = () => {
  const { SelectRoomId } = useParams();
  const [Input, SetInput] = useState("");
  const [ChatUserImg, SetChatUserImg] = useState("");
  const [SelectedRoom, SetSelectedRoom] = useState("");
  const [Messages, SetMessages] = useState([]);
  const [{ user }] = useStateValue();
  useEffect(() => {
    if (SelectRoomId) {
      db.collection("ChatRooms")
        .doc(SelectRoomId)
        .onSnapshot((snapshot) => {
          SetSelectedRoom(snapshot.data().name);
        });
      db.collection("ChatRooms")
        .doc(SelectRoomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          SetMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [SelectRoomId]);
  useEffect(() => {
    SetChatUserImg(Math.floor(Math.random * 1000));
  }, [SelectRoomId]);
  const SendMsg = (e) => {
    e.preventDefault();
    db.collection("ChatRooms").doc(SelectRoomId).collection("messages").add({
      message: Input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    SetInput("");
  };
  return (
    <div className="chat">
      <div className="chat_header">
        <img
          className="chat_img"
          src={`https://api.dicebear.com/api/human/${ChatUserImg}.svg`}
          alt=""
        />
        <div className="chat_info">
          <h3>{SelectedRoom}</h3>
          <p className="chat-room-last-seen">
            Last seen{" "}
            {new Date(
              Messages[Messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
      </div>
      <div className="chat_icon">
        <div className="search_icon">
          <FaSearch />
        </div>
        <div className="attach_icon">
          <MdAttachFile />
        </div>
        <div className="hamburger_icon">
          <FaEllipsisV />
        </div>
      </div>

      <div className="chat_body">
        {Messages.map((message) => (
          <p
            className={`chat_msg ${
              message.name === user.displayName && "chat_receiver"
            }`}
          >
            <span className="chat_name">{message.name}</span>
            <span className="chatmsg"> {message.message}</span>
            <span className="chat_time">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>

      <div className="chat_footer">
        <HiOutlineEmojiHappy className="emoji" />
        <form className="footer_textbox">
          <input
            className="footer_text"
            type="text"
            value={Input}
            onChange={(e) => SetInput(e.target.value)}
            placeholder="Type a message"
          />
          <button className="send_btn" type="submit" onClick={SendMsg}>
            <FaArrowRight className="send_btnicon" />
          </button>
        </form>
        <div className="microphone">
          <FaMicrophoneSlash className="microphoneemoji" />
        </div>
      </div>
    </div>
  );
};
export default Chat;
