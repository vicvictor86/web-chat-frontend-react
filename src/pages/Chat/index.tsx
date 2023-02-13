import React, { useState, useEffect } from "react";
import { FiMenu, FiSearch, FiMoreVertical } from "react-icons/fi";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { IoMdSend } from "react-icons/io";

import { Groups, SideBar, Container, TopBarGroup } from "./styles";

import { InputWithButtons } from "../../components/Input";
import { Button } from "../../components/Button";
import { Message } from "../../components/Message";

import {
  Background,
  Messages,
  ConversationDate,
} from "../../components/Message/styles";

import { api } from "../../services/api";

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

        <Background>
          <Messages>
            <div className="content-message">
              <ConversationDate>
                <p>Today</p>
              </ConversationDate>

              <Message messageOwnerId="1" userId="2" messageTime="22:40">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Message>

              <Message messageOwnerId="1" userId="1" messageTime="22:42">
                Duis imperdiet bibendum massa vitae gravida. Pellentesque tempor
                tincidunt leo, id vulputate odio convallis non.
              </Message>

              <Message messageOwnerId="1" userId="2" messageTime="22:42">
                ed est ipsum, tempus eu magna vel, finibus volutpat purus. Nam
                at ante eget mi varius ornare sit amet et justo. Nullam dui
                ante, aliquam vitae feugiat non, venenatis eget libero
              </Message>

              <Message messageOwnerId="1" userId="1" messageTime="22:43">
                Quisque vitae blandit augue. Aliquam a lectus tristique,
                pharetra erat eu, vehicula mauris.
              </Message>
            </div>

            <div className="input-message">
              <InputWithButtons
                leftIcon={HiOutlineEmojiHappy}
                rightIcon={IoMdSend}
                placeholder="Message"
              />
            </div>
          </Messages>
        </Background>
      </div>
    </Container>
  );
};
