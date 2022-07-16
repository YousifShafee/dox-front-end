import "./chatbot.css";
import { useEffect, useState } from "react";
import { Logo } from "../../config";
import { chatbot_talk, fetchImage } from "../../API";

export default function Chatbot() {
  const [logo, setLogo] = useState('')
  const [chatbox, setChatbox] = useState(false);
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await chatbot_talk(message)
    if (response.status === 200) {
      setChat(
        oldArray => [...oldArray,
          <div className="messages__item messages__item--operator">
          {message}
        </div>,
        <div className="messages__item messages__item--visitor">
          {response.data.text}
        </div>
        ]
      )
      setMessage('')
    }
  }

  useEffect(() => {
    async function fetchLogo() {
      await fetchImage(Logo)
        .then(response => {
          setLogo(response[0])
        })
    }
    fetchLogo()
  }, [])
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
              <img src={logo.img} className="logo" alt="logo" />
            </div>
            <div className="chatbox__content--header">
              <h4 className="chatbox__heading--header">DOX Chatbot</h4>
            </div>
          </div>
          <div className="chatbox__messages">
            <div> {chat} </div>
          </div>
          <form onSubmit={handleSubmit} className="chatbox__footer">
            <input type="text" value={message} onChange={e => setMessage(e.target.value)} placeholder="...أكتب هنا" />
            <button type="submit" className="chatbox__send--footer">أرسل</button>
          </form>
        </div>
        <div className="chatbox__button" onClick={() => setChatbox(!chatbox)}>
          <img src="./assets/imgs/chatbox-icon.svg" alt="icon" />
        </div>
      </div>
    </div>
  );
}


{/* <div className="container">
  <div className="chatbox">
    <div
      className={
        chatbox ? "chatbox__support chatbox--active" : "chatbox__support"
      }
    >
      <div className="chatbox__header">
        <div className="chatbox__image--header">
          <img src={logo.img} className="logo" alt="logo" />
        </div>
        <div className="chatbox__content--header">
          <h4 className="chatbox__heading--header">DOX Chatbot</h4>
        </div>
      </div>
      <iframe style={{ height: "100%" }} id="botkit_client" src="//localhost:3001/index.html"></iframe>
    </div>
    <div className="chatbox__button" onClick={() => setChatbox(!chatbox)}>
      <img src="./assets/imgs/chatbox-icon.svg" alt="icon" />
    </div>
  </div>
</div> */}