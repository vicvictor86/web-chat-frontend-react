import React, { useState, useEffect } from "react";
import { FiMenu, FiSearch, FiMoreVertical } from "react-icons/fi";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { IoMdSend } from "react-icons/io";

import { Groups, SideBar, Container, TopBarGroup } from "./styles";

import { InputWithButtons } from "../../components/Input";
import { Button } from "../../components/Button";
import { Message } from "../../components/Message";

import { socket } from "../../socket";

import {
  Background,
  Messages,
  ConversationDate,
  InputMessages,
} from "../../components/Message/styles";

import { api } from "../../services/api";
import { Socket } from "socket.io-client";
import { useAuth, UserProps } from "../../hooks/Auth";

interface Room {
  id: string;
  name: string;
  user_limit: number;
  is_private: boolean;
  user_quantity: number;
}

interface SelectRoomProps {
  roomId: string;
  userId: string;
  socket: Socket;
}

interface SelectedRoomResponse {
  room: Room;

  is_on_chat: boolean;
}

interface MessageProps {
  id: string;
  user_id: string;
  room: Room;
  text: string;
  created_at: string;
}

export const Chat: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | undefined>();
  const [messages, setMessages] = useState<MessageProps[]>([]);

  const { user } = useAuth();

  useEffect(() => {
    api.get("rooms/").then((response) => {
      setRooms(response.data);
    });
  });

  const selectRoom = ({ roomId, userId, socket }: SelectRoomProps) => {
    socket.emit('select_room', {
      user_id: userId,
      room_id: roomId,
    }, ({room, is_on_chat}: SelectedRoomResponse) => {
      setSelectedRoom(room);

      previousMessage(roomId);
    });
  }

  const previousMessage = (roomId: string) => {
    api.get(`messages/${roomId}`).then((response) => {
      console.log(response);

      const messages = response.data.map((message: MessageProps) => {
        return {
          id: message.id,
          user_id: message.user_id,
          text: message.text,
          created_at: message.created_at.substring(12, 16),
        } as MessageProps
      });

      setMessages(messages);
    })

  } 

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
          <Groups
            key={room.id}
            groupId={room.id}
            onClick={() => selectRoom({roomId: room.id, userId: user.id, socket })}
          >
            <div className="left-icons">
              <div className="avatar">
                <img
                  src="https://avatars.githubusercontent.com/u/45568289?v=4"
                  alt="User"
                />
              </div>

              <div className="content-message-container">
                <span className="content-username">{room.name}</span>
                <span className="content-message">Default Message</span>
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
      
      {selectedRoom && (
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
                <span className="content-group-name">{selectedRoom.name}</span>
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

                {messages.map((message) => (
                  <Message messageOwnerId={message.user_id} userId={user.id} messageTime={message.created_at}>
                    {message.text}
                  </Message>
                ))}
              </div>
            </Messages>
          </Background>
          <InputMessages>
            <InputWithButtons
              leftIcon={HiOutlineEmojiHappy}
              rightIcon={IoMdSend}
              placeholder="Message"
            />
          </InputMessages>
        </div>
      )}
    </Container>
  );
};
