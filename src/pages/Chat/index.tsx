import React, { useState, useEffect } from "react";
import { FiMenu, FiSearch, FiMoreVertical, FiCheck } from "react-icons/fi";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { IoMdSend } from "react-icons/io";

import { Groups, SideBar, Container, TopBarGroup } from "./styles";

import { InputWithButtons } from "../../components/Input";

import { api } from "../../services/api";
import { Button } from "../../components/Button";
import { Messages } from "../../components/Message/styles";
import { ConversationDate } from "../../components/Message/styles";
import { Message } from "../../components/Message";

interface Room {
  id: string;
  name: string;
  user_limit: number;
  is_private: boolean;
  user_quantity: number;
}

export const Chat: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    api.get("rooms/").then((response) => {
      setRooms(response.data);
    });
  });

  return (
    <Container>
      <SideBar>
        <div className="content-search-bar">
          <Button icon={FiMenu} />
          <div className="search-bar">
            <FiSearch size={24} className="fi-search" />
            <input placeholder="Search" type="text" />
          </div>
        </div>

        {rooms.map((room) => (
          <Groups>
            <div className="left-icons">
              <div className="avatar">
                <img
                  src="https://avatars.githubusercontent.com/u/45568289?v=4"
                  alt="User"
                />
              </div>

              <div className="content-message-container">
                <span className="content-username">{room.name}</span>
                <span className="content-message">Last Message</span>
              </div>
            </div>

            <div className="info-time-container">
              <span className="info-time">18:30</span>
              <div className="info-message-count">
                <span>2</span>
              </div>
            </div>
          </Groups>
        ))}
      </SideBar>

      <div className="chat-group">
        <TopBarGroup>
          <div className="left-icons">
            <div className="avatar">
              <img
                src="https://avatars.githubusercontent.com/u/45568289?v=4"
                alt="User"
              />
            </div>

            <div className="content-message-container">
              <span className="content-group-name">Group name</span>
              <span className="content-message">Last group Message time</span>
            </div>
          </div>

          <div className="content-group-features">
            <Button icon={FiSearch} />
            <Button icon={FiMoreVertical} />
          </div>
        </TopBarGroup>

        <Messages messageOwnerId="1" userId="1">
          <ConversationDate>
            <p>Today</p>
          </ConversationDate>

          <Message messageOwnerId="1" userId="1" messageTime="22:40">
            FalaOMG 😲 do you remember what you did last night at the work night
            out?
          </Message>

          <Message messageOwnerId="1" userId="" messageTime="22:40">
            Fala
          </Message>
        </Messages>

        {/* <div className="input-message" >
            <InputWithButtons
              leftIcon={HiOutlineEmojiHappy}
              rightIcon={IoMdSend}
              placeholder="Message"
            />
          </div> */}
      </div>
    </Container>
  );
};
