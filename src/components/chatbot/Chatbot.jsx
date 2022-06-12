import "./chatbot.css";
import { useState } from "react";

export default function Chatbot() {
  const [chatbox, setChatbox] = useState(false);

  return (
    <div className="container">
      <div className="chatbox">
        <div
          className={
            chatbox ? "chatbox__support chatbox--active" : "chatbox__support"
          }
        >
          <div className="chatbox__header">
            <div className="chatbox__image--header">
              <img src="./assets/imgs/logo.png" alt="logo" />
            </div>
            <div className="chatbox__content--header">
              <h4 className="chatbox__heading--header">DOX Chatbot</h4>
              <p className="chatbox__description--header">
                I'm ready and I will be happy to help you
              </p>
            </div>
          </div>
          <div className="chatbox__messages">
            <div>
              <div className="messages__item messages__item--visitor">
                How can i help you?
              </div>
              <div className="messages__item messages__item--operator">
                I wanna to contact support
              </div>
              <div className="messages__item messages__item--visitor">
                We all here to help you
              </div>
              <div className="messages__item messages__item--operator">
                Great
              </div>
              <div className="messages__item messages__item--typing">
                <span className="messages__dot"></span>
                <span className="messages__dot"></span>
                <span className="messages__dot"></span>
              </div>
            </div>
          </div>
          <div className="chatbox__footer">
            <input type="text" placeholder="Write a message..." />
            <p className="chatbox__send--footer">Send</p>
          </div>
        </div>
        <div className="chatbox__button" onClick={() => setChatbox(!chatbox)}>
          <img src="./assets/imgs/chatbox-icon.svg" alt="icon" />
        </div>
      </div>
    </div>
  );
}
